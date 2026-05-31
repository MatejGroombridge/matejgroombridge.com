# AGENTS.md

## Repo Overview

This is a pnpm monorepo for `matejgroombridge.com`.

- `legacy/` is the current production SvelteKit site. Netlify deploys from here.
- `personal-website/` is the new SvelteKit site scaffold and should be the main place for new-site work.
- `new-site/` is a leftover/transition path in the current working tree. Do not assume it is the active new site.

The legacy site is the only substantial implementation right now; use it as reference material, but avoid carrying over old structure unless it still fits the new site.

## Common Commands

Run commands from the repository root:

- `pnpm install` installs workspace dependencies.
- `pnpm dev` is intended to run the new site workspace.
- `pnpm dev:legacy` runs the legacy site.
- `pnpm build` intentionally builds the legacy site for the current Netlify deploy.
- `pnpm build:new` is intended to build the new site workspace.
- `pnpm build:all` builds all workspaces.
- `pnpm check` runs Svelte checks across workspaces.
- `pnpm lint` runs workspace lint checks.
- `pnpm format` formats workspace files.

If root scripts targeting the new site fail, check the workspace package name and pnpm filter. The root scripts currently expect `@matejgroombridge/personal-website`, while the scaffold package is named `personal-website`.

## Structure

### `legacy/`

- `src/routes/` contains SvelteKit pages for home, about, book notes, contact, photography, tutoring, and web design.
- `src/lib/` contains reusable components such as header, footer, contact forms, gallery/modal, carousel, timetable, and photography helpers.
- `src/css/` contains global CSS/SCSS. `src/routes/+layout.svelte` imports `src/css/app.css`.
- `static/` contains favicons, SEO files, book notes data/markdown/covers, photography images, and other public assets.

Legacy deployment uses `@sveltejs/adapter-netlify` via `legacy/svelte.config.js`.

### `personal-website/`

This is a minimal SvelteKit scaffold for the new site. It currently has very little source code:

- `src/routes/+layout.svelte` renders children only.
- `src/routes/+page.svelte` is empty.
- `src/lib/assets/favicon.svg` and `static/robots.txt` are scaffold assets.

It uses Svelte 5 with runes forced on for project files in `personal-website/svelte.config.js`.

## Style And Conventions

- Use tabs, single quotes, no trailing commas, and a 100-character print width. See `.prettierrc`.
- Prefer Svelte 5 runes in new code.
- Keep new-site work in `personal-website/` unless deliberately migrating legacy assets or content.
- Treat legacy content paths as public static paths: book notes use `/booknotes/...`, photography uses `/photography/...`.
- The legacy site mixes older Svelte patterns with newer runes, so copy patterns thoughtfully.

## Deployment Notes

`netlify.toml` points Netlify at the legacy workspace:

```toml
[build]
base = "legacy"
command = "pnpm build"
```

Do not change deployment to the new site unless that is the explicit task.

## Testing And Validation

There is no dedicated test suite yet. Before handing off changes, run the most relevant checks:

- New site changes: `pnpm --filter personal-website check` or `pnpm check`.
- Legacy changes: `pnpm --filter @matejgroombridge/legacy-site check` and, when relevant, `pnpm --filter @matejgroombridge/legacy-site lint`.
- Deployment-sensitive changes: `pnpm build` to confirm the legacy production build still works.
