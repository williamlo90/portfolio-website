import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const previewPort = 4322;
const previewOrigin = `http://127.0.0.1:${previewPort}`;
const routes = [
  "/",
  "/projects/ai-document-operations/",
  "/projects/ai-support-escalation/",
];
const runsPerRoute = 3;
const budgets = {
  lcp: 2_500,
  cls: 0.1,
  tbt: 300,
};

if (!existsSync(resolve("dist/index.html"))) {
  throw new Error("Run the production build before the Lighthouse check");
}

const distDirectory = resolve("dist");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
const preview = createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, previewOrigin).pathname,
  );
  let path = resolve(distDirectory, `.${pathname}`);
  if (path !== distDirectory && !path.startsWith(`${distDirectory}${sep}`)) {
    response.writeHead(403).end();
    return;
  }
  if (existsSync(path) && statSync(path).isDirectory()) {
    path = resolve(path, "index.html");
  }
  if (!existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  response.setHeader(
    "Content-Type",
    contentTypes[extname(path)] ?? "application/octet-stream",
  );
  response.end(readFileSync(path));
});

let chrome;
const chromeProfile = resolve("work/lighthouse-profile");
mkdirSync(chromeProfile, { recursive: true });

try {
  await new Promise((resolvePromise) =>
    preview.listen(previewPort, "127.0.0.1", resolvePromise),
  );
  chrome = await launch({
    chromeFlags: [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    logLevel: "silent",
    userDataDir: chromeProfile,
  });

  let failed = false;
  for (const route of routes) {
    const samples = [];
    for (let run = 0; run < runsPerRoute; run += 1) {
      const result = await lighthouse(`${previewOrigin}${route}`, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: "simulate",
      });

      if (!result?.lhr)
        throw new Error(`Lighthouse returned no report for ${route}`);
      samples.push({
        lcp: result.lhr.audits["largest-contentful-paint"].numericValue,
        cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
        tbt: result.lhr.audits["total-blocking-time"].numericValue,
        score: result.lhr.categories.performance.score ?? 0,
      });
    }

    const result = {
      lcp: median(samples.map(({ lcp }) => lcp)),
      cls: median(samples.map(({ cls }) => cls)),
      tbt: median(samples.map(({ tbt }) => tbt)),
      score: median(samples.map(({ score }) => score)),
    };
    const failures = [];
    if (result.lcp > budgets.lcp)
      failures.push(`LCP ${Math.round(result.lcp)}ms`);
    if (result.cls > budgets.cls) failures.push(`CLS ${result.cls.toFixed(3)}`);
    if (result.tbt > budgets.tbt)
      failures.push(`TBT ${Math.round(result.tbt)}ms`);
    failed ||= failures.length > 0;

    process.stdout.write(
      `${route} median of ${runsPerRoute}: performance ${Math.round(result.score * 100)}, LCP ${Math.round(result.lcp)}ms, CLS ${result.cls.toFixed(3)}, TBT ${Math.round(result.tbt)}ms${failures.length ? ` | over budget: ${failures.join(", ")}` : " | within budget"}\n`,
    );
  }

  if (failed) {
    throw new Error(
      `Lighthouse budgets failed (LCP <= ${budgets.lcp}ms, CLS <= ${budgets.cls}, TBT <= ${budgets.tbt}ms)`,
    );
  }
} finally {
  try {
    chrome?.kill();
  } catch (error) {
    if (chrome?.process?.exitCode === null) chrome.process.kill();
    process.stderr.write(
      `Chrome cleanup warning: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
  await new Promise((resolvePromise) => preview.close(resolvePromise));
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}
