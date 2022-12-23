<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../css/app.css';
	import PageTransitions from '$lib/pagetransitions/PageTransitions.svelte';
	import BackToTop from '$lib/backtotop/BackToTop.svelte';

	export let key;
</script>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LK1M7GLR61"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-LK1M7GLR61');
	</script>
</svelte:head>

<Header />

<PageTransitions refresh={key}>
	<main>
		<slot />
	</main>
</PageTransitions>

<BackToTop />

<Footer />
