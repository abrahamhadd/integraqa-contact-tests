# integraqa-contact-tests

Automated Playwright tests for the contact form on [integraqa.co.uk](https://integraqa.co.uk).

## Tests

The following scenarios are covered in `tests/contact-form.spec.ts`:

| Test | Description |
|------|-------------|
| Contact page loads and displays a form | Verifies the contact page is accessible and a form is rendered |
| Form has name, email and message fields | Checks that the core input fields are present |
| Submit button is present | Verifies the form has a submit button |
| Shows validation errors when submitting empty form | Confirms the form does not submit when required fields are empty |
| Rejects invalid email format | Confirms the form blocks submission with a malformed email address |
| Fills and submits the form successfully | Performs a full end-to-end form submission and checks for a success confirmation |

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
# Run all tests (headless)
npm test

# Run with a visible browser
npm run test:headed

# Open the HTML test report after a run
npm run test:report
```