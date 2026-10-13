import { expect, test } from "@playwright/test";

test("project headings align with their sections without overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main > section.project-group")).toHaveCount(1);
  for (const section of await page
    .locator("main > section.project-group")
    .all()) {
    const intro = section.locator(".section-intro");
    await intro.scrollIntoViewIfNeeded();
    await intro.screenshot({
      path: testInfo.outputPath(
        `${await section.getAttribute("id")}-intro.png`,
      ),
    });
  }
  await expect(page.locator(".project-group-title")).toHaveText([
    "AI Applications",
  ]);
  await expect(page.locator("#mcp-business-automation h2")).toHaveText(
    "MCP & Business Automation",
  );
  await expect(
    page
      .locator("main > section.project-group")
      .nth(0)
      .locator(".project-heading h3"),
  ).toHaveText([
    "Invoice Review",
    "Case Resolution Copilot",
    "Private Offline Document Intelligence",
  ]);
  const projects = page.locator(".project-feature");
  await expect(projects).toHaveCount(3);
  for (const project of await projects.all()) {
    const heading = project.locator(".project-heading");
    const bounds = await project.boundingBox();
    const headingBounds = await heading.boundingBox();
    expect(Math.abs(headingBounds!.x - bounds!.x)).toBeLessThan(2);
    expect(
      await heading.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  }
  for (const picture of await page
    .locator(".automation-image-grid img")
    .all()) {
    await picture.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        picture.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await page.locator(".automation-preview").screenshot({
    path: testInfo.outputPath("automation-preview.png"),
  });
  for (const slug of [
    "ai-document-operations",
    "private-offline-document-intelligence",
  ]) {
    const project = page.locator(`#${slug}`);
    await project.scrollIntoViewIfNeeded();
    await expect(project.locator("img")).toBeVisible();
    await project.screenshot({ path: testInfo.outputPath(`${slug}.png`) });
  }
});
