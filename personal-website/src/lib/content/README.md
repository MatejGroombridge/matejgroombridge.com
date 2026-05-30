# Content Editing Guide

This folder is the preferred editing surface for AI-assisted site changes.

## Common Changes

- Add or edit global navigation, footer links, socials, analytics, or defaults in `site.ts`.
- Edit homepage, about, and contact copy in `pages.ts`.
- Add a book note in `booknotes.ts`, then add its cover to `static/booknotes/book-cover/` and its Markdown body to `static/booknotes/book-markdown/`.
- Add a photo trip or image in `photography.ts`, then add referenced images under `static/photography/`.

## Rules

- Keep slugs stable once public.
- Use public-root asset paths such as `/photography/all-photos/sydney25_0.webp`.
- Every page, book note, and photo trip needs SEO title and description text.
- Prefer editing content records before changing Svelte components.
- Run `pnpm --filter @matejgroombridge/personal-website validate:content` after content changes.
