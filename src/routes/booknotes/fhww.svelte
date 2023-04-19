<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'fhww';
	const name = 'The 4-Hour Workweek';
	const spiel =
		'Anyone can live life with complete freedom. To achieve this freedom you need to reframe your view of the world. Before you can live your dream lifestyle you need to automate your cash flow and divorce yourself from a job.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
