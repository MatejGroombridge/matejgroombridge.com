<script lang="ts">
	import type { PageData } from './$types';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import SortMenu, { type SortOption } from '$lib/components/site/SortMenu.svelte';
	import { writingPage } from '$lib/content';

	let { data }: { data: PageData } = $props();

	const sortOptions: SortOption[] = [
		{ value: 'newest', label: 'Newest first' },
		{ value: 'oldest', label: 'Oldest first' },
		{ value: 'title', label: 'Title A–Z' }
	];

	let sortKey = $state('newest');

	const sortedArticles = $derived.by(() => {
		const items = [...data.articles];
		if (sortKey === 'oldest') return items.sort((a, b) => a.number - b.number);
		if (sortKey === 'title') return items.sort((a, b) => a.title.localeCompare(b.title));
		return items.sort((a, b) => b.number - a.number);
	});
</script>

<Seo {...writingPage.seo} canonical="/writing" />
<PageTitle {...writingPage.hero} />

<Section>
	<BlockHead title="Articles">
		{#snippet aside()}
			<SortMenu options={sortOptions} value={sortKey} onChange={(v) => (sortKey = v)} />
		{/snippet}
	</BlockHead>
	{#if sortedArticles.length === 0}
		<p class="empty">No articles yet. Check back soon.</p>
	{:else}
		<ul class="articles">
			{#each sortedArticles as article (article.slug)}
				<li>
					<a class="row" href={`/writing/${article.slug}`}>
						<span class="number">#{article.number}</span>
						<span class="title">{article.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</Section>

<style lang="scss">
	.articles {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.articles li {
		border-bottom: 1px dashed var(--color-border);
	}

	.articles li:last-child {
		border-bottom: none;
	}

	.row {
		--row-gap: 1rem;
		display: grid;
		grid-template-columns: 4.25rem 1fr;
		gap: var(--row-gap);
		align-items: baseline;
		padding: 0.95rem 0.25rem;
		text-decoration: none;
		color: inherit;
		transition: background-color 0.15s ease;
	}

	.row:hover,
	.row:focus-visible {
		background: var(--color-muted);
		outline: none;
	}

	.number {
		position: relative;
		font-family: var(--font-heading);
		font-variant-numeric: tabular-nums;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: lowercase;
		color: var(--color-subtle);
	}

	.number::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: calc(var(--row-gap) / -2);
		width: 1px;
		background: var(--color-border);
	}

	.title {
		color: var(--color-heading);
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		font-weight: 500;
	}

	.empty {
		color: var(--color-subtle);
		margin: 0;
	}

	@media (max-width: 480px) {
		.row {
			--row-gap: 0.75rem;
			grid-template-columns: 3rem 1fr;
		}
	}
</style>
