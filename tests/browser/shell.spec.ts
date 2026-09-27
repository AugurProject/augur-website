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

        const picker = page.locator(
          viewport.mobileMenu
            ? ".site-mobile-menu [data-site-theme]"
            : ".site-header__desktop-actions [data-site-theme]",
        );
        await picker.selectOption(theme);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

        if (viewport.mobileMenu) {
          await menuSummary.focus();
          await page.keyboard.press("Enter");
          await expect(menu).toHaveAttribute("open", "");
        }
        await expect(picker).toHaveValue(theme);

        await picker.selectOption("dark");
        const darkBackground = await background(page);
        await picker.selectOption("light");
        const lightBackground = await background(page);
        expect(darkBackground).not.toBe(lightBackground);
        await picker.selectOption("system");
        await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.+/);
        await page.emulateMedia({ colorScheme: "dark" });
        await expect.poll(() => background(page)).toBe(darkBackground);
        await page.emulateMedia({ colorScheme: "light" });
        await expect.poll(() => background(page)).toBe(lightBackground);
        await picker.selectOption(theme);

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
          await page.keyboard.press("Tab"); // Protocol
          await page.keyboard.press("Tab"); // Developers
          await page.keyboard.press("Tab"); // Resources
        } else {
          await page.locator(".site-header__desktop-nav .site-nav-resources > summary").focus();
        }

        const resources = page.locator(
          viewport.mobileMenu
            ? ".site-nav-resources--mobile"
            : ".site-header__desktop-nav .site-nav-resources",
        );
        await expect(resources.locator(":scope > summary")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(resources).toHaveAttribute("open", "");
        await page.keyboard.press("Tab");
        await expect(resources.getByRole("link", { name: "Learn" })).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/\/learn\/$/);
        await expect(page.getByRole("heading", { level: 1, name: "Learn" })).toBeVisible();
      });
    }
  });
}
