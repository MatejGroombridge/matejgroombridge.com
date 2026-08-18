<script lang="ts">
	const links = ['Photos', 'Books', 'Writing', '2026', 'Contact'];
	let active = $state(0);
	let hovered = $state<number | null>(null);

	// The indicator is a single element that travels between items, so the
	// dock reads as one object rather than five independently lit buttons.
	const lit = $derived(hovered ?? active);
</script>

<div class="wrap">
	<header class="dock">
		<a class="brand" href="/" aria-label="Home" data-preserve-case>MG</a>

		<nav aria-label="Primary" onmouseleave={() => (hovered = null)}>
			<ul style={`--lit:${lit}; --count:${links.length}`}>
				<span class="pill" aria-hidden="true"></span>
				{#each links as link, i (link)}
					<li>
						<a
							href="/"
							class:on={active === i}
							onmouseenter={() => (hovered = i)}
							onfocus={() => (hovered = i)}
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

		<button class="orb" type="button" aria-label="Toggle theme"><span></span></button>
	</header>
</div>

<style lang="scss">
	.wrap {
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex;
		justify-content: center;
		padding: 0.85rem clamp(0.75rem, 3cqw, 1.5rem);
		pointer-events: none;
	}

	.dock {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 100%;
		padding: 0.35rem 0.35rem 0.35rem 0.85rem;
		border: 1px solid color-mix(in srgb, var(--color-ink) 10%, transparent);
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-surface) 72%, transparent);
		backdrop-filter: blur(18px) saturate(1.4);
		box-shadow:
			0 1px 0 rgb(255 255 255 / 0.5) inset,
			0 10px 30px -12px rgb(0 0 0 / 0.28);
		pointer-events: auto;
	}

	.brand {
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-heading);
		text-decoration: none;
	}

	ul {
		position: relative;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	// One pill, positioned by index. Equal-width columns mean its travel is a
	// pure percentage — no measuring, no resize observer.
	.pill {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: calc(100% / var(--count));
		border-radius: 999px;
		background: color-mix(in srgb, var(--lab-accent) 15%, transparent);
		transform: translateX(calc(var(--lit) * 100%));
		transition: transform 380ms cubic-bezier(0.3, 1.4, 0.4, 1);
	}

	nav a {
		position: relative;
		display: block;
		padding: 0.5rem 0.85rem;
		font-family: var(--font-ui);
		font-size: 0.82rem;
		font-weight: 550;
		text-align: center;
		color: var(--color-subtle);
		text-decoration: none;
		white-space: nowrap;
		transition: color 200ms ease;
	}

	nav a:hover,
	nav a.on {
		color: var(--color-heading);
	}

	.orb {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: none;
		border-radius: 999px;
		background: var(--color-muted);
	}

	.orb span {
		width: 12px;
		height: 12px;
		border-radius: 999px;
		background: linear-gradient(140deg, var(--lab-accent), var(--color-heading));
	}

	@container (max-width: 640px) {
		.dock {
			width: 100%;
			justify-content: space-between;
		}

		nav a {
			padding-inline: 0.5rem;
			font-size: 0.74rem;
		}
	}

	@container (max-width: 430px) {
		// Below this the five labels stop fitting, so the dock keeps the brand
		// and control and lets the nav itself scroll.
		nav {
			min-width: 0;
			overflow-x: auto;
			scrollbar-width: none;
		}

		ul {
			grid-auto-columns: max-content;
		}

		.pill {
			display: none;
		}
	}
</style>
