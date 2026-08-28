import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(
    fileURLToPath(new URL(relativePath, import.meta.url)),
    "utf8",
  );
}

const homepage = read("../src/pages/index.astro");
const header = read("../src/components/SiteHeader.astro");
const css = read("../src/styles/global.css");
const astroConfig = read("../astro.config.mjs");
const cloudflareHeaders = read("../public/_headers");
const documentProject = read("../src/content/projects/invoice-review.md");
const supportProject = read("../src/content/projects/ai-support-escalation.md");
const experience = read("../src/content/experience/dover-chemical.md");

describe("portfolio source constraints", () => {
  it("keeps both products inside Projects instead of the global menu", () => {
    expect(header).toContain(">Projects</a>");
    expect(header).toContain(">Experience</a>");
    expect(header).not.toMatch(/Invoice Review/);
    expect(header).not.toMatch(/Case Resolution Copilot/);
    expect(homepage).toContain("featuredEntries.map");
    expect(homepage).not.toMatch(/requires exactly two featured projects/i);
  });

  it("uses the canonical GitHub product brands", () => {
    expect(documentProject).toContain("title: Invoice Review");
    expect(documentProject).toContain(
      "descriptor: AI-powered invoice review & approval system",
    );
    expect(supportProject).toContain("title: Case Resolution Copilot");
    expect(supportProject).toContain(
      'url: "https://github.com/williamlo90/case-resolution-copilot"',
    );
    expect(supportProject).toContain("label: View public repository");
    expect(supportProject).toContain("public: true");
    expect(`${documentProject}\n${supportProject}`).not.toMatch(
      /AI Document Operations|AI Support Escalation/,
    );
  });

  it("names the Dover products in plain business language", () => {
    expect(experience).toContain("CRM Dover Chemical - Android App");
    expect(experience).toContain("Customer Management System - Web");
    expect(experience).toContain("Built a Customer Management System");
    expect(experience).not.toMatch(/Contributed to/);
    expect(experience).not.toMatch(/HMVC/);
  });

  it("omits unfinished and rejected public framing", () => {
    const publicSource = `${homepage}\n${documentProject}\n${supportProject}`;

    expect(publicSource).not.toMatch(/Evidence Log/i);
    expect(publicSource).not.toMatch(/Case study in preparation/i);
    expect(publicSource).not.toMatch(/Resume pending/i);
    expect(publicSource).not.toMatch(/Ownership confirmation pending/i);
    expect(publicSource).not.toMatch(/Human collaboration disclosure pending/i);
    expect(publicSource).not.toMatch(/\b65%\b/);
  });

  it("uses the locked high-contrast dark tokens", () => {
    expect(css).toContain("--bg: #0b0e12");
    expect(css).toContain("--text-primary: #f4f7fa");
    expect(css).toContain("--text-secondary: #d1d9e0");
    expect(css).toContain("--text-muted: #aab4c2");
  });

  it("keeps the cold render path and hashed assets optimized", () => {
    expect(astroConfig).toContain('inlineStylesheets: "always"');
    expect(cloudflareHeaders).toContain("/_astro/*");
    expect(cloudflareHeaders).toContain("max-age=31556952, immutable");
  });

  it("publishes only repository-supported project metrics", () => {
    expect(documentProject).toContain("publicationState: published");
    expect(documentProject).toContain('value: "68%"');
    expect(documentProject).toContain('value: "10/10"');
    expect(documentProject).toContain('value: "98.75%"');
    expect(documentProject).toContain("79/80");
    expect(documentProject).toContain("153s to 49s");
    expect(documentProject).toContain("local ERPNext sandbox");

    expect(supportProject).toContain("publicationState: published");
    expect(supportProject).toContain('value: "~84%"');
    expect(supportProject).toContain('value: "3/3"');
    expect(supportProject).toContain('value: "375 ms"');
    expect(supportProject).toContain("73 backend unit and contract checks");
    expect(supportProject).toContain("real, bounded Gmail journey");
    expect(supportProject).not.toContain('value: "57"');
    expect(supportProject).not.toContain('value: "491"');
    for (const retiredHash of [
      "eecb" + "26d",
      "a4e8" + "ffa",
      "715f" + "31f",
    ]) {
      expect(supportProject).not.toContain(retiredHash);
    }
    expect(supportProject).toContain("582s to 95s");
  });

  it("keeps the code-audited internship claims without invented impact", () => {
    expect(experience).toContain("role: Full-Stack Software Engineer Intern");
    expect(experience).toContain("reported at 6,656 records");
    expect(experience).toContain("38 HTTP API operations");
    expect(experience).toContain("15 Room entities");
    expect(experience).toContain("90 public controller actions");
    expect(experience).not.toMatch(/reduced? .+%/i);
  });
});
