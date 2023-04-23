<script>
	import supabase from '$lib/db';
	import tilt from '../tilt.js';

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
		id,
	    title,
	    author,
		slug
	    `);
	}

	async function getCovers(bookID) {
		const { data, error } = await supabase.storage.from('public').download(`covers/${bookID}.jpeg`);
		return data;
	}
</script>

<section>
	<div class="wrapper shown">
		<div class="abovetitle">Summaries, Reviews & Notes</div>
	</div>
	<div class="wrapper shown">
		<div class="content">
			<h1>📚 Books I've Read 📚</h1>
		</div>
	</div>
	<div class="two-margin" />
	<div class="wrapper" style="width: 75vw;" use:actionWhenInViewport>
		{#await getBooks()}
			<section>
				<div class="wrapper">Loading...</div>
			</section>
		{:then bookData}
			<div class="card-wrapper">
				{#each bookData.data as book}
					{#await getCovers(book.id)}
						<p>Loading...</p>
					{:then cover}
						<!-- <div class="card book-card" use:actionWhenInViewport use:tilt={{ scale: 1 }}> -->
						<div class="card book-card" use:actionWhenInViewport>
							<img src={URL.createObjectURL(cover)} alt={book.id} />
							<div class="book-info">
								<a href="/booknotes/{book.slug}" style="margin: 0;">
									<div class="mini-title book-name">{book.title} by {book.author}</div>
									<div class="mini-title book-status">Summary, Review and Notes</div>
								</a>
								<!-- <p>{book.blurb}</p> -->
							</div>
						</div>
					{/await}
				{/each}
			</div>
		{/await}
	</div>
</section>

<svelte:head>
	<title>Book Notes</title>
	<meta
		name="description"
		content="Book Summaries, impressions, notes & quotes. Hi, my name is Matej Groombridge. I am a student, tutor and freelance web designer/website developer from Sydney, Australia. I love to read books and share what I've learned through my website's free book notes."
	/>
</svelte:head>
