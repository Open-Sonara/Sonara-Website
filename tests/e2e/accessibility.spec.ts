import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/features", "/about"];

for (const route of routes) {
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });

  test(`${route} has exactly one h1 and a skip link`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
  });
}
