# Personal Website

This is the new SvelteKit 2 / Svelte 5 version of `matejgroombridge.com`.

The architecture is built for fast, careful AI-assisted changes:

- `src/lib/content/` contains typed content records for pages, site settings, book notes, and photography.
- `src/lib/design/global.css` contains the small global design layer: legacy colours, typography, spacing, focus styles, and motion defaults.
- `src/lib/components/ui/` contains reusable primitives such as sections, cards, buttons, prose, and containers.
- `src/lib/components/site/` contains composed site components such as header, footer, SEO, forms, book cards, and galleries.
- `src/routes/` stays thin and composes content with shared components.

## Commands

Run from the repository root:

```sh
pnpm --filter @matejgroombridge/personal-website dev
pnpm --filter @matejgroombridge/personal-website check
pnpm --filter @matejgroombridge/personal-website lint
pnpm --filter @matejgroombridge/personal-website validate:content
```

The production Netlify deploy still points at `legacy/` until the new site is intentionally launched.
