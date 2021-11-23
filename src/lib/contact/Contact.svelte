<script>
	let contactForm = {
		name: '',
		subject: '',
		company: '',
		email: '',
		message: ''
	};

	function handleOnSubmit(event) {
		event.preventDefault();
		emailjs.send(
			'contact_service_test',
			'default_form_submission',
			contactForm,
			'user_IaGwubLj0SawwSzw2xWGP'
		);
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

<form on:submit={handleOnSubmit} class="contact-form">
	<div class="input-wrapper">
		<div class="input">
			<h3>Name</h3>
			<input type="text" bind:value={contactForm.name} />
		</div>
		<div class="input">
			<h3>Subject</h3>
			<input type="text" bind:value={contactForm.subject} />
		</div>
		<div class="input">
			<h3>Email</h3>
			<input type="email" bind:value={contactForm.email} />
		</div>
		<div class="input">
			<h3>Message</h3>
			<textarea bind:value={contactForm.message} />
		</div>
	</div>

	<div class="btn-wrapper">
		<input type="submit" value="Send" />
		<input type="reset" value="Clear" />
	</div>
</form>
