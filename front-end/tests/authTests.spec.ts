import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should log in and redirect to dashboard", async ({ page }) => {
    // Navigate to login page
    await page.goto("/login");

    // Fill in login form
    await page.getByTestId("email").fill("t@t.com");
    await page.getByPlaceholder("Password").fill("t");
    await page.getByTestId("submit").click();

    // Ensure the token is stored
    await page.waitForURL("/");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).not.toBeNull();

    // Check redirection to the dashboard (or the protected route)
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Dashboard")).toBeVisible(); // Example of dashboard content
  });

  test("should log out and redirect to login", async ({ page }) => {
    await page.goto("/login");

    // Fill in login form
    await page.getByTestId("email").fill("t@t.com");
    await page.getByPlaceholder("Password").fill("t");
    await page.getByTestId("submit").click();

    await page.waitForURL("/");

    // Click on the logout button
    await page.getByTestId("dropdown").click();
    await page.getByTestId("logout").click(); // Make sure the button has this ID or adjust selector

    await page.waitForURL("/login");

    // Ensure token is removed from localStorage
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();

    // Check redirection to login page
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated user to login when accessing dashboard", async ({
    page,
  }) => {
    // Try to visit the dashboard without a token
    await page.goto("/");

    // Check if we were redirected to the login page
    await expect(page).toHaveURL("/login");
    await expect(page.getByText("Login to your account")).toBeVisible(); // Example text on login page
  });

  test("should allow authenticated user to access protected routes", async ({
    page,
  }) => {
    // Log in first
    await page.goto("/login");
    await page.getByTestId("email").fill("t@t.com");
    await page.getByPlaceholder("Password").fill("t");
    await page.getByTestId("submit").click();

    await page.waitForURL("/");

    // Visit the dashboard
    await page.goto("/transactions");
    await expect(page.getByText("Transaction List")).toBeVisible();
  });
});
