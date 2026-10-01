import { expect, test } from "@playwright/test";

const question = "Will room-temperature superconductivity at ambient pressure be independently demonstrated?";
const navy = "rgb(14, 14, 33)";

test.describe("homepage narrative", () => {
  test.use({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });

  test("keeps the strategy's nine-part order and the In development stage", async ({ page }) => {
    await page.goto("/");
    const bands = page.locator("main.home > section");
    await expect(bands).toHaveCount(9);
    expect(await bands.evaluateAll((sections) => sections.map((s) => s.id))).toEqual([
      "",
      "why",
      "how",
      "open-work",
      "use-cases",
      "zoltar",
      "blog",
      "questions",
      "next",
    ]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Frontier of Decentralized Truth");
    await expect(page.locator(".home-hero .home-eyebrow")).toContainText("In development");
    await expect(page.locator(".home-hero").getByRole("link", { name: "Explore the protocol" })).toHaveAttribute("href", "/protocol/");
  });

  test("carries the worked example without inventing a result", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".q-record__question")).toHaveText([question, question]);
    for (const record of await page.locator(".q-record").all()) {
      await expect(record).toContainText("Illustrative");
      await expect(record.locator('[aria-current="step"]')).toHaveText("Asked");
      await expect(record.locator(".q-record__outcomes li")).toHaveText(["Yes", "No", "Invalid"]);
    }
    await expect(page.locator(".q-record--closing")).toContainText("Not recorded");
    // The staircase text is the figure's content: five stages, each with the example.
    await expect(page.locator(".stair__stages > li")).toHaveCount(5);
    await expect(page.locator(".stair__example")).toHaveCount(5);
    await expect(page.locator(".stair")).toContainText("Proposed design");
  });

  test("names roadmap state in words and shapes, with evidence", async ({ page }) => {
    await page.goto("/");
    const columns = page.locator(".home-roadmap__status");
    await expect(columns).toHaveText(["Completed", "In progress", "Next"]);
    expect(await columns.locator(".home-marker").evaluateAll((markers) => markers.map((m) => m.getAttribute("data-shape")))).toEqual([
      "filled",
      "half",
      "open",
    ]);
    for (const item of await page.locator(".home-roadmap__item").all()) {
      await expect(item.locator(".home-roadmap__meta a").first()).toHaveAttribute("href", /^https:\/\//);
    }
    await expect(page.locator(".home-roadmap")).toContainText("awaiting maintainer confirmation");
    await expect(page.locator(".home-field")).toContainText("not evidence for Augur Lituus");
  });

  test("keeps the hero, Zoltar and closing bands Navy in both themes", async ({ page }) => {
    await page.goto("/");
    const fixed = page.locator(".home-hero, #zoltar, #next");
    for (const band of await fixed.all()) {
      await expect(band).toHaveAttribute("data-theme", "dark");
      await expect(band).toHaveCSS("background-color", navy);
    }
    await expect(page.locator("#why")).not.toHaveCSS("background-color", navy);

    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator(".home-hero")).toHaveCSS("background-color", navy);
    await expect(page.locator("#next")).toHaveCSS("background-color", navy);
    // In the dark theme the Zoltar band lifts to Surface 2.
    await expect(page.locator("#zoltar")).toHaveCSS("background-color", "rgb(29, 29, 48)");
  });

  test("reaches the community from the closing band and the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#next").getByRole("link", { name: /Join the Discord/ })).toHaveAttribute("href", "https://discord.gg/Y3tCZsSmz3");
    const community = page.locator(".site-footer__links > div", { has: page.getByRole("heading", { name: "Community" }) });
    await expect(community.getByRole("link", { name: "Discord" })).toHaveAttribute("href", "https://discord.gg/Y3tCZsSmz3");
    await expect(page.locator(".site-footer")).toHaveAttribute("data-theme", "dark");
  });

  test("reflows at 320px without horizontal scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    // The narrow ledger branches downward; the staircase becomes a ladder.
    await expect(page.locator(".ledger__lines--tall").first()).toBeVisible();
    await expect(page.locator(".stair__chart")).toBeHidden();
    await expect(page.locator(".stair__rung").first()).toBeVisible();
  });
});

test.describe("homepage motion", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("stays static under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const figure of await page.locator("[data-motion]").all()) {
      await expect(figure).not.toHaveAttribute("data-motion-state", /.+/);
    }
  });

  test("plays each figure once as it enters view and ends complete", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const stair = page.locator(".stair");
    await expect(stair).toHaveAttribute("data-motion-state", "armed");
    await stair.scrollIntoViewIfNeeded();
    await expect(stair).toHaveAttribute("data-motion-state", "play");
    // After the sequence every step is fully drawn.
    await expect
      .poll(() => stair.locator(".stair__step").evaluateAll((steps) => steps.every((s) => getComputedStyle(s).clipPath.includes("-4px"))))
      .toBe(true);
    await expect.poll(() => stair.locator(".stair__act-box").evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });
});
