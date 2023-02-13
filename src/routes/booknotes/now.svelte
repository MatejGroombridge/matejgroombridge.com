<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'now';
	const name = 'The Power of Now';
	const spiel =
		'Virtually everyone hears a voice, or several voices, in their head all the time. This voice inside your mind is responsible for anxiety, depression and a host of other negative mindsets. You can free yourself from your mind by focusing on the present.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
