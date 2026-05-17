import { expect, test } from "@playwright/test"

test("ai tools route is protected for unauthenticated visitors", async ({ page }) => {
  await page.goto("/ai-tools")

  await expect(page).toHaveURL(/\/login/)
  await expect(page.getByRole("button", { name: /sign in with google/i })).toBeVisible()
})

test("public route does not require authentication", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveURL("/")
  await expect(page.getByRole("heading", { name: "Adolfo Tamayo" })).toBeVisible()
})
