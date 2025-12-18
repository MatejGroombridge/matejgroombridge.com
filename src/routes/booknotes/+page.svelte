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
				<a
					href={`/booknotes/${book.slug}`}
					class="card book-card"
					use:actionWhenInViewport
					style="text-decoration: none; color: inherit;"
				>
					<img src={`/booknotes/book-cover/${book.slug}.webp`} alt={book.title} />
					<div class="book-info">
						<div class="mini-title book-name">{book.title}</div>
						<div class="mini-title book-status">by {book.author}</div>
					</div>
				</a>
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
