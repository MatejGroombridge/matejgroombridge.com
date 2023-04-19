<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'strategic';
	const name = 'Strategic Mindset';
	const spiel =
		'Productivity isn’t about doing things right, rather doing the right things that move you closer to your goals. Strategic productivity involves anticipating roadblocks and key moves, striving to make each action impactful. To live a fulfilling life: set big goals, break them down into smaller chunks and determine actionable steps that can get you there.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
