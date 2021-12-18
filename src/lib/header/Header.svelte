<script>
	$: active = false;
	$: pressed = false;
	$: outerWidth = 0;

	function handleResize() {
		if (outerWidth > 900) {
			active = true;
		} else {
			active = false;
		}
	}

	function flip() {
		pressed = !pressed;
	}
</script>

<svelte:body on:mousemove={handleResize} on:scroll={handleResize} />

<svelte:window on:resize={handleResize} bind:outerWidth />

<header>
	<nav>
		<div>
			<p class="nav-title"><a href="/">Matej Groombridge</a></p>
		</div>
		<div class="toggle">
			<button type="button" style="font-size: 0.7rem;" on:click={flip}>
				<i class="fas fa-bars fa-2x" />
			</button>
		</div>
		{#if active || pressed}
			<div class="nav-links">
				<ul>
					<li><a href="/webdesign">Web Design</a></li>
					<li><a href="/tutoring">Tutoring</a></li>
					<!-- <li><a href="/">Resources<i class="fas fa-angle-down" style="margin: 5px;" /></a></li> -->
					<li><a href="/about">About Me</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</div>
			<div class="nav-socials">
				<ul style="font-size: 0.75rem;">
					<li>
						<a href="https://www.instagram.com/___matej/" target="_blank"
							><i class="fab fa-instagram fa-2x" /></a
						>
					</li>
					<li>
						<a href="https://github.com/MatejGroombridge" target="_blank"
							><i class="fab fa-github fa-2x" /></a
						>
					</li>
					<!-- <li><a href="/" target="_blank"><i class="fab fa-linkedin fa-2x" /></a></li> -->
					<li>
						<a
							href="https://open.spotify.com/user/odau8v74sintc5j50a9lsgkh9?si=54a1ab54c714459c"
							target="_blank"><i class="fab fa-spotify fa-2x" /></a
						>
					</li>
					<li>
						<a href="/contact#email" target="_blank"><i class="fas fa-envelope fa-2x" /></a>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
</header>
