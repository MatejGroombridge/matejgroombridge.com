<script>
	let contactForm = {
		name: '',
		subject: '',
		email: '',
		message: ''
	};

	function handleOnSubmit(event) {
		event.preventDefault();
		emailjs.send(
			'general_contact',
			'default_form_submission',
			contactForm,
			'user_IaGwubLj0SawwSzw2xWGP'
		);

		alert('Success!');

		window.location.reload();
	}
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
	<script type="text/javascript">
		(function () {
			emailjs.init('user_IaGwubLj0SawwSzw2xWGP');
		})();
	</script>
</svelte:head>

<form on:submit={handleOnSubmit} class="contact-form" method="POST" data-netlify="true">
	<div class="input-wrapper">
		<div class="input">
			<h3 id="name">Name</h3>
			<input required aria-labelledby="name" type="text" bind:value={contactForm.name} />
		</div>
		<div class="input">
			<h3 id="subject">Subject</h3>
			<input type="text" aria-labelledby="subject" bind:value={contactForm.subject} />
		</div>
		<div class="input">
			<h3 id="msg">Message</h3>
			<textarea required aria-labelledby="msg" maxlength="1000" bind:value={contactForm.message} />
		</div>
		<div class="input">
			<div>
				<h3 id="email">Email</h3>
				<input required aria-labelledby="email" type="email" bind:value={contactForm.email} />
			</div>

			<div class="btn-wrapper">
				<input class="form-btn btn" type="submit" value="Send" />
			</div>
		</div>
	</div>
</form>
