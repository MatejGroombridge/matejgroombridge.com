<script lang="ts">
	import type { PageData } from './$types';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import SortMenu, { type SortOption } from '$lib/components/site/SortMenu.svelte';
	import TripGallery from '$lib/components/site/TripGallery.svelte';

	let { data }: { data: PageData } = $props();

	const sortOptions: SortOption[] = [
		{ value: 'newest', label: 'Newest first' },
		{ value: 'oldest', label: 'Oldest first' },
		{ value: 'title', label: 'Title A–Z' }
	];

	let sortKey = $state('newest');

	const sortedTrips = $derived.by(() => {
		const trips = [...data.trips];
		if (sortKey === 'oldest') return trips.sort((a, b) => a.year - b.year);
		if (sortKey === 'title') return trips.sort((a, b) => a.title.localeCompare(b.title));
		return trips.sort((a, b) => b.year - a.year);
	});
</script>

<Seo
	title="Photography"
	description="Travel and everyday photography by Matej Groombridge."
	canonical="/photography"
/>
<PageTitle
	eyebrow="Photography"
	title="Travel photography"
	body="an archive — cool places I've photographed over the years"
/>

<Section>
	<BlockHead title="Trips">
		{#snippet aside()}
			<SortMenu options={sortOptions} value={sortKey} onChange={(v) => (sortKey = v)} />
		{/snippet}
	</BlockHead>
	<TripGallery trips={sortedTrips} gap={15} maxColumnWidth={250} />
</Section>
