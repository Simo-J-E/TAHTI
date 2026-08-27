import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing page is accessible and has no horizontal overflow", async ({ page }) => {
  await page.goto("./");

  await expect(page.getByRole("heading", { level: 1, name: "TAHTI" })).toBeVisible();
  await expect(page.getByRole("link", { name: /open timetable|avaa lukujärjestys/i })).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
