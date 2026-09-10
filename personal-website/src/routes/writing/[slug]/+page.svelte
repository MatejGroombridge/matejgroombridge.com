<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';
	import ArticleContents from '$lib/components/site/ArticleContents.svelte';
	import ArticleToolbar from '$lib/components/site/ArticleToolbar.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import { loadArticleBody } from '$lib/content/articleBodies';

	let { data }: { data: PageData } = $props();

	let mode = $state<'full' | 'abridged'>('full');
	let showContents = $state(false);
	let versionId = $state<string | null>(null);
	let activeSection = $state<string | null>(null);

	// Older versions are fetched the first time they are opened, then kept.
	let versionBodies = $state<Record<string, Component>>({});
	let loadingVersion = $state(false);

	const sections = $derived(data.article.contents ?? []);
	const versions = $derived(data.article.versions ?? []);
	const standfirst = $derived(data.article.subtitle ?? data.article.description);
	const selectedVersion = $derived(versions.find((version) => version.id === versionId) ?? null);

	const body = $derived.by(() => {
		if (selectedVersion) return versionBodies[selectedVersion.id] ?? null;
		return mode === 'abridged' && data.abridged ? data.abridged : data.full;
	});

	// An archived copy has its own length, which we don't track, so the estimate
	// is dropped rather than shown wrong.
	const readingTime = $derived.by(() => {
		if (selectedVersion) return null;
		return mode === 'abridged' && data.article.abridgedReadingTime
			? data.article.abridgedReadingTime
			: data.article.readingTime;
	});

	// An archived copy is a snapshot: its headings and notes belong to the text
	// as it stood then, so the contents list is only offered for the live one.
	const contentsAvailable = $derived(sections.length > 0 && !selectedVersion);

	// A plain article earns no controls at all, and an empty toolbar is just a
	// stray band across the page — so the whole strip goes.
	const hasToolbar = $derived(Boolean(data.abridged) || sections.length > 0 || versions.length > 0);

	async function selectVersion(id: string | null) {
		versionId = id;
		// Archives are stored whole, so reading mode returns to the full text.
		if (id) mode = 'full';
		if (!id) return;

		const version = versions.find((entry) => entry.id === id);
		if (!version || versionBodies[id]) return;

		loadingVersion = true;
		try {
			const component = await loadArticleBody(version.body);
			if (component) versionBodies = { ...versionBodies, [id]: component };
		} finally {
			loadingVersion = false;
		}
	}

	function selectMode(next: 'full' | 'abridged') {
		// Reading mode applies to the live article, so leave an archived version.
		versionId = null;
		mode = next;
	}

	/**
	 * Marks the section the reader is currently in. Anchors are resolved from the
	 * rendered body rather than tracked by the markdown, so this works the same
	 * for full and abridged copies as long as their headings match.
	 */
	function trackActiveSection() {
		if (!contentsAvailable) return;
		let current: string | null = null;
		for (const section of sections) {
			const el = document.getElementById(section.id);
			if (el && el.getBoundingClientRect().top <= 140) current = section.id;
		}
		activeSection = current;
	}
</script>

<svelte:window onscroll={trackActiveSection} />

<Seo {...data.article.seo} canonical={`/writing/${data.article.slug}`} />

<!--
	Articles are authored with the site's lowercase styling already in mind — the
	casing in `writing.ts` and the markdown body is deliberate, acronyms included.
	`data-preserve-case` opts that copy out of lowercase mode (and out of the
	proper-noun walker), so it renders exactly as written.
-->
<Section animate={false} class="article-hero">
	<header class="hero" class:has-mark={Boolean(data.article.icon)}>
		<div class="hero-text">
			<h1 data-preserve-case>{data.article.title}</h1>
			{#if standfirst}
				<p class="standfirst" data-preserve-case>{standfirst}</p>
			{/if}
			<p class="byline">
				<span>{data.article.published}</span>
				{#if readingTime}
					<span class="dot" aria-hidden="true">·</span>
					<span>{readingTime}</span>
				{/if}
			</p>
		</div>

		{#if data.article.icon}
			<!-- Decorative: the title already names the piece. -->
			<div class="hero-mark" aria-hidden="true">
				<span class="material-symbols-rounded">{data.article.icon}</span>
			</div>
		{/if}
	</header>
</Section>

{#if hasToolbar}
	<Section animate={false} class="article-toolbar">
		<div class="toolbar-rule">
			<ArticleToolbar
				{sections}
				{versions}
				hasAbridged={Boolean(data.abridged)}
				{mode}
				showContents={showContents && contentsAvailable}
				{versionId}
				archived={Boolean(selectedVersion)}
				currentDate={data.article.published}
				onmode={selectMode}
				oncontents={() => (showContents = !showContents)}
				onversion={selectVersion}
			/>
		</div>
	</Section>
{/if}

{#if selectedVersion}
	<Section animate={false} class="article-archive-note">
		<div class="column">
			<p class="archive-note">
				You're reading an earlier version of this article, last modified
				<strong data-preserve-case>{selectedVersion.modified}</strong>.{#if selectedVersion.note}
					{' '}{selectedVersion.note}{/if}
				<button type="button" onclick={() => selectVersion(null)}
					>Back to the current version</button
				>
			</p>
		</div>
	</Section>
{/if}

<Section class="article-body" animate={false}>
	{#if showContents && contentsAvailable}
		<div class="contents-inline">
			<ArticleContents {sections} activeId={activeSection} />
		</div>
	{/if}

	<article class="body" data-preserve-case>
		{#if loadingVersion}
			<p class="status">Loading that version…</p>
		{:else if body}
			<Prose>
				{@const Body = body}
				<Body />
			</Prose>
		{:else}
			<p class="status">{data.article.description}</p>
		{/if}
	</article>
</Section>

{#if data.related.length}
	<Section class="article-related" animate={false}>
		<div class="column closing">
			<h2 class="related-title">More Writing</h2>
			<ul class="related-list">
				{#each data.related as article (article.slug)}
					<li>
						<a href={`/writing/${article.slug}`}>
							<span class="related-article-title" data-preserve-case>{article.title}</span>
							<span class="related-article-meta">{article.published}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Section>
{/if}

<Section class="article-footnote" animate={false}>
	<div class="column closing">
		<p class="footnote">
			Thanks for reading. If any of this landed — or missed — I'd love to hear
			<a href="/contact">your thoughts</a>.
		</p>
	</div>
</Section>

<style lang="scss">
	// Same rhythm as PageTitle, which heads photography, book notes and the rest.
	:global(.section.article-hero) {
		padding-top: clamp(2rem, 4.5vw, 3rem);
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
	}

	// Everything from the toolbar down sits on the reading column. The hero runs
	// wider, but both are centred on the same axis, so the step-in where the
	// article starts reads as deliberate rather than as a mismatch.
	.column,
	.contents-inline,
	.body {
		max-width: var(--size-prose);
		margin-inline: auto;
	}

	// Mirrors the book-note hero: copy on the left, the piece's mark on the right.
	.hero {
		display: grid;
		gap: 1.25rem;
		align-items: center;
	}

	.hero.has-mark {
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.hero-text {
		display: grid;
		gap: 0.85rem;
		justify-items: start;
		align-content: center;
		max-width: 640px;
		min-width: 0;
	}

	// A large monochrome glyph standing in for cover art. Light weight keeps it
	// graphic rather than heavy at display size.
	.hero-mark .material-symbols-rounded {
		display: block;
		font-size: clamp(4.5rem, 9vw, 8rem);
		font-variation-settings:
			'opsz' 48,
			'wght' 200;
		line-height: 1;
		color: var(--color-heading);
		user-select: none;
	}

	// Page title, so it matches the Fraunces `h1` every PageTitle route renders.
	.hero-text h1 {
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		font-size: clamp(2.4rem, 5vw, 3.4rem);
		line-height: 1.15;
		letter-spacing: -0.025em;
		margin: 0;
	}

	// Standfirst reads as a sentence, not a label.
	.standfirst {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.2vw, 1.08rem);
		font-weight: 400;
		color: var(--color-subtle);
		line-height: 1.6;
		max-width: 580px;
		margin: 0;
	}

	.byline {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.4rem;
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-subtle);
	}

	.dot {
		color: var(--color-green);
	}

	:global(.section.article-toolbar) {
		padding: 0;
	}

	// Rules rather than a filled band, and only as wide as the column, so the
	// controls read as part of the article instead of a strip laid across it.
	.toolbar-rule {
		padding: 1.05rem 0;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}

	:global(.section.article-body) {
		padding-top: clamp(2.5rem, 5vw, 3.75rem);
		padding-bottom: clamp(1.5rem, 3vw, 2.25rem);
	}

	:global(.section.article-archive-note) {
		padding: 1.25rem 0 0;
	}

	// Deliberately not a flex row: the sentence has to stay a sentence, and flex
	// would put a gap between every inline fragment of it.
	.archive-note {
		padding: 0.7rem 0.9rem;
		line-height: 1.6;
		border-left: 3px solid var(--color-green);
		background: var(--color-muted);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		font-size: 0.85rem;
		color: var(--color-subtle);
	}

	.archive-note button {
		border: 0;
		background: none;
		padding: 0;
		margin-left: 0.35rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-green);
		text-decoration: underline;
	}

	.archive-note button:focus-visible {
		outline: 2px solid var(--color-green);
		outline-offset: 2px;
	}

	// Shares the article's measure so it reads as part of the piece rather than
	// as page chrome.
	.contents-inline {
		margin-bottom: clamp(2rem, 4vw, 2.75rem);
		text-align: left;
	}

	.status {
		color: var(--color-subtle);
	}

	// A little breathing room above an anchor the reader has just jumped to.
	.body :global(.prose h2),
	.body :global(.prose h3) {
		scroll-margin-top: 2rem;
	}

	// Roman-numeral section markers need room to breathe between movements.
	.body :global(.prose h2) {
		margin-top: 2.75rem;
	}

	.body :global(.prose > :first-child) {
		margin-top: 0;
	}

	.body :global(.prose a) {
		text-decoration-color: var(--color-green);
	}

	.body :global(.prose hr) {
		border: 0;
		border-top: 1px solid var(--color-border);
		margin: 2rem 0;
	}

	// Raw HTML is allowed in article bodies, so keep any media the author drops
	// in from breaking the measure.
	.body :global(.prose img),
	.body :global(.prose video),
	.body :global(.prose iframe) {
		display: block;
		width: 100%;
		height: auto;
		margin: 1.75rem 0;
		border-radius: var(--radius-md);
	}

	.body :global(.prose figure) {
		margin: 1.75rem 0;
	}

	.body :global(.prose figcaption) {
		margin-top: 0.6rem;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		line-height: 1.45;
		color: var(--color-subtle);
		text-align: center;
	}

	// --- Footnotes (see lib/markdown/remark-article-footnotes.js) ------------

	.body :global(.fn-ref) {
		font-size: 0.62em;
		line-height: 0;
		vertical-align: super;
		margin-left: 0.08em;
		scroll-margin-top: 2rem;
	}

	.body :global(.fn-ref a) {
		font-family: var(--font-ui);
		font-weight: 700;
		color: var(--color-green);
		text-decoration: none;
		padding: 0 0.15em;
		border-radius: var(--radius-sm);
	}

	.body :global(.fn-ref a:hover) {
		background: var(--color-muted);
	}

	// Both ends of the jump highlight, so the reader keeps their place.
	.body :global(.fn-ref:target a),
	.body :global(.fn-item:target) {
		background: var(--color-muted-strong);
	}

	.body :global(.footnotes) {
		margin-top: clamp(3.5rem, 7vw, 5.5rem);
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	// Closing sections are headed exactly like the article's own roman-numeral
	// sections, so they read as further movements of the piece.
	.related-title,
	.body :global(.footnotes)::before {
		display: block;
		margin: 0 0 1.1rem;
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--color-heading);
	}

	.body :global(.footnotes)::before {
		content: 'footnotes';
	}

	.body :global(.footnotes ol) {
		display: grid;
		gap: 0.55rem;
		margin: 0;
		padding-left: 1.35rem;
	}

	.body :global(.fn-item) {
		padding: 0.15rem 0.35rem;
		border-radius: var(--radius-sm);
		scroll-margin-top: 2rem;
	}

	.body :global(.fn-body) {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-subtle);
	}

	.body :global(.fn-back) {
		margin-left: 0.35rem;
		color: var(--color-green);
		text-decoration: none;
		font-size: 0.95em;
	}

	.body :global(.fn-back:hover) {
		text-decoration: underline;
	}

	// --- Related + closing ---------------------------------------------------

	.related-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.1rem;
	}

	.related-list a {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem 1.5rem;
		padding: 0.5rem 0;
		text-decoration: none;
		transition: color var(--duration-fast) ease;
	}

	.related-list a:hover {
		color: var(--color-green);
	}

	.related-article-title {
		font-family: var(--font-prose);
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
		font-weight: 500;
		line-height: 1.4;
		color: var(--color-heading);
	}

	.related-list a:hover .related-article-title {
		color: var(--color-green);
	}

	.related-article-meta {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-subtle);
	}

	:global(.section.article-related) {
		padding: clamp(1.75rem, 3.5vw, 2.5rem) 0 0;
	}

	:global(.section.article-footnote) {
		padding: clamp(2.5rem, 5vw, 3.5rem) 0 clamp(3rem, 6vw, 4.5rem);
	}

	// Only one rule in the closing run — the one above the notes, marking where
	// the essay ends. Everything after it is separated by space alone.
	.closing {
		padding-top: 0;
	}

	.footnote {
		max-width: 56ch;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-subtle);
	}

	@media (max-width: 720px) {
		.hero,
		.hero.has-mark {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 1.25rem;
			min-height: 0;
		}

		.hero-text {
			justify-items: center;
		}

		// The mark leads on a narrow screen — it reads before the words do.
		.hero-mark {
			order: -1;
		}

		.hero-mark .material-symbols-rounded {
			font-size: clamp(4.5rem, 22vw, 6.5rem);
		}

		.byline {
			justify-content: center;
		}

		.related-list a {
			justify-content: center;
		}
	}

	// The site centres all copy under 640px. That reads fine for short blocks,
	// but a full essay set ragged-on-both-sides is hard to follow, so the body
	// alone opts back into a flush left edge.
	@media (max-width: 640px) {
		.body :global(.prose) {
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.related-list a {
			transition: none;
		}
	}
</style>
