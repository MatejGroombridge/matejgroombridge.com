<script>
	import supabase from '$lib/db';
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';

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
	let bookData = [];

	async function getBook() {
		const { data, error } = await supabase.from('book').select(`
		id,
	    title,
	    author,
		markdown,
		slug,
		published,
		readingtime,
		rating,
		amazonlink
	    `);

		data.forEach((book) => {
			if (book.slug == ID) {
				id = book.id;
				bookData = book;
			}
		});

		return bookData;
	}

	async function getCover() {
		const { data, error } = await supabase.storage.from('public').download(`covers/${id}.jpeg`);
		return data;
	}
</script>

{#await getBook()}
	<section>
		<div class="wrapper">Loading...</div>
	</section>
{:then book}
	{#await getCover()}
		<section>
			<div class="wrapper">Loading...</div>
		</section>
	{:then cover}
		<section>
			<div class="wrapper shown spacebetween">
				<div class="content">
					<div class="abovetitle">Book Review, Summary and Notes</div>
					<h1>{book.title}</h1>
					<h2>By {book.author}</h2>
				</div>
				<div class="content">
					<img src={URL.createObjectURL(cover)} alt={book.id} width="270" />
				</div>
			</div>
		</section>
		<section class="grey book-bar hide-mobile">
			<div class="wrapper " use:actionWhenInViewport>
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
				<div class="content">
					<p>
						<strong>Buy the Book</strong> <br />
						<a href={book.amazonlink} target="_blank"> Amazon</a>
					</p>
				</div>
			</div>
		</section>
		<section>
			<div class="wrapper" use:actionWhenInViewport>
				<div class="article">
					<SvelteMarkdown source={book.markdown} />
				</div>
			</div>
		</section>
	{/await}
{/await}
