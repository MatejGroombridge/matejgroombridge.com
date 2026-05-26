<script>
	import { fly } from 'svelte/transition';

	let outerWidth = 0;
	// Menu is active (always visible) on desktop widths
	$: active = outerWidth > 900;
	// Mobile hamburger toggle
	let pressed = false;

	function handleResize() {
		// When moving to desktop, ensure hamburger state is reset
		if (outerWidth > 900) pressed = false;
	}

	function flip() {
		pressed = !pressed;
	}

	let isHovered = false;
	/** @type {ReturnType<typeof setTimeout> | null} */
	let hoverTimeout = null;

	function triggerHover() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
		isHovered = true;
	}

	function leaveHover() {
		// Add a small delay to prevent flickering when moving between elements
		hoverTimeout = setTimeout(() => {
			isHovered = false;
		}, 150);
	}

	function cancelLeave() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
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
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<i class="fas fa-bars fa-2x" />
			</button>
		</div>
		{#if active || pressed}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="nav-links" on:mouseleave={active ? leaveHover : null}>
				<ul>
					<li>
						<a
							href="/photography"
							on:click={() => {
								if (!active) pressed = false;
							}}>Photography</a
						>
					</li>
					<li>
						<a
							href="/booknotes"
							on:click={() => {
								if (!active) pressed = false;
							}}>Book Notes</a
						>
					</li>
					<li>
						<a
							href="/about"
							on:click={() => {
								if (!active) pressed = false;
							}}>About</a
						>
					</li>
					<li>
						<a
							href="/contact"
							on:click={() => {
								if (!active) pressed = false;
							}}>Contact</a
						>
					</li>
					<li class="show-mobile">
						<a
							href="/webdesign"
							on:click={() => {
								if (!active) pressed = false;
							}}>Web Design</a
						>
					</li>
					<li class="show-mobile">
						<a
							href="/tutoring"
							on:click={() => {
								if (!active) pressed = false;
							}}>Tutoring</a
						>
					</li>
					<li class="dropdown hide-mobile" on:mouseenter={triggerHover} on:mouseleave={leaveHover}>
						<a href="/" class="disabled-link"
							>More <i class="fas fa-chevron-down" style="margin: 5px; font-size: 0.75rem;"></i></a
						>
						{#if isHovered}
							<ul class="dropdown-content" on:mouseenter={cancelLeave} on:mouseleave={leaveHover}>
								<li><a href="/webdesign">Web Design</a></li>
								<li><a href="/tutoring">Tutoring</a></li>
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
							aria-label="instagram logo"
							target="_blank"
							rel="noreferrer"
							style="font-size: 1.1em;"><i class="fab fa-instagram fa-2x"></i></a
						>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/matej-groombridge-06157517b/"
							aria-label="linkedin logo"
							target="_blank"
							rel="noreferrer"><i class="fab fa-linkedin fa-2x"></i></a
						>
					</li>
					<li>
						<a
							href="https://github.com/MatejGroombridge"
							aria-label="github logo"
							target="_blank"
							rel="noreferrer"><i class="fab fa-github fa-2x"></i></a
						>
					</li>
					<li>
						<a
							href="https://www.instagram.com/matejsphotography/"
							aria-label="camera logo"
							target="_blank"
							rel="noreferrer"><i class="fa fa-camera-retro fa-2x"></i></a
						>
					</li>
					<li>
						<a href="/contact#email" aria-label="email logo" target="_blank"
							><i class="fas fa-envelope fa-2x"></i></a
						>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
</header>
