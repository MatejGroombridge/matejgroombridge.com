<script>
	import Incomplete from '$lib/incomplete/Incomplete.svelte';
</script>

<Incomplete />

<section>
	<!-- <div class="two-margin" /> -->
	<div class="wrapper">
		<div class="content">
			<h1>About</h1>
			<p>Thank you for visiting.</p>
			<p>
				My name is <strong>Matej Groombridge</strong>. I'm a high school student and web designer
				from Sydney, Australia.
			</p>
		</div>
	</div>
</section>

<!-- <section>
	<div class="wrapper">
		<h2>10 Second Bio</h2>
	</div>
	<div class="wrapper">
		<div class="content">
			<p>I was born in 🇸🇮 Slovenia</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, porro cupiditate assumenda
				eveniet sed repellendus asperiores ab officiis id voluptatibus?
			</p>
		</div>
	</div>
</section> -->

<svelte:head>
	<title>About Me</title>
</svelte:head>

<style>
	.wrapper {
		width: 60%;
	}
</style>
