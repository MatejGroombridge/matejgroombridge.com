<script>
	// import Gallery from '$lib/photography/Gallery.svelte';
	import supabase from '$lib/db';
	import { tripSlugs } from '$lib/photography/trip-slugs.js';
	import AutosizeText from '$lib/photography/AutosizeText.svelte';

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

	async function getPhotos(tripName) {
		const response = await fetch(`/photography/trip-photos/${tripName}.webp`);
		return response.blob();
	}
</script>

<svelte:head>
	<title>Photography</title>
	<meta
		name="description"
		content="A collection of my travel photography. Hi, my name is Matej Groombridge. I am a student, tutor and freelance web designer/website developer from Sydney, Australia. I love to read books and share what I've learned through my website's free book notes."
	/>
</svelte:head>

<section>
	<div class="wrapper shown">
		<div class="abovetitle">Travel, Adventure & Landscapes</div>
	</div>
	<div class="wrapper shown">
		<div class="content">
			<h1 class="hide-mobile">📸 My Photography 📸</h1>
			<h1 class="show-mobile">My Photography</h1>
		</div>
	</div>
	<div class="two-margin" />
	<div class="wrapper shown">
		<div class="content">
			<p>
				I'm currently updating this page to ensure compatibility with modern browsers. In the
				meantime, you can check out my photography on <a
					target="_blank"
					rel="noreferrer"
					href="https://www.instagram.com/matejsphotography/">instagram</a
				>.
			</p>
		</div>
		<!-- <Gallery gap="15" maxColumnWidth="250" type="tripView">
			{#each tripSlugs as trip}
				{#await getPhotos(trip.slug) then tripImage}
					<img src={URL.createObjectURL(tripImage)} alt={trip.slug} />
				{/await}
			{/each}
		</Gallery> -->
	</div>
</section>
