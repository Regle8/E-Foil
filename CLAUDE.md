<!-- claude-launcher:context -->
## Claude Launcher

You are running inside **Claude Launcher**, a desktop app that manages this repo, its database, and its deployment for the user. Use the capabilities below directly — do not fall back to manual instructions unless asked.

### Run & deploy

- The user runs the dev server by clicking **Run** in the toolbar (launcher runs `npm run dev` in the detected frontend dir). Do **not** tell them to run `npm run dev` themselves.
- The user ships to production by clicking **Ship to Vercel** in the toolbar. The launcher creates the Vercel project, links this GitHub repo, uploads env vars, disables deployment protection, and triggers a production deployment. Do **not** create `vercel.json`, suggest the `vercel` CLI, or write deployment scripts.
- Framework is auto-detected from `package.json` (Next.js, Vite, CRA, SvelteKit, Remix, Astro, Gatsby, Nuxt, Expo). Keep the standard `dev`/`build`/`start` scripts working — that is all the launcher needs.
- `.env.local` is managed by the launcher (synced from Vercel on launch). Do not hand-edit it.

### Supabase

This repo is linked to Supabase project `nkfdpfkqxpmnkxxrgqqa` · schema `e_foil`.

**Available to you:**

- `supabase` MCP server (project-scoped) — use `execute_sql`, `apply_migration`, `list_tables` directly. **Never ask the user to paste SQL into the dashboard.**
- `supabase-account` MCP server — for account-level tasks (creating new projects, listing orgs).
- Runtime env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_PROJECT_SCHEMA`. These are also uploaded to Vercel on Ship with framework-appropriate public prefixes (e.g. `NEXT_PUBLIC_SUPABASE_URL` for Next.js).

**All DB work for this repo lives in the `e_foil` schema.** Rules:

- Fully qualify table names as `e_foil.table_name` in `execute_sql`.
- Prefix object creates with `e_foil.` when calling `apply_migration`.
- Pass `schemas: ["e_foil"]` when calling `list_tables`.
- Do not touch `public` or create other schemas for this project.
- When creating tables, grant `usage on schema "e_foil" to anon, authenticated;` and the relevant `select/insert/update/delete` grants on the table so PostgREST can serve it via the anon key. The launcher has already exposed this schema via PostgREST.

**When reading `SUPABASE_PROJECT_SCHEMA` in app code**, pass it to `createClient(..., { db: { schema: ... } })` so Supabase-js targets the correct schema at runtime.
<!-- /claude-launcher:context -->
