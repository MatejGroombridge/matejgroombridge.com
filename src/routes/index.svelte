<script>
	import Contact from '$lib/contact/Contact.svelte';

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
					}
				},
				{
					threshold: 1
				}
			);
		});

		observer.observe(e);
	}
</script>

<svelte:head>
	<title>Matej Groombridge</title>
	<meta
		name="description"
		content="Hi, my name is Matej Groombridge. I am a student and freelance web designer/website developer from Sydney, Australia. I offer private tutoring lessons as well as affordable freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head>
<!-- 
<section class="show-mobile notice" style="margin: 0;">
	<div class="wrapper" style="flex-direction: row;">
		<div class="content">
			<p style="padding: 0; margin: 0;">📚 20+ Free Book Notes</p>
		</div>
		<div class="content">
			<p style="padding: 0; margin: 0;">
				<a href="/booknotes" aria-label="booknotes"
					><i class="fa-solid fa-arrow-right fa-beat fa-xl" /></a
				>
			</p>
		</div>
	</div>
</section> -->

<section class="head-home head">
	<div class="wrapper head-wrapper-one" use:actionWhenInViewport>
		<div class="content">
			<h1>I ❤️ U <br />Isobel</h1>
			<!-- <h1>Hi, I'm Matej.</h1> -->
		</div>
		<div class="content">
			<div class="content">
				<img src="/izzy.png" alt="Matej Groombridge" width="280px" height="355px" />
			</div>
		</div>
	</div>
	<div class="wrapper " use:actionWhenInViewport>
		<p class="body-text" style="text-align: center;">
			<!-- I am a student, tutor and freelance web designer from Sydney, Australia, studying Software
			Engineering at UNSW. -->
			Isobel, your name, a melody so sweet, <br />
			A song of laughter, light on dancing feet.<br />
			Your eyes, twin stars in midnight’s gentle glow,<br />
			A secret world where only dreamers go.<br />

			Your smile, the dawn that warms the coldest air,<br />
			A golden touch that turns the world to fair.<br />
			Your voice, a river, soft yet strong and free,<br />
			A lullaby that tames the storm in me.<br />

			Your kindness blooms like roses kissed by dew,<br />
			A heart so pure, so beautiful, so true.<br />
			Your spirit shines, unbowed, both fierce and bright,<br />
			A flame that turns the darkest days to light.<br />

			With every step, you paint the earth with grace,<br />
			A fleeting glimpse of heaven’s warm embrace.<br />
			No art nor song could ever quite convey<br />
			The love I feel in words I try to say.<br />

			So here I stand, with trembling heart in hand,<br />
			A simple wish, a lifelong vow I plan.<br />
			Isobel, my love, my joy, my sea—<br />
			Forever yours… <br />
		</p>
	</div>
	<div class="wrapper" use:actionWhenInViewport>
		<div class="btn-wrapper	btn-head">
			<a class="btn" href="https://youtu.be/_ldEnJINb7s"
				>Open Me &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-heart fa-beat fa-xl" /></a
			>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 5em;
	}
</style>
