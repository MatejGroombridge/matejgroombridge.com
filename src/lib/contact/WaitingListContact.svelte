<script>
	let contactForm = {
		name: '',
		message: '',
		email: '',
		subject: 'Tutoring Waiting List'
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
			<h3 id="name">Name</h3>
			<input aria-labelledby="name" required type="text" bind:value={contactForm.name} />
		</div>
		<div class="input">
			<div>
				<h3 id="email">Email</h3>
				<input aria-labelledby="email" required type="email" bind:value={contactForm.email} />
			</div>
		</div>
		<!-- <div class="input">
			<h3>Student Name<small>*</small></h3>
			<input required type="text" bind:value={contactForm.studentName} />
		</div> -->

		<div class="input">
			<h3 id="year">Child's Year</h3>
			<select
				aria-labelledby="year"
				required
				name="grade"
				id="grade"
				bind:value={contactForm.message}
			>
				<option value="3">Year 3</option>
				<option value="4">Year 4</option>
				<option value="5">Year 5</option>
				<option value="6">Year 6</option>
				<option value="7">Year 7</option>
				<option value="8">Year 8</option>
				<option value="9">Year 9</option>
			</select>
		</div>

		<div class="input">
			<div class="btn-wrapper">
				<input class="form-btn btn" type="submit" value="Submit" />
			</div>
		</div>
	</div>
</form>
