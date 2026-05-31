<script lang="ts">
	import type { PageData } from './$types';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import BookCard from '$lib/components/site/BookCard.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import SortMenu, { type SortOption } from '$lib/components/site/SortMenu.svelte';
	import { bookNotesPage } from '$lib/content';

	let { data }: { data: PageData } = $props();

	const sortOptions: SortOption[] = [
		{ value: 'recent', label: 'Recently read' },
		{ value: 'rating', label: 'Highest rated' },
		{ value: 'title', label: 'Title A–Z' },
		{ value: 'author', label: 'Author A–Z' }
	];

	let sortKey = $state('recent');

	function parseRating(value: string): number {
		const match = value.match(/([\d.]+)/);
		return match ? parseFloat(match[1]) : 0;
	}

	const sortedBooks = $derived.by(() => {
		const books = [...data.books];
		if (sortKey === 'rating') {
			return books.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
		}
		if (sortKey === 'title') {
			return books.sort((a, b) => a.title.localeCompare(b.title));
		}
		if (sortKey === 'author') {
			return books.sort((a, b) => a.author.localeCompare(b.author));
		}
		return books.sort((a, b) => (b.id ?? -1) - (a.id ?? -1));
	});
</script>

<Seo {...bookNotesPage.seo} canonical="/booknotes" />
<PageTitle {...bookNotesPage.hero} />

<Section>
	<BlockHead title="Library">
		{#snippet aside()}
			<SortMenu options={sortOptions} value={sortKey} onChange={(v) => (sortKey = v)} />
		{/snippet}
	</BlockHead>
	<div class="books">
		{#each sortedBooks as book (book.slug)}
			<BookCard {book} />
		{/each}
	</div>
</Section>

<style lang="scss">
	.books {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
		gap: clamp(1.25rem, 2.5vw, 2rem) clamp(1rem, 2vw, 1.5rem);
	}
</style>
