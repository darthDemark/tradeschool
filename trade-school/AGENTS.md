<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- The app lives in the `trade-school/` subdirectory, not the repo root. Run all `npm` commands from there (e.g. `npm --prefix trade-school run dev`).
- This is a Phase 1 frontend-only prototype: Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4. There is no backend, database, auth, or env vars to configure — all data is static and lives in `lib/mockData.ts`.
- Standard scripts are in `trade-school/package.json`: `dev`, `build`, `start`, `lint`. The dev server runs on `http://localhost:3000`.
- `npm run lint` currently reports one pre-existing error (`react/no-unescaped-entities` in `app/lessons/[id]/page.tsx`) plus a few warnings. These are in app code, not the environment.
- `npm run build` passes; it does not fail on the lint error above.
