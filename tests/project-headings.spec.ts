import { expect, test } from "@playwright/test";

test("project headings align with their sections without overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const projects = page.locator(".project-feature");
  await expect(projects).toHaveCount(4);
  for (const project of await projects.all()) {
    const heading = project.locator(".project-heading");
    const bounds = await project.boundingBox();
    const headingBounds = await heading.boundingBox();
    expect(Math.abs(headingBounds!.x - bounds!.x)).toBeLessThan(2);
    expect(
      await heading.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  }
  if (testInfo.project.name === "desktop") {
    const title = page.locator("#odoo-business-operations-mcp-server h3");
    expect(
      await title.evaluate((el) => {
        const style = getComputedStyle(el);
        return el.getBoundingClientRect().height / parseFloat(style.lineHeight);
      }),
    ).toBeLessThan(1.1);
  }
  for (const slug of [
    "ai-document-operations",
    "connectwise-service-operations-mcp",
    "odoo-business-operations-mcp-server",
  ]) {
    const project = page.locator(`#${slug}`);
    await project.scrollIntoViewIfNeeded();
    await expect(project.locator("img")).toBeVisible();
    await project.screenshot({ path: testInfo.outputPath(`${slug}.png`) });
  }
});
