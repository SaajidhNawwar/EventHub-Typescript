# EventHub Playwright Tests

![Playwright Tests](https://github.com/SaajidhNawwar/EventHub-Typescript/actions/workflows/playwright.yml/badge.svg)

End-to-end UI tests for [EventHub](https://eventhub.rahulshettyacademy.com) built with
Playwright and TypeScript, using the Page Object Model.

**Latest Allure report:** https://<your-username>.github.io/<repo-name>/

## Tech stack

- Playwright (`@playwright/test`) with TypeScript
- Page Object Model with a `POManager`
- Allure and Playwright HTML reports
- GitHub Actions for CI, GitHub Pages for the report

## Project structure

```
├── .github/workflows/     # CI pipeline
├── pageObjects/           # Page objects and POManager
├── tests/
│   ├── auth.setup.ts      # Logs in once and saves the session
│   └── smoke/             # Spec files
├── Utils/                 # JSON test data
├── playwright.config.ts
└── .env.example
```

## Getting started

**Prerequisites:** Node.js (LTS) and Java 11+ (only needed to open Allure reports locally).

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm ci
npx playwright install chromium
```

Create a `.env` file from the example and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `BASE_URL` | `https://eventhub.rahulshettyacademy.com` |
| `USER_EMAIL` | Test account email |
| `USER_PASSWORD` | Test account password |

## Running tests

```bash
npx playwright test                       # all tests
npx playwright test --headed              # watch the browser
npx playwright test createEvent           # one file
npx playwright test -g "Delete an Event"  # one test by name
npx playwright test --ui                  # interactive UI mode
npx playwright test --debug               # step through with the Inspector
SLOWMO=1000 npx playwright test --headed  # slow motion
```

The `setup` project logs in once and saves the session to `playwright/.auth/user.json`.
All other tests reuse it. `login.spec.ts` runs logged out.

## Reports

```bash
npx playwright show-report                # Playwright HTML report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report             # Allure report (needs Java)
```

## CI/CD

The workflow in `.github/workflows/playwright.yml` runs on every push and pull request
to `main`, and can be started manually from the Actions tab. On `main`, the Allure report
is published to GitHub Pages.

Credentials come from repository secrets and variables: `USER_EMAIL` and `USER_PASSWORD`
(secrets) and `BASE_URL` (variable).

## Contributing

1. Branch from `main`: `git checkout -b feature/<short-name>`
2. Add tests and run them locally
3. Commit with a clear message (`test:`, `fix:`, `ci:`, `docs:`)
4. Push and open a pull request. CI must pass before merging.

Conventions:
- Each test creates its own data, using unique names
- Assertions live in tests, not page objects
- Locators: `getByRole`, `getByLabel`, `getByText` first
- No hard waits (`waitForTimeout`)