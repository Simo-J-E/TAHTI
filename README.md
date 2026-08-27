# TAHTI

TAHTI is a responsive timetable application for Turku UAS. This repository is a production-ready rebrand and cleanup of the supplied Lukkarikone codebase. The timetable, calendar-source logic, custom events, local settings and existing calendar/realization API contract are preserved.

## Important data-layer note

The supplied repository does **not** contain a production database schema. Its backend is an Elysia/Bun calendar and realization proxy/cache; the old README marked Prisma and server-side user storage as TODO. TAHTI therefore does not invent or replace a database. It keeps the existing API contract and local persisted stores. If the existing backend later gains a database, keep that database and migrate it incrementally rather than replacing it.

## Stack

- React 19
- TypeScript strict mode
- Vite 7
- Tailwind CSS 4
- Zustand
- i18next / react-i18next
- Radix primitives where already used
- Elysia + Bun backend proxy/cache
- GitHub Pages frontend hosting
- GitHub Actions CI/CD

## Quality gate

Every change is expected to pass:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run standards
npm run build
npm run test:e2e
```

`npm run verify` runs the fast checks and production build. Browser smoke tests are a separate command because Playwright needs a browser installation.

Quality tooling:

- Prettier
- ESLint flat config
- strict TypeScript
- Vitest
- Testing Library
- axe-core
- Playwright
- `scripts/check-standards.mjs`

## Local setup

### Frontend

Requirements: Node.js 24+ (Node 24 is used in CI/CD).

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

### Existing backend

The supplied backend uses Bun:

```bash
bun install
npm run dev:backend
```

The frontend uses `http://localhost:3001` automatically in Vite development mode.

## Environment variables

Copy `.env.example` if you need to override defaults.

```text
VITE_API_BASE_URL
VITE_REALIZATION_API_BASE_URL
VITE_BASE_PATH
```

Only browser-safe values belong in `VITE_*` variables. Never put a service-role key, database admin password or other private server credential in them.

The production fallback keeps the original supplied API endpoints so existing timetable data continues to work:

```text
https://lukkari-api.juh.fi/api
https://lukkari-api.juh.fi
```

## GitHub Pages deployment

### One-time repository setup

Before the first deployment, enable GitHub Pages for the repository:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Re-run **Deploy GitHub Pages** from the Actions tab, or push another commit to `main`.

GitHub requires this repository-level Pages setting before `actions/configure-pages` and `actions/deploy-pages` can deploy using the normal `GITHUB_TOKEN`. No personal access token is required for the normal workflow.

The workflows use Node.js 24 and Node-24-compatible action releases (`checkout@v6`, `setup-node@v6`, `configure-pages@v6`, `upload-pages-artifact@v5`, and `deploy-pages@v5`).


1. Create a GitHub repository.
2. Upload/push this repository.
3. Open **Settings → Pages**.
4. Set the source to **GitHub Actions**.
5. Push to `main`.

`.github/workflows/pages.yml` then:

1. installs dependencies with `npm install --no-audit --no-fund`
2. checks Prettier
3. runs ESLint
4. runs TypeScript checks for frontend and backend
5. runs Vitest
6. runs repository standards checks
7. builds with the base path reported by GitHub Pages (repository path, root site, or custom domain)
8. runs Playwright + axe smoke tests
9. uploads `apps/frontend/dist`
10. deploys the artifact to GitHub Pages

The application uses hash routing, so direct refreshes do not depend on a server-side SPA fallback.

## CI

`.github/workflows/ci.yml` runs on pull requests, non-main pushes and manual dispatch. It runs the same quality checks and browser smoke test without deploying.

## Appearance

TAHTI supports:

- System
- Light
- Dark

On first load it follows `prefers-color-scheme`. A tiny script applies the correct mode before React paints to avoid a light-mode flash. Existing saved color palettes are preserved as accent palettes.

## Localization

The application supports Finnish and English. The first visit checks the browser's ordered language preferences. Explicit choices are saved locally and the document `lang` attribute changes with the selected language.

## Accessibility

The redesign targets WCAG 2.2 AA and the relevant web requirements of EN 301 549. The repository includes:

- semantic controls
- visible `:focus-visible` styling
- a skip-to-timetable link
- keyboard-accessible dialogs/controls through native HTML and Radix primitives
- reduced-motion handling
- automated axe checks
- desktop and mobile Playwright smoke tests
- agenda/schedule content retained from the original application

Automated tests do not replace manual NVDA/VoiceOver and zoom testing before a public release.

## Repository structure

```text
apps/frontend/      React/Vite application
apps/backend/       existing Elysia/Bun API proxy/cache
scripts/            repository standards checks
.github/workflows/  CI and GitHub Pages CD
```

## Privacy and security

TAHTI ships without the old third-party analytics scripts. Calendar text is rendered through React rather than untrusted raw HTML. The static GitHub Pages bundle must never contain privileged backend credentials.

## License

The supplied archive did not include a LICENSE file. See `UPSTREAM.md` and confirm the upstream licensing/permission situation before redistributing this derivative publicly.

Product specification: `docs/PRODUCT-SPEC.md`
