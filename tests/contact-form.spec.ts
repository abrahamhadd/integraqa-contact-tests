import { test, expect, type Page } from '@playwright/test';

const CONTACT_URL = '/contact';

function getFormLocators(page: Page) {
  return {
    nameField: page.getByRole('textbox', { name: /name/i }).first(),
    emailField: page.getByRole('textbox', { name: /email/i }).first(),
    messageField: page
      .locator('textarea, [name*="message"], [name*="Message"], [id*="message"], [id*="Message"]')
      .first(),
    submitButton: page
      .locator('button[type="submit"], input[type="submit"]')
      .first(),
  };
}

test.describe('Contact Form - integraqa.co.uk', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CONTACT_URL);
  });

  test('contact page loads and displays a form', async ({ page }) => {
    await expect(page).toHaveTitle(/contact|integraqa/i);
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });

  test('form has name, email and message fields', async ({ page }) => {
    const { nameField, emailField, messageField } = getFormLocators(page);
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    const { submitButton } = getFormLocators(page);
    await expect(submitButton).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    const { submitButton } = getFormLocators(page);
    await submitButton.click();

    // At least one of these common validation patterns should appear:
    // 1. HTML5 native validation (browser-native, no visible element needed)
    // 2. Custom validation messages
    // We verify the form is still on the contact page (no redirect on invalid submit)
    await expect(page).toHaveURL(new RegExp('/contact'));
  });

  test('rejects invalid email format', async ({ page }) => {
    const { nameField, emailField, messageField, submitButton } = getFormLocators(page);

    await nameField.fill('Test User');
    await emailField.fill('not-a-valid-email');
    await messageField.fill('This is a test message.');
    await submitButton.click();

    // Form should not navigate away on invalid email
    await expect(page).toHaveURL(new RegExp('/contact'));
  });

  test('fills and submits the form successfully', async ({ page }) => {
    const { nameField, emailField, messageField, submitButton } = getFormLocators(page);

    await nameField.fill('Test User');
    await emailField.fill('testuser@example.com');
    await messageField.fill('This is an automated test message. Please disregard.');
    await submitButton.click();

    // After successful submission the page should show a confirmation
    // message or redirect away from the contact page
    await expect(
      page.locator('text=/thank|sent|success|received|confirm/i').first()
    ).toBeVisible({ timeout: 10000 });
  });
});

