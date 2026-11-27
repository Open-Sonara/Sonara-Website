import { expect, test } from "@playwright/test";

test("hero states the promise, the actions and the real status", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your music. Your server.");
  const hero = page.locator("section", { has: page.locator("#hero-title") });
  await expect(hero.getByRole("link", { name: /get started/i })).toHaveAttribute("href", "/#get-started");
  await expect(hero.getByRole("link", { name: /view on github/i })).toHaveAttribute("href", /github\.com\/Open-Sonara\/Sonara/);
  await expect(hero).toContainText("No release yet");
});

test("no install command is offered before a release exists", async ({ page }) => {
  await page.goto("/#get-started");
  const section = page.locator("#get-started");
  await expect(section).toContainText("There is nothing to install yet.");
  await expect(section.locator("pre")).toHaveCount(0);
});

test("the Sonara Inbox demo steps through to an organized file", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Run the Inbox" }).click();
  for (let i = 0; i < 4; i++) await page.getByRole("button", { name: /^Next:/ }).click();
  await expect(page.getByText("/music/Hollow Coast/Tidal Static (2023)/03 - Lighthouse Frequency.mp3")).toBeVisible();
  await page.getByRole("button", { name: "Start over" }).click();
  await expect(page.getByRole("button", { name: "Run the Inbox" })).toBeVisible();
});

test("the Rewind quiz answers", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Night Bus Diaries", exact: true }).click();
  await expect(page.getByText("Right: 61 plays in March.")).toBeVisible();
});

test("mobile menu opens, lists the navigation and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Features" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("features page shows statuses from config", async ({ page }) => {
  await page.goto("/features");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("how far along it is");
  await expect(page.getByText("Built, unreleased").first()).toBeVisible();
  await expect(page.getByText("Available", { exact: true })).toHaveCount(0);
});
