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
			<h3 id="parent">Parent Name</h3>
			<input aria-labelledby="parent" required type="text" bind:value={contactForm.name} />
		</div>

		<div class="input">
			<h3 id="student">Student Name</h3>
			<input aria-labelledby="student" required type="text" bind:value={contactForm.studentName} />
		</div>

		<div class="input">
			<h3 id="email">Email</h3>
			<input aria-labelledby="email" required type="text" bind:value={contactForm.email} />
		</div>

		<div>
			<h3 id="year">Year</h3>
			<select
				aria-labelledby="year"
				required
				name="grade"
				id="grade"
				bind:value={contactForm.grade}
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
			<h3 id="help">How can I help your child?</h3>
			<textarea
				aria-labelledby="help"
				placeholder="Include subjects & skill level, as well as any questions or concerns:"
				required
				maxlength="1000"
				bind:value={contactForm.comment}
			/>
		</div>
		<div class="input">
			<div class="input">
				<h3 id="address">Address</h3>
				<input aria-labelledby="address" required type="text" bind:value={contactForm.address} />
			</div>
			<div>
				<h3 id="time">Lesson Time</h3>
				<input
					aria-labelledby="time"
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
