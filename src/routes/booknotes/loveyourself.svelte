<script>
	import BookSlug from '$lib/booknotes/BookSlug.svelte';

	const ID = 'loveyourself';
	const name = 'Love Yourself Like Your Life Depends on It';
	const spiel =
		'Loving yourself deeply is a choice you can make and a skill that can be worked on. Our mind has the tendency to fall into negative ruts but by loving ourselves we create new grooves that when deepened enough, become a core part of our life. As you love yourself, life loves you back.';
</script>

<svelte:head>
	<title>{name} | Summary, Notes & Quotes</title>
	<meta name="description" content={spiel} />
</svelte:head>

<BookSlug {ID} />
