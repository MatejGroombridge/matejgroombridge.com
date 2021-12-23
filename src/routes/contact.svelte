<script>
	import Contact from '$lib/contact/Contact.svelte';

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
					}
				},
				{
					threshold: 1
				}
			);
		});

		observer.observe(e);
	}
</script>

<svelte:head>
	<title>Contact Information</title>
	<meta
		name="description"
		content="Get in touch with me! The contact information for Matej Groombridge, a high school student and web designer from Sydney, Australia. I offer private tutoring lessons as well as freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head>

<section class="head">
	<div class="wrapper shown">
		<div class="contact-text-wrapper">
			<h2>Get in Touch!</h2>
			<p>I'd love to hear from you.</p>
		</div>
		<div>
			<Contact />
		</div>
	</div>
</section>

<section class="grey" id="email">
	<div class="wrapper shown">
		<p>Or send me an email to:</p>
	</div>
	<div class="wrapper shown">
		<img src="/email.png" alt="My email address" />
	</div>
</section>
