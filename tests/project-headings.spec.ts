import { expect, test } from "@playwright/test";

test("project headings align with their sections without overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main > section.project-group")).toHaveCount(2);
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
    "MCP & Business Automation",
  ]);
  await expect(
    page
      .locator("main > section.project-group")
      .nth(0)
      .locator(".project-heading h3"),
  ).toHaveText(["Invoice Review", "Case Resolution Copilot"]);
  await expect(
    page.locator(".project-group").nth(1).locator(".project-feature"),
  ).toHaveCount(3);
  const projects = page.locator(".project-feature");
  await expect(projects).toHaveCount(5);
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
