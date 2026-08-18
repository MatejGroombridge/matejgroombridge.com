<script lang="ts">
	import { onMount } from 'svelte';
	import { photoTrips } from '$lib/content';
	import { onFrameScroll, scrollHost } from '../scrollHost';

	const links = ['Photos', 'Book notes', 'Writing', '2026', 'Contact'];
	const cover = photoTrips[0]?.coverImage ?? '';

	let el = $state<HTMLElement>();
	let solid = $state(0);

	onMount(() => {
		if (!el) return;
		// A continuous 0→1 ramp over the first 160px rather than a class flip, so
		// the header dissolves from photo to paper instead of snapping.
		return onFrameScroll(scrollHost(el), (top) => {
			solid = Math.min(1, Math.max(0, top / 160));
		});
	});
</script>

<header class="bar" bind:this={el} style={`--solid:${solid}`}>
	<div class="photo" aria-hidden="true" style={`background-image:url(${cover})`}></div>
	<div class="paper" aria-hidden="true"></div>

	<div class="row">
		<a class="brand" href="/" data-preserve-case>Matej Groombridge</a>
		<nav aria-label="Primary">
			<ul>
				{#each links as link (link)}
					<li><a href="/">{link}</a></li>
				{/each}
			</ul>
		</nav>
		<span class="stamp lab-mono">sydney · 03/25</span>
	</div>
</header>

<style lang="scss">
	.bar {
		--solid: 0;
		position: sticky;
		top: 0;
		z-index: 5;
		isolation: isolate;
	}

	.photo,
	.paper {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.photo {
		background-size: cover;
		background-position: center 62%;
	}

	// Paper fades in over the photograph as the ramp climbs, and the border
	// only appears once the header is properly opaque.
	.paper {
		background: var(--color-cream);
		opacity: var(--solid);
		border-bottom: 1px solid
			color-mix(in srgb, var(--lab-hairline) calc(var(--solid) * 100%), transparent);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		padding: clamp(0.9rem, 3cqw, 1.5rem) clamp(1rem, 4cqw, 2.5rem);
	}

	.brand,
	nav a,
	.stamp {
		// Both colours are always present; the ramp cross-mixes between them, so
		// text over the photograph is white and text over paper is ink.
		color: color-mix(in srgb, var(--color-heading) calc(var(--solid) * 100%), #ffffff);
		text-decoration: none;
	}

	.brand {
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: -0.035em;
		white-space: nowrap;
		text-shadow: 0 1px 12px rgb(0 0 0 / calc(0.45 * (1 - var(--solid))));
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
		font-weight: 550;
		white-space: nowrap;
		text-shadow: 0 1px 10px rgb(0 0 0 / calc(0.4 * (1 - var(--solid))));
	}

	nav a:hover {
		color: var(--lab-accent);
	}

	.stamp {
		font-size: 0.5rem;
		opacity: calc(1 - var(--solid));
		white-space: nowrap;
	}

	@container (max-width: 720px) {
		.stamp {
			display: none;
		}
	}

	@container (max-width: 560px) {
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
