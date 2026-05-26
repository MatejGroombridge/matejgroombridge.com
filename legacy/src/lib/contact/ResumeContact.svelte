<script>
	let contactForm = {
		name: '(Resume Request)',
		subject: 'Resume Request',
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

<form on:submit={handleOnSubmit} class="contact-form">
	<div class="input-wrapper">
		<div class="input">
			<h3>Email</h3>
			<input required type="email" bind:value={contactForm.email} />
		</div>

		<div class="input">
			<h3>Message</h3>
			<input required maxlength="100" type="email" bind:value={contactForm.message} />
		</div>

		<div class="input">
			<div class="btn-wrapper">
				<input class="form-btn btn" type="submit" value="Request" />
			</div>
		</div>
	</div>
</form>
