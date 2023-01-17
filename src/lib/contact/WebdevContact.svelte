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

		alert("Success! I'll get back to you within the coming days so keep an eye on your inbox.");

		window.location.reload();
	}
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
		defer></script>
	<script type="text/javascript">
		(function () {
			emailjs.init('user_IaGwubLj0SawwSzw2xWGP');
		})();
	</script>
</svelte:head>

<form on:submit={handleOnSubmit} class="contact-form">
	<div class="input-wrapper">
		<div class="input">
			<h3 id="name">Name</h3>
			<input aria-labelledby="name" required type="text" bind:value={contactForm.name} />
		</div>
		<div class="input">
			<h3 id="company">Company <small>(Optional)</small></h3>
			<input aria-labelledby="company" type="text" bind:value={contactForm.subject} />
		</div>
		<div class="input">
			<h3 id="brief">Website brief</h3>
			<textarea
				aria-labelledby="brief"
				placeholder="Tell me about your project..."
				required
				maxlength="1000"
				bind:value={contactForm.message}
			/>
		</div>
		<div class="input">
			<div>
				<h3 id="email">Email</h3>
				<input aria-labelledby="email" required type="email" bind:value={contactForm.email} />
			</div>

			<div class="btn-wrapper">
				<input class="form-btn btn" type="submit" value="Send" />
			</div>
		</div>
	</div>
</form>
