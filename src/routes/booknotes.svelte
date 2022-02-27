<script>
	import supabase from '$lib/db';

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

	function getBooks() {
		return supabase.from('book').select(`
	    name,
	    year
	    `);
	}
</script>

<section class="head">
	<div class="wrapper shown">
		<div class="abovetitle">Summaries, Reviews, and Notes</div>
	</div>
	<div class="wrapper">
		<div class="content">
			<h1>📚 Books I've Read 📚</h1>
		</div>
	</div>
	<!-- <div class="wrapper">
		<div class="content">
			<p>
				This page will constantly update as I read more, so bookmark it if you want to check back in
				a few months.
			</p>
		</div>
	</div> -->
	{#await getBooks()}
		loading the game
	{:then response}
		<pre>{JSON.stringify(response, null, 2)}</pre>
	{/await}
</section>

<!-- <svelte:head>
	<title>About</title>
	<meta
		name="description"
		content="Hi, my name is Matej Groombridge. I am a high school student and web designer from Sydney, Australia. I offer private tutoring lessons as well as affordable freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head> -->
<style></style>
