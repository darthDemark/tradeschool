# Trade School

A single Next.js 16 (App Router) + React 19 + TypeScript app — an options-trading education prototype. Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`) and setup is documented in `README.md`.

## Cursor Cloud specific instructions

- Single product, no monorepo, no Docker/compose/Makefile. The only service is the Next.js server on port `3000` (`npm run dev`).
- The app runs fully on mock data + `localStorage` with **no environment variables**. Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) and OpenAI (`OPENAI_API_KEY`) are optional; when unset, `lib/supabase/*` return `null` and `app/api/professor/route.ts` serves canned `MOCK_RESPONSES`. No DB/cache/queue is needed to run or test end-to-end.
- `npm run lint` currently reports one pre-existing error (`react/no-unescaped-entities` in `app/lessons/[id]/page.tsx`) plus warnings. This is pre-existing in the repo, not an environment problem.
- The `/api/professor` route expects a JSON body of `{ "message": "..." }` (singular `message`, validated by `zod`), not `{ messages: [...] }`.
