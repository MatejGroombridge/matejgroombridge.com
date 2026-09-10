import type { Component } from 'svelte';

/**
 * Every article body under `src/lib/content/writing/`, compiled by mdsvex and
 * code-split so a version only downloads when someone actually opens it.
 *
 * Keys look like `./writing/singularity.md`; content records store just the
 * module name (`'singularity'`).
 */
const bodies = import.meta.glob('./writing/*.md') as Record<
	string,
	() => Promise<{ default: Component }>
>;

export function hasArticleBody(name: string): boolean {
	return `./writing/${name}.md` in bodies;
}

/**
 * Resolves a body to its compiled component. Returns `null` for an unknown
 * name so a bad reference renders as a missing body rather than a crash.
 */
export async function loadArticleBody(name: string): Promise<Component | null> {
	const load = bodies[`./writing/${name}.md`];
	if (!load) return null;
	return (await load()).default;
}
