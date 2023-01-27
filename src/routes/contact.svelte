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
	<title>Contact</title>
	<meta
		name="description"
		content="Get in touch with me! The contact information for Matej Groombridge, a high school student and web designer from Sydney, Australia. I offer private tutoring lessons as well as freelance web design services for small businesses in Sydney. Thanks for stopping by!"
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
		<p>Or send me an email at:</p>
	</div>
	<div class="wrapper shown">
		<img src="/email.webp" alt="My email address" style="box-shadow: none;" />
	</div>
</section>

<section>
	<div class="wrapper shown">
		<h1>Testing 2</h1>
	</div>
	<div class="wrapper shown">
		<form name="contact1" method="POST" data-netlify="true">
			<p>
				<label>Your Name: <input type="text" name="name" /></label>
			</p>
			<p>
				<label>Message: <textarea name="message" /></label>
			</p>
			<p>
				<button type="submit" class="btn">Send</button>
			</p>
		</form>
	</div>
</section>
