// mdsvex compiles `.md` files into Svelte components (see svelte.config.js).
declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
}
