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

		if (siteSettings.analyticsId) {
			window.dataLayer = window.dataLayer || [];
			// gtag relies on `arguments`, so it cannot be an arrow function.
			window.gtag = function gtag() {
				// eslint-disable-next-line prefer-rest-params
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());
			window.gtag('config', siteSettings.analyticsId);
		}
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

<!--
	No page-level rise animation: it animated each whole <section>, so a section's
	background (the muted grey bands) faded up along with its content. Section
	content still animates on scroll via the `reveal` action, which wraps only the
	inner container and leaves backgrounds static.
-->
