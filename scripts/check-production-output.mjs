import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const projectRoot = resolve("dist/projects");
const sitesWorker = resolve("dist/server/index.js");
const sitesMetadata = resolve("dist/.openai/hosting.json");
const projectRoutes = readdirSync(projectRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `dist/projects/${entry.name}/index.html`);
const routes = ["dist/index.html", ...projectRoutes];

if (projectRoutes.length < 2) {
  throw new Error("Expected at least two published project routes");
}

if (!existsSync(sitesWorker) || !existsSync(sitesMetadata)) {
  throw new Error("Production build is missing its Sites deployment output");
}

if (!readFileSync(sitesWorker, "utf8").includes("env.ASSETS")) {
  throw new Error("Sites worker is missing the static asset binding");
}

for (const route of routes) {
  const path = resolve(route);
  if (!existsSync(path)) throw new Error(`Missing built route: ${route}`);

  const html = readFileSync(path, "utf8");
  for (const marker of [
    '<meta property="og:title"',
    '<meta name="twitter:card"',
    '<script type="application/ld+json"',
    '<main id="main-content"',
  ]) {
    if (!html.includes(marker)) {
      throw new Error(`${route} is missing ${marker}`);
    }
  }
}

const homepage = readFileSync(resolve("dist/index.html"), "utf8");

if (/<link\b[^>]*\brel="stylesheet"/i.test(homepage)) {
  throw new Error("Production homepage still has a render-blocking stylesheet");
}

const cloudflareHeaders = readFileSync(resolve("dist/_headers"), "utf8");
if (
  !cloudflareHeaders.includes("/_astro/*") ||
  !cloudflareHeaders.includes("max-age=31556952, immutable")
) {
  throw new Error("Production build is missing immutable cache headers");
}

const homepageScriptSources = externalScriptSources(homepage);

if (homepageScriptSources.length === 0) {
  throw new Error("Production homepage is missing its motion script");
}

function externalScriptSources(html) {
  return [
    ...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*><\/script>/g),
  ].map((match) => match[1]);
}

function inlineModuleScripts(html) {
  return [
    ...html.matchAll(
      /<script\b(?=[^>]*\btype="module")(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => match[1]);
}

function scriptBytes(html) {
  const sources = externalScriptSources(html);
  const external = sources.reduce(
    (total, source) => {
      const assetPath = resolve("dist", source.replace(/^\/+/, ""));
      if (!existsSync(assetPath)) {
        throw new Error(`Built route references a missing script: ${source}`);
      }

      const script = readFileSync(assetPath);
      return {
        raw: total.raw + script.byteLength,
        gzip: total.gzip + gzipSync(script, { level: 9 }).byteLength,
      };
    },
    { raw: 0, gzip: 0 },
  );

  const inline = Buffer.from(inlineModuleScripts(html).join("\n"));
  return {
    raw: external.raw + inline.byteLength,
    gzip:
      external.gzip +
      (inline.byteLength > 0 ? gzipSync(inline, { level: 9 }).byteLength : 0),
  };
}

const homepageScriptBytes = scriptBytes(homepage);

const homepageScriptGzipBudget = 15 * 1024;
if (homepageScriptBytes.gzip > homepageScriptGzipBudget) {
  throw new Error(
    `Homepage JavaScript exceeds the ${homepageScriptGzipBudget}-byte gzip budget: ${homepageScriptBytes.gzip} bytes`,
  );
}

const projectScriptSets = projectRoutes.map((route) => {
  const html = readFileSync(resolve(route), "utf8");
  if (!html.includes("data-site-ambient")) {
    throw new Error(`${route} is missing the shared pointer ambience`);
  }

  const inlineScripts = inlineModuleScripts(html);
  if (!inlineScripts.some((script) => script.includes("[data-site-ambient]"))) {
    throw new Error(`${route} is missing its shared interaction scripts`);
  }

  const sources = externalScriptSources(html);
  const bytes = scriptBytes(html);
  const projectScriptGzipBudget = 10 * 1024;
  if (bytes.gzip > projectScriptGzipBudget) {
    throw new Error(
      `${route} JavaScript exceeds the ${projectScriptGzipBudget}-byte gzip budget: ${bytes.gzip} bytes`,
    );
  }
  return new Set(sources);
});

const homepageOnlyScriptSources = homepageScriptSources.filter(
  (source) => !projectScriptSets.some((sources) => sources.has(source)),
);
if (homepageOnlyScriptSources.length === 0) {
  throw new Error("Expected a homepage-only motion script");
}

if (process.env.SITE_URL) {
  const robots = readFileSync(resolve("dist/robots.txt"), "utf8");

  for (const marker of ['rel="canonical"', 'property="og:url"']) {
    if (!homepage.includes(marker)) {
      throw new Error(`Production homepage is missing ${marker}`);
    }
  }

  if (!existsSync(resolve("dist/sitemap-index.xml"))) {
    throw new Error("Production build is missing sitemap-index.xml");
  }

  if (!robots.includes("Sitemap:")) {
    throw new Error("Production robots.txt is missing the sitemap reference");
  }
}

process.stdout.write(
  `Production output verified for ${routes.length} routes. Homepage JavaScript: ${homepageScriptBytes.raw} bytes raw / ${homepageScriptBytes.gzip} bytes gzip.\n`,
);
