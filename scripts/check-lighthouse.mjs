import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const previewPort = 4322;
const previewOrigin = `http://127.0.0.1:${previewPort}`;
const routes = ["/", "/projects/ai-document-operations/"];
const runsPerRoute = 3;
const budgets = {
  lcp: 2_500,
  cls: 0.1,
  tbt: 300,
};

if (!existsSync(resolve("dist/index.html"))) {
  throw new Error("Run the production build before the Lighthouse check");
}

const preview = spawn(
  process.execPath,
  [
    resolve("node_modules/astro/bin/astro.mjs"),
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    String(previewPort),
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

let previewError = "";
preview.stderr.on("data", (chunk) => {
  previewError += chunk.toString();
});

let chrome;
const chromeProfile = resolve("work/lighthouse-profile");
mkdirSync(chromeProfile, { recursive: true });

try {
  await waitForPreview(`${previewOrigin}/`);
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
  if (preview.exitCode === null) {
    preview.kill();
    await Promise.race([
      once(preview, "exit"),
      new Promise((resolvePromise) => setTimeout(resolvePromise, 2_000)),
    ]);
  }
}

async function waitForPreview(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (preview.exitCode !== null) {
      throw new Error(`Astro preview stopped before startup: ${previewError}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
  }
  throw new Error(`Timed out waiting for Astro preview: ${previewError}`);
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}
