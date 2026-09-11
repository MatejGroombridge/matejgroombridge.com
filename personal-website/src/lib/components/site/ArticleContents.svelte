<!--
	Table of contents for an article.

	Rows come from the article record rather than being scraped from the body,
	because a body may only mark its sections with roman numerals — `## II` says
	nothing useful on its own, so the author supplies the label that belongs
	beside it. `id` is the heading's anchor, which mdsvex slugs from the heading
	text at build time.
-->
<script lang="ts">
	import type { ArticleSection } from '$lib/content/types';

	type Props = {
		sections: ArticleSection[];
		activeId?: string | null;
		onnavigate?: () => void;
	};

	let { sections, activeId = null, onnavigate }: Props = $props();
</script>

<nav id="article-contents" class="contents" aria-label="Table of contents">
	<h2 class="contents-title">Contents</h2>
	<ol>
		{#each sections as section (section.id)}
			<li>
				<a
					href={`#${section.id}`}
					class:active={activeId === section.id}
					aria-current={activeId === section.id ? 'location' : undefined}
					onclick={onnavigate}
				>
					{#if section.marker}
						<span class="marker" data-preserve-case>{section.marker}</span>
					{/if}
					<span class="label">{section.label}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style lang="scss">
	// No card, no panel — the list sits in the article column as another part of
	// the piece, marked only by the same micro-label the closing sections use.
	.contents {
		padding: 0;
	}

	// Headed like the article's own roman-numeral sections.
	.contents-title {
		margin: 0 0 1rem;
		font-family: var(--font-ui);
		font-weight: 700;
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
		letter-spacing: -0.03em;
		line-height: 1.25;
		color: var(--color-heading);
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.1rem;
	}

	a {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem 0.4rem 0;
		border-radius: var(--radius-sm);
		text-decoration: none;
		transition: background var(--duration-fast) ease;
	}

	a:hover {
		background: var(--color-muted);
	}

	a:focus-visible {
		outline: 2px solid var(--color-green);
		outline-offset: 2px;
	}

	// Mirrors the numerals it points at, so the row reads as one type system.
	.marker {
		font-family: var(--font-ui);
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--color-subtle);
		text-align: right;
	}

	.label {
		font-family: var(--font-ui);
		font-size: 0.86rem;
		font-weight: 500;
		color: var(--color-heading);
		line-height: 1.35;
	}

	a.active .marker,
	a.active .label {
		color: var(--color-green);
	}

	a:hover .label {
		color: var(--color-heading);
	}

	@media (max-width: 640px) {
		a {
			grid-template-columns: 1.75rem minmax(0, 1fr);
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
