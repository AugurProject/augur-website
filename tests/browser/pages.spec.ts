import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("page content shares the shell frame and styles prose", async ({ page }) => {
      for (const { path, hasContentLink } of [
        { path: "/", hasContentLink: true },
        { path: "/protocol/", hasContentLink: true },
        { path: "/about/", hasContentLink: false },
      ]) {
        await page.goto(path);
        const brand = await page.locator(".site-header__brand").boundingBox();
        // Homepage bands run full bleed; their content sits in the shared frame.
        const main = await page.locator("main.site-frame, main .site-frame").first().boundingBox();
        const footer = await page.locator(".site-footer__inner").boundingBox();
        expect(main!.x).toBeCloseTo(brand!.x, 0);
        expect(main!.x).toBeCloseTo(footer!.x, 0);

        const heading = await page.getByRole("heading", { level: 1 }).evaluate((h) => {
          const style = getComputedStyle(h);
          return { family: style.fontFamily, size: parseFloat(style.fontSize) };
        });
        expect(heading.family).toMatch(/^"?Sora/);
        expect(heading.size).toBeGreaterThan(24);

        if (hasContentLink) {
          await expect(page.locator("main a:not([class])").first()).toHaveCSS("text-decoration-line", "underline");
        }
      }
    });
  });
}

test("desktop Resources closes when keyboard focus leaves it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const resources = page.locator(".site-header__desktop-nav .site-nav-resources");
  await resources.locator(":scope > summary").focus();
  await page.keyboard.press("Enter");
  await expect(resources).toHaveAttribute("open", "");
  for (const label of ["Learn", "REP", "Research", "History"]) {
    await page.keyboard.press("Tab");
    await expect(resources.getByRole("link", { name: label })).toBeFocused();
    await expect(resources).toHaveAttribute("open", "");
  }
  await page.keyboard.press("Tab");
  await expect(page.locator(".site-header__desktop-nav").getByRole("link", { name: "Blog" })).toBeFocused();
  await expect(resources).not.toHaveAttribute("open", "");
});

test("404 keeps the requested address and offers the contract routes", async ({ page }) => {
  const response = await page.goto("/no-such-page/?from=test");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveURL(/\/no-such-page\/\?from=test$/);
  await expect(page.locator("[data-requested-path]")).toHaveText("/no-such-page/?from=test");
  const links = page.locator(".site-not-found__links a");
  await expect(links).toHaveCount(4);
  expect(await links.evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")))).toEqual([
    "/",
    "/protocol/",
    "/research/",
    "/faq/",
  ]);
});
