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

<body>
	<form on:submit={handleOnSubmit}>
		<h3>Name</h3>
		<input type="text" bind:value={contactForm.name} />
		<h3>Subject</h3>
		<input type="text" bind:value={contactForm.subject} />
		<h3>Email</h3>
		<input type="email" bind:value={contactForm.email} />
		<h3>Message</h3>
		<textarea bind:value={contactForm.message} />
		<input type="submit" value="Send" />
	</form>
</body>
