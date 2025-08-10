<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Gallery from '$lib/photography/Gallery.svelte';
	import { tripSlugs } from '$lib/photography/trip-slugs.js';
	import { photosData } from '$lib/photography/photos-data.js';

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
					}
				},
				{
					threshold: 1
				}
			);
		});

		observer.observe(e);
	}

	const ID = $page.params.slug;
	let length = 0;
	let isDesktop = false;

	// Images are served from the static directory; construct URLs directly.

	function fetchTripData(slug) {
		const trip = tripSlugs.find((trip) => trip.slug === slug);
		return trip;
	}

	async function getLength() {
		length = 0;

		photosData.forEach((photo) => {
			if (photo.slug != ID) {
				return;
			}

			length = photo.length;
		});

		return length;
	}

	getLength();

	// Enable modal only on desktop (hover + fine pointer + reasonable width)
	onMount(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
		const update = () => (isDesktop = mq.matches);
		update();
		if (mq.addEventListener) {
			mq.addEventListener('change', update);
			return () => mq.removeEventListener('change', update);
		} else {
			// Safari fallback
			mq.addListener(update);
			return () => mq.removeListener(update);
		}
	});
</script>

<svelte:head>
	<title>{fetchTripData(ID).title} // Photography</title>
	<meta
		name="description"
		content="A collection of my travel photography. Hi, my name is Matej Groombridge. I am a student, tutor and freelance web designer/website developer from Sydney, Australia. I love to read books and share what I've learned through my website's free book notes."
	/>
</svelte:head>

<!-- <svelte:head>
	{#await fetchData() then book}
		<title>{book.title} | Summary, Notes & Quotes</title>
		<meta name="description" content="The Book in 3 Sentences • {book.description}" />
	{/await}
</svelte:head> -->

<section>
	<div class="wrapper shown">
		<div class="content">
			<h1>Travel Photography</h1>
		</div>
	</div>
	<div class="wrapper shown">
		<div class="abovetitle">
			{#if fetchTripData(ID).subtitle != ''}
				<strong>{fetchTripData(ID).title}, {fetchTripData(ID).subtitle}</strong> //
				<strong>{fetchTripData(ID).year}</strong>
			{:else}
				<strong>{fetchTripData(ID).title}</strong> // <strong>{fetchTripData(ID).year}</strong>
			{/if}
		</div>
	</div>
	<div class="two-margin mobile-two-margin"></div>
	<div class="wrapper shown">
		<Gallery gap={20} maxColumnWidth={300} hasModal={isDesktop} type="tripImages">
			{#each Array.from({ length }).keys() as photoNum}
				<img
					src={`/photography/all-photos/${ID + '_' + photoNum}.webp`}
					alt={`${ID}-${photoNum}`}
					loading="lazy"
					on:error={(e) => e.currentTarget.remove()}
				/>
			{/each}
		</Gallery>
	</div>
</section>
