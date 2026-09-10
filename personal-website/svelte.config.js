import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { remarkArticleFootnotes } from './src/lib/markdown/remark-article-footnotes.js';

/**
 * Article bodies under `src/lib/content/writing/` are compiled by mdsvex, which
 * buys us two things the runtime markdown renderer could not: footnotes
 * authored inline in the same file as the prose, and unrestricted HTML (images,
 * figures, embeds) inside an article. `rehype-slug` gives every heading a stable
 * id so the table of contents in `writing.ts` can link straight to it.
 *
 * Footnotes use a local plugin rather than `remark-gfm`: mdsvex bundles
 * remark 8, and every release of remark-gfm targets remark 13+, so it attaches
 * without error and then does nothing. See the plugin for the authoring syntax.
 *
 * Book notes still render through `@humanspeak/svelte-markdown` at runtime.
 */
const mdsvexConfig = {
	extensions: ['.md'],
	remarkPlugins: [remarkArticleFootnotes],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		// mdsvex generates its own component source, so leave those files on the
		// compiler's own default rather than forcing a mode onto generated code.
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
				? undefined
				: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
