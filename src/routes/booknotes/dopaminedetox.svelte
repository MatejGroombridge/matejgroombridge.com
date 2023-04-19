<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'dopaminedetox';
	const name = 'Dopamine Detox';
	const spiel =
		'Over-stimulation stops us from being able to focus and complete difficult tasks. By taking a break from addicting and stimulating activities, we can start to build back our attention span and large, hard tasks will become easier and more enjoyable to complete.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
