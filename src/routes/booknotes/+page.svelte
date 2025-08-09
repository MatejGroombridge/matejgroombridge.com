<script>
	// data provided by +page.ts
	let { data } = $props();

	/** @param {Element} e */
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

	// filter out any missing books defensively
	const books = $derived(data.books?.filter((b) => !b?.missing) ?? []);
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
	<div class="two-margin"></div>
	<div class="wrapper" style="width: 75vw;" use:actionWhenInViewport>
		<div class="card-wrapper">
			{#each books as book}
				<div class="card book-card" use:actionWhenInViewport>
					<a href={`/booknotes/${book.slug}`} style="margin: 0; padding: 0; text-decoration: none;">
						<img src={`/booknotes/book-cover/${book.slug}.webp`} alt={book.title} />
					</a>
					<a href={`/booknotes/${book.slug}`} style="margin: 0; padding: 0; text-decoration: none;">
						<div class="book-info">
							<div class="mini-title book-name">{book.title} by {book.author}</div>
							<div class="mini-title book-status">Summary, Review and Notes</div>
						</div>
					</a>
				</div>
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
