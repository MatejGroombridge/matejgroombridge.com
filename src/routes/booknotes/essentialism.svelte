<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'essentialism';
	const name = 'Essentialism';
	const spiel =
		'Essentialism means doing less, better. So many people suffer from overcommitment and saying yes to everything.By only doing what is essential you gain time, clarity and fulfillment.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
