<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'subtleart';
	const name = 'The Subtle Art of Not Giving A F*ck';
	const spiel =
		'Prioritise where you put your energy. Find your values. Don’t take life so seriously.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
