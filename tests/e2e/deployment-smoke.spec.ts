import { expect, test } from "@playwright/test"

test("public build serves the app shell and metadata", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle("Adolfo Tamayo")
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /AI infrastructure/
  )
})
