<script>
	import { time_ranges_to_array } from 'svelte/internal';

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

	import { fly } from 'svelte/transition';

	let isHovered = false;

	function sleep(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	function triggerHover() {
		isHovered = true;
	}

	async function leaveHover() {
		await sleep(1);
		isHovered = false;
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
			<button type="button" aria-label="open menu" style="font-size: 0.7rem;" on:click={flip}>
				<i class="fas fa-bars fa-2x" />
			</button>
		</div>
		{#if active || pressed}
			<div class="nav-links" on:mouseleave={leaveHover}>
				<ul>
					<li><a href="/webdesign">Web Design</a></li>
					<li><a href="/tutoring">Tutoring</a></li>
					<li><a href="/contact">Contact</a></li>
					<li><a href="/about">About</a></li>
					<li class="show-mobile"><a href="/booknotes">Book Notes</a></li>
					<li class="show-mobile"><a href="/photography">Photography</a></li>
					<li class="dropdown hide-mobile">
						<a href="/" on:mouseenter={triggerHover} class="disabled-link"
							>More <i class="fas fa-chevron-down" style="margin: 5px; font-size: 0.75rem;" /></a
						>
						{#if isHovered}
							<ul transition:fly class="dropdown-content" on:mouseleave={leaveHover}>
								<li><a href="/booknotes">Book Notes</a></li>
								<li><a href="/photography">Photography</a></li>
							</ul>
						{/if}
					</li>
				</ul>
			</div>
			<div class="nav-socials">
				<ul style="font-size: 0.75rem;">
					<li>
						<a
							href="https://www.instagram.com/___matej/"
							aria-label="instagram"
							target="_blank"
							rel="noreferrer"><i class="fab fa-instagram fa-2x" /></a
						>
					</li>
					<li>
						<a
							href="https://github.com/MatejGroombridge"
							aria-label="github"
							target="_blank"
							rel="noreferrer"><i class="fab fa-github fa-2x" /></a
						>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/matej-groombridge-06157517b/"
							aria-label="linkedin"
							target="_blank"
							rel="noreferrer"><i class="fab fa-linkedin fa-2x" /></a
						>
					</li>
					<li>
						<a
							href="https://open.spotify.com/user/odau8v74sintc5j50a9lsgkh9?si=54a1ab54c714459c"
							aria-label="spotify"
							target="_blank"
							rel="noreferrer"><i class="fab fa-spotify fa-2x" /></a
						>
					</li>
					<li>
						<a href="/contact#email" aria-label="email" target="_blank"
							><i class="fas fa-envelope fa-2x" /></a
						>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
</header>
