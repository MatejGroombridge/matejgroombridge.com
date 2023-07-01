<script>
	import Gallery from '$lib/photography/Gallery.svelte';
	import supabase from '$lib/db';
	import { each } from 'svelte/internal';

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

	async function getPhotos(photoID) {
		const { data, error } = await supabase.storage
			.from('public')
			.download(`photography/${photoID}.jpg`);
		return data;
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
		<!-- <Gallery gap="20" maxColumnWidth="300">
			{#each { length: 100 } as _, photo}
				{#await getPhotos(100 - photo)}
					<p>Loading...</p>
				{:then cover}
					<img src={URL.createObjectURL(cover)} alt="" />
				{/await}
			{/each}
		</Gallery> -->
		<p>Coming Soon...</p>
	</div>
</section>
<!-- 
<style>
	img {
		opacity: 0.9;
		transition: all 0.2s;
	}
</style> -->
