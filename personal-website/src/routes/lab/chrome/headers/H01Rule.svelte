<script lang="ts">
	import { onMount } from 'svelte';
	import { onFrameScroll, scrollHost } from '../scrollHost';

	const links = ['Photos', 'Book notes', 'Writing', '2026', 'Contact'];
	let active = $state(0);

	let el = $state<HTMLElement>();
	let condensed = $state(false);

	onMount(() => {
		if (!el) return;
		// Condense past 40px and expand again below 12px — the gap stops the
		// header flickering when a scroll settles right on the threshold.
		return onFrameScroll(scrollHost(el), (top) => {
			if (top > 40) condensed = true;
			else if (top < 12) condensed = false;
		});
	});
</script>

<header class="bar" class:condensed bind:this={el}>
	<a class="brand" href="/" data-preserve-case>Matej Groombridge</a>

	<nav aria-label="Primary">
		<ul>
			{#each links as link, i (link)}
				<li>
					<a
						href="/"
						class:on={active === i}
						aria-current={active === i ? 'page' : undefined}
						onclick={(event) => {
							event.preventDefault();
							active = i;
						}}
					>
						{link}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style lang="scss">
	.bar {
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.5rem clamp(1rem, 4cqw, 2.5rem);
		background: color-mix(in srgb, var(--color-cream) 86%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid transparent;
		transition:
			padding 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
			border-color 320ms ease;
	}

	.bar.condensed {
		padding-block: 0.7rem;
		border-bottom-color: var(--lab-hairline);
	}

	.brand {
		font-family: var(--font-ui);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--color-heading);
		text-decoration: none;
		white-space: nowrap;
		transition: font-size 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.bar.condensed .brand {
		font-size: 0.92rem;
	}

	ul {
		display: flex;
		gap: clamp(0.75rem, 2.5cqw, 1.6rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		position: relative;
		display: block;
		padding-block: 0.3rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
		white-space: nowrap;
		transition: color 200ms ease;
	}

	nav a:hover,
	nav a.on {
		color: var(--color-heading);
	}

	// The rule grows from the centre out, so it reads as being drawn rather
	// than sliding in from one side.
	nav a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		border-radius: 999px;
		background: var(--lab-accent);
		transform: scaleX(0);
		transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	nav a:hover::after {
		transform: scaleX(0.45);
	}

	nav a.on::after {
		transform: scaleX(1);
	}

	@container (max-width: 640px) {
		.bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
			padding-block: 1rem;
		}

		ul {
			width: 100%;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}
</style>
