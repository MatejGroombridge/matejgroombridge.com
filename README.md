# matejgroombridge.com

My personal website, managed as a pnpm monorepo.

## Workspaces

- `legacy` - the current production SvelteKit site, using `@sveltejs/adapter-netlify`
- `new-site` - the new SvelteKit site scaffold

## Commands

Install dependencies from the repository root:

```sh
pnpm install
```

Run the new site locally:

```sh
pnpm dev
```

Run or build the legacy site:

```sh
pnpm dev:legacy
pnpm build:legacy
```

`pnpm build` intentionally builds the legacy site so the existing Netlify deploy target stays on the current production site. Use `pnpm build:new` or `pnpm build:all` for the new site.

## Netlify

The root `netlify.toml` points Netlify at the `legacy` workspace:

```toml
[build]
base = "legacy"
command = "pnpm build"
```

If your Netlify UI has build settings that override `netlify.toml`, set the base directory to `legacy` and the build command to `pnpm build`.
