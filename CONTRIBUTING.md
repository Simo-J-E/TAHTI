# Contributing

Before opening a pull request:

```bash
npm install
npm run verify
npx playwright install chromium
npm run test:e2e
```

Use semantic HTML, keep keyboard operation intact, add Finnish and English strings together, and do not add privileged secrets to `VITE_*` environment variables.

Formatting is owned by Prettier. Linting is owned by ESLint. Do not commit editor-specific formatting rules that conflict with them.
