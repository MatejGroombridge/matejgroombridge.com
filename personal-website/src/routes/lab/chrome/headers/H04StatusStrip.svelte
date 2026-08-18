<script lang="ts">
	import { onMount } from 'svelte';

	const links = ['Photos', 'Book notes', 'Writing', '2026', 'Contact'];

	// The strip carries live-ish detail that would be stale in static markup,
	// so the clock only starts once mounted.
	let time = $state('--:--');

	onMount(() => {
		const tick = () =>
			(time = new Intl.DateTimeFormat('en-AU', {
				timeZone: 'Australia/Melbourne',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			}).format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});
</script>

<div class="stack">
	<!-- Scrolls away with the page; only the nav row below it pins. -->
	<div class="strip lab-mono">
		<span class="live"><i></i> melbourne {time}</span>
		<span class="mid">currently reading — <b data-preserve-case>Thinking, Fast and Slow</b></span>
		<span class="right">new photos from sydney →</span>
	</div>

	<header class="bar">
		<a class="brand" href="/" data-preserve-case>Matej Groombridge</a>
		<nav aria-label="Primary">
			<ul>
				{#each links as link (link)}
					<li><a href="/">{link}</a></li>
				{/each}
			</ul>
		</nav>
	</header>
</div>

<style lang="scss">
	.stack {
		position: relative;
	}

	.strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.45rem clamp(1rem, 4cqw, 2.5rem);
		background: var(--color-heading);
		color: color-mix(in srgb, var(--color-cream) 78%, transparent);
		font-size: 0.54rem;
	}

	.live {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		white-space: nowrap;
	}

	.live i {
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--lab-accent);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--lab-accent) 60%, transparent);
		animation: ping 2.6s ease-out infinite;
	}

	@keyframes ping {
		70%,
		100% {
			box-shadow: 0 0 0 6px transparent;
		}
	}

	.strip b {
		color: var(--color-cream);
		font-weight: 500;
	}

	.right {
		color: var(--lab-accent);
		white-space: nowrap;
	}

	.bar {
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.9rem clamp(1rem, 4cqw, 2.5rem);
		background: color-mix(in srgb, var(--color-cream) 90%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--lab-hairline);
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
		transition: color 180ms ease;
	}

	nav a:hover {
		color: var(--lab-accent);
	}

	@container (max-width: 720px) {
		.mid {
			display: none;
		}
	}

	@container (max-width: 560px) {
		.right {
			display: none;
		}

		.strip {
			justify-content: flex-start;
		}

		.bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.6rem;
		}

		ul {
			width: 100%;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}
</style>
