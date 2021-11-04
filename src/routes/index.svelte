<body>
	<section>
		<div class="wrapper">
			<div class="hero-wrapper">
				<h1>Hi, I'm Matej.</h1>
				<p class="body-text">
					I'm a Sydney based lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, dolorem.
				</p>
				<div class="two-btns">
					<a class="btn" href="/about">About Me</a>
					<a class="btn" href="/about">Services</a>
				</div>
			</div>
			<div class="hero-wrapper">
				<img src="../../static/mainimage.jpg" alt="Matej Groombridge" width="300px" />
			</div>
		</div>
	</section>
	<section class="grey">
		<div class="wrapper">
			<div class="service-wrapper">
				<h2>Freelance Web Design</h2>
				<h3>Do you want to build your online presence and boost sales?</h3>
				<p>Get a bespoke website that your customers will love</p>
				<a href="/webdesign" class="btn">Learn More</a>
			</div>
			<div class="service-wrapper">
				<h2>Maths Tutoring</h2>
				<h3>Do you want your child to accel at maths?</h3>
				<p>Get expert tutoring from Baulkham Hills High School's 2 year Top of the Grade</p>
				<a href="/tutoring" class="btn">Learn More</a>
			</div>
		</div>
	</section>
</body>

<style>
	body {
		display: flex;
		flex-direction: column;
	}

	section {
		padding: 2em;
		width: 100%;
		height: 80vh;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70%;

		margin-left: auto;
		margin-right: auto;
	}

	h1 {
		font-size: 5em;
	}

	.two-btns {
		display: flex;
		justify-content: space-around;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2em;
		width: 70%;
	}

	.hero-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1em;
	}
</style>
