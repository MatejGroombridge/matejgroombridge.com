<script>
	import Contact from '$lib/contact/Contact.svelte';
</script>

<svelte:head>
	<title>Contact Information</title>
	<meta
		name="description"
		content="Get in touch with me! The contact information for Matej Groombridge, a high school student and web designer from Sydney, Australia. I offer private tutoring lessons as well as freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head>

<section class="head">
	<div class="wrapper">
		<div class="contact-text-wrapper">
			<h2>Get in Touch!</h2>
			<p>I'd love to hear from you.</p>
		</div>
		<div>
			<Contact />
		</div>
	</div>
</section>
