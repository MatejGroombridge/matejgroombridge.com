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
		<div class="content" style="margin: 2em;">
			<h1 style="font-size: 2.3em;">About</h1>
			<p style="font-size: 1.1em;">
				<strong>Hi there! </strong>I'm Matej. Thank you for visiting my website. I'm a first year
				university student studying a Bachelor of Software Engineering under the UNSW Co-op
				Scholarship program. This website hosts my tutoring and web design services, as well as some
				recent projects that I have been working on.
			</p>
			<div class="link-tiles">
				<a
					class="link-btn"
					href="https://www.instagram.com/___matej/"
					aria-label="instagram logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-instagram" />
					<p style="font-size: 0.95em;">Instagram</p></a
				>
				<a
					class="link-btn"
					href="https://www.linkedin.com/in/matej-groombridge-06157517b/"
					aria-label="linkedin logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-linkedin" />
					<p style="font-size: 0.95em;">LinkedIn</p></a
				>
				<a
					class="link-btn"
					href="https://www.facebook.com/profile.php?id=100076210122441"
					aria-label="facebook logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-facebook" />
					<p style="font-size: 0.95em;">Facebook</p></a
				>
				<a
					class="link-btn"
					href="https://github.com/MatejGroombridge"
					aria-label="github logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-github" />
					<p style="font-size: 0.95em;">Github</p></a
				>
				<a
					class="link-btn"
					href="https://www.instagram.com/matejsphotography/"
					aria-label="camera logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fa fa-camera-retro" />
					<p style="font-size: 0.95em;">Photos</p></a
				>
				<a
					class="link-btn"
					href="https://www.worldcubeassociation.org/persons/2022GROO03"
					aria-label="WCA logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fa fa-cube" />
					<p style="font-size: 0.95em;">WCA</p></a
				>
				<a
					class="link-btn"
					href="https://www.strava.com/athletes/100578389"
					aria-label="strava logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-strava" />
					<p style="font-size: 0.95em;">Strava</p></a
				>
				<a
					class="link-btn"
					href="https://open.spotify.com/user/odau8v74sintc5j50a9lsgkh9?si=54a1ab54c714459c"
					aria-label="spotify logo"
					target="_blank"
					rel="noreferrer"
					><i style="font-size: 1.4em;" class="fab fa-spotify" />
					<p style="font-size: 0.95em;">Spotify</p></a
				>
			</div>
		</div>
		<div class="content">
			<img
				src="/face2.webp"
				class="img-no-zoom"
				alt="Matej Groombridge"
				width="340px"
				height="430px"
			/>
		</div>
	</div>
	<div class="wrapper shown bottom-disclaimer">
		<div class="content">
			<p class="small-text">
				This site was programmed from scratch using the Javascript framework <a
					href="https://kit.svelte.dev/"
					target="_blank"
					rel="noreferrer">SvelteKit</a
				>.
				<a href="https://sass-lang.com/" target="_blank" rel="noreferrer noreferrer">SASS</a>
				was used for the site's styling and all forms are handled by
				<a href="https://www.emailjs.com/" target="_blank" rel="noreferrer">Email.js</a>. The code
				is stored on a private
				<a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
				repository and hosted on
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
