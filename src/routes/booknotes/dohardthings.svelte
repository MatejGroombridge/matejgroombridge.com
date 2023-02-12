<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'dohardthings';
	const name = 'Do Hard Things';
	const spiel =
		'Teenagers are capable of doing amazing things but fail to reach the full potential because of the low expectations that society puts on us. Youth is the molding stage of men so what we embody today reflects what we will become as adults. Doing hard things in your teen years prepares your for a life of incredible impact.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
