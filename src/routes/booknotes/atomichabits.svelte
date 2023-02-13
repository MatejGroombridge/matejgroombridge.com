<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'atomichabits';
	const name = 'Atomic Habits';
	const spiel =
		'Atomic habits are tiny behaviour changes that add up to massive improvements. Habits compound - A 1% improvement over 365 days leads to a 37x overall improvement. To make a behaviour effortless: make it obvious, attractive, easy and satisfying.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
