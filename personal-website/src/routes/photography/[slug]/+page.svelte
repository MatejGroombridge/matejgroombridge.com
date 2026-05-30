<script lang="ts">
	import type { PageData } from './$types';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import Gallery from '$lib/components/site/Gallery.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import PhotoModal from '$lib/components/site/PhotoModal.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import type { PhotoImage } from '$lib/content/types';

	let { data }: { data: PageData } = $props();
	let selectedImage = $state<PhotoImage | undefined>();

	const place = $derived(
		data.trip.subtitle ? `${data.trip.title}, ${data.trip.subtitle}` : data.trip.title
	);

</script>

<Seo {...data.trip.seo} canonical={`/photography/${data.trip.slug}`} image={data.trip.coverImage} />
<PageTitle
	eyebrow={`Photography · ${data.trip.year}`}
	title={place}
/>

<Section>
	<BlockHead title="Gallery" />
	<Gallery
		images={data.trip.images}
		onselect={(image) => (selectedImage = image)}
		maxColumnWidth={260}
	/>
</Section>

<PhotoModal image={selectedImage} onclose={() => (selectedImage = undefined)} />
