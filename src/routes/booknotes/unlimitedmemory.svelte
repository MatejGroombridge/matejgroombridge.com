<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'unlimitedmemory';
	const name = 'Unlimited Memory';
	const spiel =
		'Good memory is a superpower. Special techniques can make remembering large amounts of information easy. Memory is a skill that can be improved through regular practice.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
