<script>
	let contactForm = {
		name: '',
		studentName: '',
		grade: '',
		email: '',
		lessonTime: '',
		comment: '',
		address: ''
	};

	function handleOnSubmit(event) {
		event.preventDefault();
		emailjs.send(
			'general_contact',
			'tutoring_form_submission',
			contactForm,
			'user_IaGwubLj0SawwSzw2xWGP'
		);

		alert('Success! Check your inbox for a confirmation email.');

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
			<h3>Parent Name</h3>
			<input required type="text" bind:value={contactForm.name} />
		</div>

		<div class="input">
			<h3>Student Name</h3>
			<input required type="text" bind:value={contactForm.studentName} />
		</div>

		<div class="input">
			<h3>Email</h3>
			<input required type="text" bind:value={contactForm.email} />
		</div>

		<div>
			<h3>Year</h3>
			<select required name="grade" id="grade" bind:value={contactForm.grade}>
				<option value="3">Year 3</option>
				<option value="4">Year 4</option>
				<option value="5">Year 5</option>
				<option value="6">Year 6</option>
				<option value="7">Year 7</option>
				<option value="8">Year 8</option>
			</select>
		</div>

		<div class="input">
			<h3>How can I help your child?</h3>
			<textarea
				placeholder="Include subjects & skill level, as well as any questions or concerns:"
				required
				maxlength="1000"
				bind:value={contactForm.comment}
			/>
		</div>
		<div class="input">
			<div class="input">
				<h3>Address</h3>
				<input required type="text" bind:value={contactForm.address} />
			</div>
			<div>
				<h3>Lesson Time</h3>
				<input
					placeholder="Eg. Saturday 5-6pm"
					required
					type="text"
					bind:value={contactForm.lessonTime}
				/>
			</div>
			<div>
				<div class="btn-wrapper">
					<input class="form-btn btn" type="submit" value="Send" />
				</div>
			</div>
		</div>
	</div>
</form>
