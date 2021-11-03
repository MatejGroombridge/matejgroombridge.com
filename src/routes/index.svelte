<body>
	<section>
		<div class="wrapper">
			<h1>Hi, I'm Matej.</h1>
			<p class="body-text">
				I'm a Sydney based Student and Web Designer who is passionate about creating stuff.
			</p>
			<div class="two-btns">
				<a class="btn" href="/about">About Me</a>
				<a class="btn" href="/about">Get In Touch</a>
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
		height: 90vh;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 65%;

		margin-left: auto;
		margin-right: auto;
	}

	h1 {
		font-size: 5em;
	}

	.two-btns {
		display: flex;
		justify-content: space-around;
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 3em;
	}
</style>
