import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function expectNoActionableAccessibilityFindings(
  page: import("@playwright/test").Page,
) {
  const accessibility = await new AxeBuilder({ page }).analyze();
  const actionableFindings = accessibility.violations.filter(
    ({ impact }) =>
      impact === "moderate" || impact === "serious" || impact === "critical",
  );
  expect(actionableFindings).toEqual([]);
}

test("homepage presents two projects under one Projects navigation item", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "William Lo Channiko" }),
  ).toBeVisible();
  await expect(
    page.getByText("Applied AI + Full-Stack Engineer", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Invoice Review" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Case Resolution Copilot" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Full-Stack Software Engineer Intern" }),
  ).toBeVisible();
  await expect(page.getByText("2025-2026", { exact: true })).toBeVisible();
  await expect(page.getByText("1 year", { exact: true })).toBeVisible();
  await expect(page.getByText("Jan-Aug 2025", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Aug 2025-Jan 2026", { exact: true }),
  ).toBeVisible();

  const isMobile = await page.evaluate(() => window.innerWidth <= 800);
  const primaryNav = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Primary navigation",
  });
  if (isMobile) {
    await primaryNav.getByText("Menu", { exact: true }).click();
  }
  await expect(primaryNav.getByRole("link", { name: "Projects" })).toHaveCount(
    1,
  );
  await expect(
    primaryNav.getByRole("link", { name: "Invoice Review" }),
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole("link", { name: "Case Resolution Copilot" }),
  ).toHaveCount(0);

  const colors = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const heading = getComputedStyle(document.querySelector("h1")!);
    return {
      background: body.backgroundColor,
      heading: heading.color,
      horizontalOverflow:
        document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  expect(colors.background).toBe("rgb(11, 14, 18)");
  expect(colors.heading).toBe("rgb(244, 247, 250)");
  expect(colors.horizontalOverflow).toBe(false);
  await expectNoActionableAccessibilityFindings(page);
});

test("mobile layout keeps Projects and Contact discoverable", async ({
  page,
}) => {
  await page.goto("/");

  const isMobile = await page.evaluate(() => window.innerWidth <= 800);
  const navigation = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Primary navigation",
  });

  if (isMobile) {
    const disclosure = navigation.getByRole("button", { name: "Menu" });
    const panel = navigation.locator("#mobile-menu-panel");
    await expect(disclosure).toBeVisible();
    await expect(disclosure).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
    await disclosure.click();
    await expect(disclosure).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
  }

  await expect(
    navigation.getByRole("link", { name: "Projects", exact: true }),
  ).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Experience", exact: true }),
  ).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "About", exact: true }),
  ).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Contact", exact: true }),
  ).toBeVisible();
  await expect(navigation.getByText("Resume", { exact: true })).toHaveCount(0);

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontalOverflow).toBe(false);
});

test("recruiter contact actions expose email, LinkedIn, and the resume", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Email William" }),
  ).toHaveAttribute("href", "mailto:williamlochanniko4@gmail.com");
  await expect(
    page.getByRole("link", { name: /LinkedIn/ }).first(),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/william-lo-channiko/");

  const resumeLinks = page.getByRole("link", { name: "Download resume" });
  await expect(resumeLinks).toHaveCount(2);
  await expect(resumeLinks.first()).toHaveAttribute(
    "href",
    "/william-lo-channiko-resume.pdf",
  );
  await expect(resumeLinks.first()).toHaveAttribute("download", "");

  const resumeResponse = await request.get("/william-lo-channiko-resume.pdf");
  expect(resumeResponse.ok()).toBe(true);
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
});

test("LCP-critical headings stay stable on the first paint", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator(".hero-copy")).not.toHaveAttribute(
    "data-motion-reveal-state",
    "played",
  );
  await expect(page.locator("#projects .section-intro")).not.toHaveAttribute(
    "data-motion-reveal",
    "",
  );

  const criticalStyles = await page.evaluate(() => ({
    heroTransform: getComputedStyle(document.querySelector(".hero-copy")!)
      .transform,
    projectsTransform: getComputedStyle(
      document.querySelector("#projects .section-intro")!,
    ).transform,
  }));
  expect(criticalStyles).toEqual({
    heroTransform: "none",
    projectsTransform: "none",
  });
});

test("skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("homepage reflows without hidden clipping at 320 pixels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  const clippedElements = await page.evaluate(() =>
    Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1)
        );
      })
      .map((element) => `${element.tagName}.${element.className}`),
  );

  expect(clippedElements).toEqual([]);
});

test("desktop motion completes once and pointer ambience stays site-wide", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop fine-pointer test");

  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });

  await page.goto("/");
  const ambient = page.locator("[data-site-ambient]");
  const lens = page.locator("[data-site-ambient-lens]");

  await page.mouse.move(420, 280);
  await expect(ambient).toHaveAttribute("data-active", "true");
  const firstTransform = await lens.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );

  await page.mouse.move(720, 360);
  await expect
    .poll(() =>
      lens.evaluate((element) => (element as HTMLElement).style.transform),
    )
    .not.toBe(firstTransform);

  await page.locator("#projects").scrollIntoViewIfNeeded();
  const projectTransform = await lens.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );
  await page.mouse.move(980, 640);
  await expect
    .poll(() =>
      lens.evaluate((element) => (element as HTMLElement).style.transform),
    )
    .not.toBe(projectTransform);
  await expect(ambient).toHaveAttribute("data-active", "true");

  const chain = page.locator("[data-motion-chain]");
  await chain.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(chain).toHaveAttribute("data-motion-chain-state", "complete", {
    timeout: 4_000,
  });
  await expect(
    chain.locator('[data-chain-stage][data-motion-state="complete"]'),
  ).toHaveCount(0);
  await expect(
    chain.locator('[data-chain-stage][data-motion-state="active"]'),
  ).toHaveCount(0);
  await expect(chain.locator(".chain-item.is-active")).toContainText(
    "Human decision",
  );

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await chain.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(chain).toHaveAttribute("data-motion-chain-state", "complete");
  await page.waitForTimeout(650);
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);

  await page.goto("/projects/ai-document-operations/");
  const caseAmbient = page.locator("[data-site-ambient]");
  await page.mouse.move(520, 420);
  await expect(caseAmbient).toHaveAttribute("data-active", "true");
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect(caseAmbient).not.toHaveAttribute("data-active", "true");
  expect(runtimeErrors).toEqual([]);
});

test("reduced motion keeps the stable visual state and starts no motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const ambient = page.locator("[data-site-ambient]");
  await page.mouse.move(420, 280);
  await expect(ambient).not.toHaveAttribute("data-active", "true");
  await expect(page.locator("[data-motion-chain]")).not.toHaveAttribute(
    "data-motion-chain-state",
    /.+/,
  );
  await expect(page.locator(".chain-item.is-active")).toContainText(
    "Human decision",
  );
  const reducedState = await page.evaluate(() => ({
    ambientDisplay: getComputedStyle(
      document.querySelector<HTMLElement>("[data-site-ambient]")!,
    ).display,
    runningAnimations: document
      .getAnimations()
      .filter((animation) => animation.playState === "running").length,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  expect(reducedState).toEqual({
    ambientDisplay: "none",
    runningAnimations: 0,
    scrollBehavior: "auto",
  });
});

test("mobile motion settles and project proof appears before dense copy", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile lifecycle test");

  await page.goto("/");
  await expect(page.locator("[data-site-ambient]")).not.toHaveAttribute(
    "data-active",
    "true",
  );
  const heroHeight = await page
    .locator(".hero")
    .evaluate((element) => Math.round(element.getBoundingClientRect().height));
  expect(heroHeight).toBeLessThanOrEqual(844);

  const firstProject = page.locator(".project-feature").first();
  const order = await firstProject.evaluate((element) => {
    const media = element
      .querySelector(".project-media")!
      .getBoundingClientRect();
    const copy = element
      .querySelector(".project-copy")!
      .getBoundingClientRect();
    return { mediaTop: media.top, copyTop: copy.top };
  });
  expect(order.mediaTop).toBeLessThan(order.copyTop);

  const chain = page.locator("[data-motion-chain]");
  await chain.scrollIntoViewIfNeeded();
  await expect(chain).toHaveAttribute("data-motion-chain-state", "complete", {
    timeout: 4_000,
  });
  await page.waitForTimeout(500);
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
});

test("switching to reduced motion mid-sequence restores the final state", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop lifecycle test");

  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto("/");

  const ambient = page.locator("[data-site-ambient]");
  const chain = page.locator("[data-motion-chain]");
  await page.mouse.move(420, 280);
  await expect(ambient).toHaveAttribute("data-active", "true");
  await chain.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(chain).toHaveAttribute("data-motion-chain-state", "running");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(chain).toHaveAttribute("data-motion-chain-state", "complete");
  await expect(ambient).not.toHaveAttribute("data-active", "true");
  await expect(chain.locator("[data-chain-sweep]")).not.toHaveAttribute(
    "style",
    /transform/,
  );
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
  expect(runtimeErrors).toEqual([]);
});

test("homepage remains complete when JavaScript is disabled", async ({
  browser,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One fallback pass is enough");

  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");

  await expect(
    page.getByRole("heading", { level: 1, name: "William Lo Channiko" }),
  ).toBeVisible();
  await expect(page.locator("[data-chain-stage]")).toHaveCount(4);
  await expect(page.locator(".chain-item.is-active")).toContainText(
    "Human decision",
  );
  await expect(page.getByRole("link", { name: "View projects" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View Invoice Review case study/ }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: /View Invoice Review case study/ }).first(),
  ).toBeVisible();
  await context.close();
});

test("AI Document case study exposes its verified scope", async ({ page }) => {
  await page.goto("/projects/ai-document-operations/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Invoice Review" }),
  ).toBeVisible();
  await expect(page.getByText("68%", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View public repository/ }),
  ).toBeVisible();
  const caseNavigation = page.getByRole("navigation", {
    name: "Case study sections",
  });
  if (page.viewportSize()!.width <= 560) {
    await expect(caseNavigation).toBeHidden();
  } else {
    await expect(caseNavigation).toBeVisible();
  }
  await expect(
    page.getByRole("link", {
      name: /Open Invoice Review product screenshot at full size/,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("ERPNext workflow benchmark complete", { exact: true }),
  ).toBeVisible();
  await expectNoActionableAccessibilityFindings(page);
});

test("Support case study exposes governed evidence and its current boundary", async ({
  page,
}) => {
  await page.goto("/projects/ai-support-escalation/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Case Resolution Copilot" }),
  ).toBeVisible();
  const metrics = page.locator(".case-metrics dt");
  await expect(metrics).toHaveText(["~84%", "3/3", "375 ms"]);
  await expect(
    page.getByRole("link", { name: /View public repository/ }),
  ).toHaveAttribute(
    "href",
    "https://github.com/williamlo90/case-resolution-copilot",
  );
  await expect(
    page.getByRole("link", { name: /Invite-only preview/ }),
  ).toHaveCount(0);
  await expect(page.getByText(/invite-only access/i)).toHaveCount(0);
  await expect(page.locator(".case-prose")).toContainText(
    /real, bounded Gmail journey/i,
  );
  await expect(page.locator(".case-prose")).toContainText(
    /73 backend unit and contract checks/i,
  );
  await expect(page.locator(".case-boundary")).toContainText(
    /bounded to approved draft creation/i,
  );
  await expect(page.locator(".case-metrics")).not.toContainText(/491|57/);
  await expectNoActionableAccessibilityFindings(page);
});
