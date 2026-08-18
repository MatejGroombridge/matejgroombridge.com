<script lang="ts">
	import { onMount } from 'svelte';
	import { onFrameScroll, scrollHost } from '../scrollHost';

	const links = ['Photos', 'Book notes', 'Writing', '2026', 'Contact'];

	let el = $state<HTMLElement>();
	let hidden = $state(false);
	let progress = $state(0);

	onMount(() => {
		if (!el) return;
		const host = scrollHost(el);

		return onFrameScroll(host, (top, delta) => {
			// Never hide near the top, and require a deliberate movement in one
			// direction so trackpad jitter can't strobe the header.
			if (top < 80) hidden = false;
			else if (delta > 4) hidden = true;
			else if (delta < -4) hidden = false;

			if (host instanceof Window) {
				const max = document.documentElement.scrollHeight - window.innerHeight;
				progress = max > 0 ? top / max : 0;
			} else {
				const max = host.scrollHeight - host.clientHeight;
				progress = max > 0 ? top / max : 0;
			}
		});
	});
</script>

<header class="bar" class:hidden bind:this={el}>
	<div class="row">
		<a class="brand" href="/" data-preserve-case>Matej Groombridge</a>
		<nav aria-label="Primary">
			<ul>
				{#each links as link (link)}
					<li><a href="/">{link}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="progress" aria-hidden="true">
		<span style={`transform:scaleX(${progress})`}></span>
	</div>
</header>

<style lang="scss">
	.bar {
		position: sticky;
		top: 0;
		z-index: 5;
		background: color-mix(in srgb, var(--color-cream) 92%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--lab-hairline);
		transition: transform 340ms cubic-bezier(0.3, 0.9, 0.3, 1);
	}

	// Slides out by its own height rather than a guessed pixel value, so it
	// stays correct at any padding or font size.
	.bar.hidden {
		transform: translateY(-100%);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.9rem clamp(1rem, 4cqw, 2.5rem);
	}

	.brand {
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: -0.035em;
		color: var(--color-heading);
		text-decoration: none;
		white-space: nowrap;
	}

	ul {
		display: flex;
		gap: clamp(0.6rem, 2cqw, 1.4rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		font-family: var(--font-ui);
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
		white-space: nowrap;
	}

	nav a:hover {
		color: var(--color-heading);
	}

	.progress {
		height: 2px;
		background: transparent;
	}

	.progress span {
		display: block;
		height: 100%;
		background: var(--lab-accent);
		transform-origin: left center;
		transform: scaleX(0);
	}

	@container (max-width: 600px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.55rem;
		}

		ul {
			width: 100%;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}
</style>
