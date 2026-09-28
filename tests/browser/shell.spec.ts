import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900, mobileMenu: false },
  { name: "mobile", width: 390, height: 844, mobileMenu: true },
] as const;
const themes = ["light", "dark"] as const;

async function background(page: Page) {
  return page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor);
}

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height }, colorScheme: "light" });

    for (const theme of themes) {
      test(`${theme} shell, theme behavior, fonts, and keyboard navigation`, async ({ page }, testInfo) => {
        const requests: string[] = [];
        const fontRequests: string[] = [];
        page.on("request", (request) => {
          requests.push(request.url());
          if (request.resourceType() === "font") fontRequests.push(request.url());
        });

        await page.goto("/");
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const menu = page.locator(".site-mobile-menu");
        const menuSummary = menu.locator(":scope > summary");
        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).toHaveAttribute("open", "");
        }

        const toggle = page.locator(
          viewport.mobileMenu
            ? ".site-mobile-menu [data-site-theme-toggle]"
            : ".site-header__desktop-actions [data-site-theme-toggle]",
        );
        // One press pins the opposite of the theme in effect.
        const pressUntil = async (target: "light" | "dark") => {
          for (let i = 0; i < 2 && (await page.locator("html").getAttribute("data-theme")) !== target; i++) {
            await toggle.click();
          }
          await expect(page.locator("html")).toHaveAttribute("data-theme", target);
        };
        await pressUntil(theme);
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).toHaveAttribute("open", "");
        }
        const other = theme === "dark" ? "Light" : "Dark";
        await expect(toggle).toHaveAttribute("aria-label", `Theme: ${theme === "dark" ? "Dark" : "Light"}. Switch to ${other}`);

        await pressUntil("dark");
        const darkBackground = await background(page);
        await pressUntil("light");
        const lightBackground = await background(page);
        expect(darkBackground).not.toBe(lightBackground);

        // With nothing stored, the system preference governs.
        await page.evaluate(() => localStorage.removeItem("augur-theme"));
        await page.reload();
        await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.+/);
        await page.emulateMedia({ colorScheme: "dark" });
        await expect.poll(() => background(page)).toBe(darkBackground);
        await page.emulateMedia({ colorScheme: "light" });
        await expect.poll(() => background(page)).toBe(lightBackground);
        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).toHaveAttribute("open", "");
        }
        await pressUntil(theme);

        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).not.toHaveAttribute("open", "");
        }

        await page.evaluate(() => document.fonts.ready);
        expect(fontRequests.length).toBeGreaterThan(0);
        for (const url of fontRequests) expect(new URL(url).origin).toBe(new URL(page.url()).origin);
        expect(requests.filter((url) => /fonts\.(?:googleapis|gstatic)\.com/.test(url))).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
        await page.screenshot({ path: testInfo.outputPath(`shell-${viewport.name}-${theme}.png`), fullPage: true });

        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).toHaveAttribute("open", "");
          // The sheet covers the viewport below the header and the page stops scrolling.
          const panel = await menu.locator(".site-mobile-menu__panel").boundingBox();
          expect(panel!.y + panel!.height).toBeCloseTo(viewport.height, 0);
          await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
          for (const label of ["Protocol", "Developers", "Blog", "FAQ", "Learn"]) {
            await page.keyboard.press("Tab");
            await expect(menu.getByRole("link", { name: label, exact: true })).toBeFocused();
          }
        } else {
          const resources = page.locator(".site-header__desktop-nav .site-nav-resources");
          await resources.locator(":scope > summary").focus();
          await page.keyboard.press("Enter");
          await expect(resources).toHaveAttribute("open", "");
          await page.keyboard.press("Tab");
          await expect(resources.getByRole("link", { name: /^Learn/ })).toBeFocused();
        }
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/\/learn\/$/);
        await expect(page.getByRole("heading", { level: 1, name: "Learn" })).toBeVisible();
      });
    }
  });
}

test("desktop Resources marks its section and shows hover in both themes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/learn/");
    const resources = page.locator(".site-header__desktop-nav .site-nav-resources");
    await expect(resources).toHaveAttribute("data-current-section", "");
    await resources.locator(":scope > summary").click();
    const panel = resources.locator(".site-nav-resources__panel");
    const link = panel.getByRole("link", { name: /^REP/ });
    const panelBg = await panel.evaluate((el) => getComputedStyle(el).backgroundColor);
    await link.hover();
    await expect.poll(() => link.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(panelBg);
  }
});
