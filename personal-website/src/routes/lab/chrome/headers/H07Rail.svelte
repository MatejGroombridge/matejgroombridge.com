<script lang="ts">
	const links = ['Photos', 'Books', 'Writing', '2026', 'Contact'];
	const socials = ['IG', 'GH', 'IN'];
	let active = $state(0);
</script>

<header class="rail">
	<a class="brand" href="/" aria-label="Home">
		<span class="mark" aria-hidden="true">M</span>
	</a>

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
						<span class="tick" aria-hidden="true"></span>
						<span class="label">{link}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<ul class="socials lab-mono">
		{#each socials as social (social)}
			<li><a href="/" data-preserve-case>{social}</a></li>
		{/each}
	</ul>
</header>

<style lang="scss">
	// Sticky inside the scroll container and only as tall as the viewport, so
	// the page slides past a nav that never moves.
	.rail {
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex: 0 0 auto;
		align-self: flex-start;
		width: 68px;
		height: var(--viewport-h, 440px);
		padding: 0.85rem 0;
		overflow: hidden;
		border-right: 1px solid var(--lab-hairline);
		background: var(--color-surface);
	}

	.mark {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 9px;
		background: var(--color-heading);
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--color-cream);
	}

	.brand {
		text-decoration: none;
	}

	nav ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		// Sized so the full stack — monogram, five rotated labels, socials —
		// still fits a short viewport without the bottom group being clipped.
		gap: 1rem;
		min-height: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-subtle);
		// Rotated so the labels read bottom-to-top down the rail.
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		transition: color 200ms ease;
	}

	nav a:hover,
	nav a.on {
		color: var(--color-heading);
	}

	.label {
		font-family: var(--font-ui);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.tick {
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--lab-accent);
		opacity: 0;
		transform: scale(0.4);
		transition:
			opacity 220ms ease,
			transform 260ms cubic-bezier(0.3, 1.4, 0.4, 1);
	}

	nav a.on .tick {
		opacity: 1;
		transform: scale(1);
	}

	.socials {
		display: flex;
		flex-direction: column;
		flex: 0 0 auto;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
		list-style: none;
		text-align: center;
	}

	.socials a {
		font-size: 0.5rem;
		color: var(--color-subtle);
		text-decoration: none;
	}

	.socials a:hover {
		color: var(--lab-accent);
	}

	@container (max-width: 560px) {
		// A vertical rail costs too much width on a phone, so it lies down and
		// becomes a conventional bottom-anchored bar.
		.rail {
			position: sticky;
			top: 0;
			flex-direction: row;
			width: 100%;
			height: auto;
			padding: 0.6rem 0.85rem;
			border-right: none;
			border-bottom: 1px solid var(--lab-hairline);
		}

		nav ul {
			flex-direction: row;
			gap: 0.9rem;
		}

		nav a {
			writing-mode: horizontal-tb;
			transform: none;
		}

		.socials {
			display: none;
		}
	}
</style>
