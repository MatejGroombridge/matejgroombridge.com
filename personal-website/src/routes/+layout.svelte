<script lang="ts">
	import '$lib/design/global.scss';
	import { siteSettings } from '$lib/content/site';
	import Footer from '$lib/components/site/Footer.svelte';
	import Header from '$lib/components/site/Header.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { installPreserveCase } from '$lib/utils/preserveCase';

	let { children }: { children?: Snippet } = $props();

	onMount(() => {
		installPreserveCase(document.body);
	});
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#f9f8f4" />
	{#if siteSettings.analyticsId}
		<script
			async
			src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.analyticsId}`}
		></script>
	{/if}
</svelte:head>

<Header />
<main>
	{#key $page.url.pathname}
		<div class="page-transition">
			{@render children?.()}
		</div>
	{/key}
</main>
<Footer />

<style>
	.page-transition > :global(:not(.page-title):not(.hero-section)) {
		animation: page-rise 250ms ease backwards;
	}

	@keyframes page-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 20px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition > :global(*) {
			animation: none;
		}
	}
</style>
