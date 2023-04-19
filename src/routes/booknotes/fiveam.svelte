<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'fiveam';
	const name = 'The 5AM Club';
	const spiel =
		'The 5AM Club is a morning routine developed by Robin Sharma wherein you rise at 5am. A structured and consistent morning routine which starts at 5am can act as a catalyst for greater productivity, health, and happiness. By owning your morning, you elevate your life.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
