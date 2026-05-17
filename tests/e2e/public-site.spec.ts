import { expect, test } from "@playwright/test"

test("public site presents current profile and contact paths", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "Adolfo Tamayo" })).toBeVisible()
  await expect(page.getByText("Tech Lead, AI Engineering at Lawhive")).toBeVisible()
  await expect(page.getByText("Lawhive").first()).toBeVisible()
  await expect(page.getByText("Revolut").first()).toBeVisible()
  await expect(page.getByText("Mar 2026 - Present")).toBeVisible()
  await expect(page.getByText("Jul 2022 - May 2025")).toBeVisible()

  await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/adolfo-tamayo/"
  )
  await expect(page.getByRole("link", { name: /^X$/ })).toHaveAttribute(
    "href",
    "https://twitter.com/atamayobr"
  )
})

test("public site has no mobile horizontal overflow or broken images", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    brokenImages: Array.from(document.images).filter(
      (image) => !image.complete || image.naturalWidth === 0
    ).length,
  }))

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth)
  expect(metrics.brokenImages).toBe(0)
})

test("legacy resume route intentionally redirects to experience section", async ({ page }) => {
  await page.goto("/resume")

  await expect(page).toHaveURL(/\/#experience$/)
  await expect(page.getByRole("heading", { name: "AI, platforms, fintech." })).toBeVisible()
})
