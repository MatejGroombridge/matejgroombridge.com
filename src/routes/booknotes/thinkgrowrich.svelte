<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'thinkgrowrich';
	const name = 'Think and Grow Rich';
	const spiel =
		'Your mindset determines your success. Whatever the mind can conceive and believe, the mind can achieve. Becoming wealthy and successful is something you have control over.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
