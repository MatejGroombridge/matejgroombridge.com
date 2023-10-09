<script>
	import Gallery from '$lib/photography/Gallery.svelte';
	import supabase from '$lib/db';
	import { tripSlugs } from '../../static/photography/trip-slugs.js';
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

<section>
	<div class="wrapper shown">
		<div class="abovetitle">Travel, Adventure & Landscapes</div>
	</div>
	<div class="wrapper shown">
		<div class="content">
			<h1>📸 My Photography 📸</h1>
		</div>
	</div>
	<div class="two-margin" />
	<div class="wrapper shown">
		<Gallery gap="15" maxColumnWidth="250" type="tripView">
			{#each tripSlugs as trip}
				{#await getPhotos(trip.slug) then tripImage}
					<img src={URL.createObjectURL(tripImage)} alt={trip.slug} />
				{/await}
			{/each}
		</Gallery>
	</div>
</section>
