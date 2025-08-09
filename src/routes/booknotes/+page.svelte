<script>
	// import { slugs } from '../../static/booknotes/book-slugs.js';

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

	let slugs = [];

	async function fetchSlugs() {
		const response = await fetch('/booknotes/book-slugs.json');
		if (response.ok) {
			slugs = await response.json();
		} else {
			console.error('Failed to fetch slugs');
		}
	}

	fetchSlugs();

	async function fetchBook(bookID) {
		const response = await fetch(`/booknotes/book-data/${bookID}.json`);
		const jsonData = await response.text();
		const parsedData = JSON.parse(jsonData);
		return parsedData;
	}

	async function fetchCover(bookID) {
		const response = await fetch(`/booknotes/book-cover/${bookID}.webp`);
		return response.blob();
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
		<div class="card-wrapper">
			{#each slugs as slug}
				{#await fetchBook(slug) then book}
					<div class="card book-card" use:actionWhenInViewport>
						{#await fetchCover(book.slug) then cover}
							<a
								href="/booknotes/{book.slug}"
								style="margin: 0; padding: 0; text-decoration: none;"
							>
								<img src={URL.createObjectURL(cover)} alt={book.id} />
							</a>
						{/await}
						<a href="/booknotes/{book.slug}" style="margin: 0; padding: 0; text-decoration: none;">
							<div class="book-info">
								<div class="mini-title book-name">{book.title} by {book.author}</div>
								<div class="mini-title book-status">Summary, Review and Notes</div>
							</div>
						</a>
					</div>
				{/await}
			{/each}
		</div>
	</div>
	<!-- <div class="wrapper shown">
		<div class="content">
			<p>Stayed tuned for more book notes on the way.</p>
		</div>
	</div> -->
</section>

<svelte:head>
	<title>Book Notes</title>
	<meta
		name="description"
		content="Book Summaries, impressions, notes & quotes. Hi, my name is Matej Groombridge. I am a student, tutor and freelance web designer/website developer from Sydney, Australia. I love to read books and share what I've learned through my website's free book notes."
	/>
</svelte:head>
