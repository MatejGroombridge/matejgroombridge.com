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
	import tilt from '../tilt.js';

	export let key;

	$: scroll = 0;

	let ballsize = Math.floor(Math.random() * 8 + 4);
	let positionX = Math.floor(Math.random() * 5 + 10);
	$: positionY = Math.floor(Math.random() * 70 + 15);

	let ballsize2 = Math.floor(Math.random() * 6 + 3);
	let positionX2 = Math.floor(Math.random() * 20 + 70);
	$: positionY2 = Math.floor(Math.random() * 70 + 15);
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

<svelte:window bind:scrollY={scroll} />

<Header />

<div class="blob-container">
	<div
		class="blob hide-mobile"
		style="transform: translate3d(0, {scroll *
			0.3}px, 0); clip-path: circle({ballsize}% at {positionX}vw {positionY}vh); height: 100vh; "
	/>

	<div
		class="blob hide-mobile"
		style="transform: translate3d(0, {scroll *
			0.2}px, 0); clip-path: circle({ballsize2}% at {positionX2}vw {positionY2}vh); height: 100vh; "
	/>
</div>

<PageTransitions refresh={key}>
	<main>
		<slot />
	</main>
</PageTransitions>

<BackToTop />

<Footer />
