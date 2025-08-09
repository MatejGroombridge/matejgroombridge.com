<script>
	import '../css/app.css';
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import BackToTop from '$lib/backtotop/BackToTop.svelte';

	import { onMount } from 'svelte';
	// import PageTransitions from '$lib/pagetransitions/PageTransitions.svelte';

	let { children } = $props();
	let ballsize = $state(0),
		positionX = $state(0),
		positionY = $state(0),
		ballsize2 = $state(0),
		positionX2 = $state(0),
		positionY2 = $state(0);

	let scroll = $state(0);

	onMount(() => {
		ballsize = Math.floor(Math.random() * 8 + 4);
		positionX = Math.floor(Math.random() * 5 + 10);
		positionY = Math.floor(Math.random() * 70 + 15);
		ballsize2 = Math.floor(Math.random() * 6 + 3);
		positionX2 = Math.floor(Math.random() * 20 + 70);
		positionY2 = Math.floor(Math.random() * 70 + 15);
	});
</script>

<svelte:head>
	<!-- Viewport meta tag for mobile responsiveness -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Global site tag - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LK1M7GLR61"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-LK1M7GLR61');
	</script>

	<!-- Favicons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
	<script src="https://kit.fontawesome.com/dbcb0024e0.js" crossorigin="anonymous"></script>
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

<!-- <PageTransitions refresh={data}>
	<main>
		{@render children()}
	</main>
</PageTransitions> -->

<main>
	{@render children()}
</main>

<BackToTop />

<Footer />
