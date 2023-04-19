<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'taoteching';
	const name = 'Tao Te Ching';
	const spiel =
		'The book in 3 sentences: Surrender to the flow of life. Live a simple, honest life, in balance with the Universe. Accept things as they are.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
