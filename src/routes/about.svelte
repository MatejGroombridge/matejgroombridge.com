<script>
	import Incomplete from '$lib/incomplete/Incomplete.svelte';
	import ResumeContact from '$lib/contact/ResumeContact.svelte';
</script>

<svelte:head>
	<title>About Me</title>
	<meta
		name="description"
		content="Hi, my name is Matej Groombridge. I am a high school student and web designer from Sydney, Australia. I offer private tutoring lessons as well as freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head>

<Incomplete />

<section>
	<div class="wrapper">
		<div class="content">
			<h1>About</h1>
			<p><strong>Hi there! </strong>I'm Matej. Thank you for visiting my personal website.</p>
			<p>
				I was born in Slovenia, a small European country located between Italy and Croatia. In 2014,
				my family moved to Australia and have lived here since.
			</p>
			<p>
				I'm currenlty in grade 10 at a selective school in Sydney. My hobbies include playing
				instruments, reading, making websites and going on long distance runs.
			</p>
			<p>
				On this website you can find some recent projects I'm working on, as well as my tutoring and
				web design services. If you need to contact me, fill out the form on my contact page or send
				me a DM on one of my social media accounts.
			</p>
		</div>
	</div>
</section>

<!-- <section class="notice resume">
	<div class="wrapper">
		<div class="content">
			<h3>Request my resume</h3>
		</div>
		<div class="content">
			<ResumeContact />
		</div>
	</div>
</section>

<section id="qualifications">
	<div class="wrapper">
		<h2>Tutoring Qualifications</h2>
	</div>
	<div class="wrapper">
		<div class="content">
			<h3>Academic</h3>
			<ul>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
			</ul>
		</div>
		<div class="content">
			<h3>;aksjdf;lkjasd</h3>
			<ul>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
				<li><p>l</p></li>
			</ul>
		</div>
	</div>
</section> -->

<style>
	.wrapper {
		width: 60%;
	}
</style>
