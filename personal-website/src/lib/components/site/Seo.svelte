<script lang="ts">
	import { siteSettings } from '$lib/content/site';
	import type { Seo } from '$lib/content/types';

	type Props = Seo;

	let { title, description, image, canonical }: Props = $props();
	let fullTitle = $derived(title === siteSettings.name ? title : `${title} | ${siteSettings.name}`);
	let url = $derived(canonical ? `${siteSettings.baseUrl}${canonical}` : siteSettings.baseUrl);
	let imageUrl = $derived(image ? `${siteSettings.baseUrl}${image}` : undefined);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}
	<meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
	<link rel="canonical" href={url} />
</svelte:head>
