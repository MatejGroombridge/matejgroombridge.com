<script>
	import ResumeContact from '$lib/contact/ResumeContact.svelte';

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
	<title>About Me</title>
	<meta
		name="description"
		content="Hi, my name is Matej Groombridge. I am a high school student and web designer from Sydney, Australia. I offer one-on-one private tutoring lessons as well as affordable freelance web design services for small businesses. Thanks for stopping by!"
	/>
</svelte:head>

<section>
	<div class="wrapper shown">
		<div class="content">
			<h1 style="padding: 0.25em;">About</h1>
			<p>
				<strong>Hi there! </strong>I'm Matej Groombridge. Thank you for visiting my website. I'm a
				Year 11 student from Australia, currently studying at Baulkham Hills High School. This
				website hosts my tutoring and web design services, as well as some recent projects that I
				have been working on.
			</p>
		</div>
		<div class="content">
			<img src="/face2.webp" alt="Matej Groombridge" width="280px" height="352px" />
		</div>
	</div>
	<div class="wrapper shown bottom-disclaimer">
		<div class="content">
			<p class="small-text">
				This site was programmed from scratch using the Javascript framework <a
					href="https://kit.svelte.dev/"
					target="_blank"
					rel="noreferrer">SvelteKit</a
				>. For the site's styling I used
				<a href="https://sass-lang.com/" target="_blank" rel="noreferrer noreferrer">SASS</a>
				and all forms are handled by
				<a href="https://www.emailjs.com/" target="_blank" rel="noreferrer">Email.js</a>. The code
				for my site is stored on a private
				<a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
				repository that is automatically passed on to
				<a href="https://www.netlify.com/" target="_blank" rel="noreferrer">Netlify</a>.
			</p>
		</div>
	</div>
</section>

<!-- <section class="inverted resume ">
	<div class="wrapper shown">
		<div class="card-wrapper ">
			<div class="center">
				<h3>Request my resume</h3>
			</div>
			<div class="center">
				<ResumeContact />
			</div>
		</div>
	</div>
</section> -->

<!-- 
<section id="qualifications">
	<div class="wrapper" use:actionWhenInViewport>
		<h2>Tutoring Qualifications</h2>
	</div>
	<div class="wrapper" use:actionWhenInViewport>
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
