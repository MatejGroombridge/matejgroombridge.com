<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'life';
	const name = "What's Life All About?";
	const spiel =
		'Without a God, life would be without meaning. We are defined through our relationship to God. Our purpose in life is to glorify God in everything we do.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
