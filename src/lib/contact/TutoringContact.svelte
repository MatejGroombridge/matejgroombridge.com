<script>
	let contactForm = {
		name: '',
		studentName: '',
		grade: '',
		email: '',
		lessonTime: '',
		comment: ''
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
			<h3>Parent Name<small>*</small></h3>
			<input required type="text" bind:value={contactForm.name} />
		</div>
		<div class="input">
			<h3>Student Name<small>*</small></h3>
			<input required type="text" bind:value={contactForm.studentName} />
		</div>

		<div class="input">
			<div>
				<h3>Email<small>*</small></h3>
				<input required type="email" bind:value={contactForm.email} />
			</div>
			<div>
				<h3>Grade<small>*</small></h3>
				<select name="grade" id="grade" bind:value={contactForm.grade}>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
				</select>
			</div>
			<div>
				<h3>Lesson Time<small>*</small></h3>
				<input
					placeholder="Eg. Saturday 5-6pm"
					required
					type="text"
					bind:value={contactForm.lessonTime}
				/>
			</div>

			<!-- <h3>Subject</h3>
			<select name="subject" id="subject" bind:value={contactForm.subject}>
				{#if contactForm.grade <= 6}
					<option value="Maths">Maths</option>
					<option value="English">English</option>
					<option value="Science">Science</option>
					<option value="Homework Help">Homework Help</option>
					<option value="Test Preparation">Test Preparation</option>
				{:else if contactForm.grade >= 7}
					<option selected value="Mathematics">Mathematics</option>
				{:else}
					<option selected value="5">Please select a grade.</option>
				{/if}
			</select> -->
		</div>
		<div class="input">
			<h3>How can I help your child?</h3>
			<textarea
				placeholder="Include subjects, skill level etc."
				required
				maxlength="1000"
				bind:value={contactForm.comment}
			/>
			<div class="btn-wrapper">
				<input class="form-btn" type="submit" value="Send" />
			</div>
		</div>
	</div>
</form>
