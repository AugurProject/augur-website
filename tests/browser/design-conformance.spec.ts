import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`${viewport.name} design-system conformance specimen`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/design-conformance/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");

    const light = page.locator('.site-specimen[data-theme="light"]');
    const dark = page.locator('.site-specimen[data-theme="dark"]');
    const bg = (l: typeof light) => l.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(await bg(light)).not.toBe(await bg(dark));

    // Same structure in both themes: order, count and dimensions of the specimens.
    for (const panel of [light, dark]) {
      await expect(panel.locator(".aug-button")).toHaveCount(14);
      await expect(panel.locator(".aug-card")).toHaveCount(1);
      await expect(panel.locator(".aug-page-header")).toHaveCount(1);
      await expect(panel.locator(".aug-empty-state")).toHaveCount(1);
    }
    const heights = async (l: typeof light) =>
      l.locator(".aug-button").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(await heights(light)).toEqual(await heights(dark));

    // Square geometry and pinned typography.
    for (const selector of [".aug-button", ".aug-card"]) {
      await expect(light.locator(selector).first()).toHaveCSS("border-radius", "0px");
    }
    await expect(light.locator(".aug-button").first()).toHaveCSS("font-family", /^"?Sora/);
    await expect(light.locator(".aug-card-content").first()).toHaveCSS("font-family", /^"?Schibsted Grotesk/);

    // Primary action pairing differs per theme (Deep in light, Green in dark).
    const primaryBg = (l: typeof light) =>
      l.locator(".aug-button--default").evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(await primaryBg(light)).not.toBe(await primaryBg(dark));

    // Shared focus ring reaches the specimen controls by keyboard.
    const first = light.locator(".aug-button--default");
    await first.focus();
    await expect(first).toHaveCSS("outline-width", "2px");
    await expect(first).toHaveCSS("outline-offset", "2px");

    // Supplied artwork, not a redraw.
    await expect(light.locator("img")).toHaveAttribute("src", "/brand/augur-horizontal-color.png");
    await expect(dark.locator("img")).toHaveAttribute("src", "/brand/augur-horizontal-reversed.png");

    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: testInfo.outputPath(`design-conformance-${viewport.name}.png`), fullPage: true });
  });
}
