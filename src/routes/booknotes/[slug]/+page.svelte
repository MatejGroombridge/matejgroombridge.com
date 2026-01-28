<script>
	import { page } from '$app/stores';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

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
	let id = 0;

	async function fetchData() {
		const response = await fetch(`/booknotes/book-data/${ID}.json`);
		const jsonData = await response.text();
		const parsedData = JSON.parse(jsonData);
		id = parsedData.id;
		return parsedData;
	}

	async function fetchMarkdown() {
		const response = await fetch(`/booknotes/book-markdown/${ID}.md`);
		const text = await response.text();

		return text;
	}

	async function fetchCover(bookID) {
		const response = await fetch(`/booknotes/book-cover/${bookID}.webp`);
		return response.blob();
	}

	async function fetchRandomBooks() {
		const response = await fetch('/booknotes/book-slugs.json');
		let slugs = await response.json();
		slugs = slugs.filter((s) => s !== ID);
		const shuffled = slugs.sort(() => 0.5 - Math.random());
		const selected = shuffled.slice(0, 5);

		const books = await Promise.all(
			selected.map(async (slug) => {
				const res = await fetch(`/booknotes/book-data/${slug}.json`);
				return res.json();
			})
		);
		return books;
	}
</script>

<svelte:head>
	{#await fetchData() then book}
		<title>{book.title} | Summary, Notes & Quotes</title>
		<meta name="description" content="The Book in 3 Sentences • {book.description}" />
	{/await}
</svelte:head>

<section class="head">
	<div class="wrapper shown spacebetween" style="min-height: 50vh;">
		{#await fetchData() then book}
			<div class="content">
				<div class="abovetitle">Book Review, Summary and Notes</div>
				<h1>{book.title}</h1>
				<h2>By {book.author}</h2>
			</div>
			<div class="content">
				{#await fetchCover(book.slug)}
					<div class="temp-bookcover">
						<p class="small-text">Loading Cover...</p>
					</div>
				{:then cover}
					<img src={URL.createObjectURL(cover)} alt={book.id} width="270" />
				{/await}
			</div>
		{/await}
	</div>
</section>

<section class="grey book-bar hide-mobile">
	<div class="wrapper shown">
		{#await fetchData() then book}
			<div class="content">
				<p><strong>Author</strong> <br /> {book.author}</p>
			</div>
			<div class="content">
				<p><strong>Published</strong> <br /> {book.published}</p>
			</div>
			<div class="content">
				<p><strong>My Rating</strong> <br /> {book.rating}</p>
			</div>
			<div class="content">
				<p><strong>When I read it</strong> <br /> {book.readingtime}</p>
			</div>
			<!-- <div class="content">
				<p>
					<strong>Buy the Book</strong> <br />
					<a href={book.link} target="_blank" rel="noreferrer">{book.bookstore}</a>
				</p>
			</div> -->
		{/await}
	</div>
</section>

<section>
	<div class="wrapper shown">
		<div class="article" style="min-height: 100vh;">
			{#await fetchMarkdown() then bookMarkdown}
				<SvelteMarkdown source={bookMarkdown} />
			{/await}
		</div>
	</div>
	<div class="two-margin"></div>
	<div class="wrapper shown">
		<div class="article">
			<h1>You Might Also Like...</h1>
		</div>
	</div>
	<div class="wrapper shown">
		<div class="article">
			{#await fetchRandomBooks() then books}
				{#each books as book}
					<a href={`/booknotes/${book.slug}`}>{book.title}</a>
				{/each}
			{/await}
		</div>
	</div>
	<div class="wrapper shown bottom-disclaimer">
		<div class="content">
			<p class="small-text">
				This is a book summary and may not reflect my attitudes or beliefs on certain topics. I'd
				love to hear <a href="https://www.matejgroombridge.com/contact">your thoughts</a>.
			</p>
		</div>
	</div>
</section>
