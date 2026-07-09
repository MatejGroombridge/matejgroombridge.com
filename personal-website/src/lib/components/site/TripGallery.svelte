<script lang="ts">
	import { tick } from 'svelte';
	import type { PhotoTrip } from '$lib/content/types';

	type Props = {
		trips: readonly PhotoTrip[];
		gap?: number;
		maxColumnWidth?: number;
		loading?: 'lazy' | 'eager';
	};

	let { trips, gap = 15, maxColumnWidth = 250, loading = 'lazy' }: Props = $props();

	let galleryWidth = $state(0);
	let dims = $state<Record<string, { w: number; h: number }>>({});

	const columnCount = $derived(Math.max(1, Math.floor(galleryWidth / maxColumnWidth) || 1));
	const columnWidth = $derived(
		galleryWidth > 0 ? (galleryWidth - gap * (columnCount - 1)) / columnCount : maxColumnWidth
	);

	const columns = $derived.by(() => {
		const cols: PhotoTrip[][] = Array.from({ length: columnCount }, () => []);
		const heights: number[] = Array.from({ length: columnCount }, () => 0);

		for (const trip of trips) {
			let minIndex = 0;
			for (let c = 1; c < columnCount; c++) {
				if (heights[c] < heights[minIndex]) minIndex = c;
			}
			cols[minIndex].push(trip);

			const d = dims[trip.coverImage];
			const estimated = d ? (d.h / d.w) * columnWidth : columnWidth;
			heights[minIndex] += estimated + gap;
		}

		return cols;
	});

	const galleryStyle = $derived(
		`grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`
	);

	async function recordDimensions(src: string, target: HTMLImageElement) {
		const w = target.naturalWidth;
		const h = target.naturalHeight;
		if (!w || !h) return;
		if (dims[src]) return;
		await tick();
		dims = { ...dims, [src]: { w, h } };
	}

	function handleImgError(e: Event) {
		(e.currentTarget as HTMLImageElement).remove();
	}
</script>

<div class="gallery" bind:clientWidth={galleryWidth} style={galleryStyle}>
	{#each columns as column, ci (ci)}
		<div class="column">
			{#each column as trip (trip.slug)}
				<a class="trip" href={`/photography/${trip.slug}`} aria-label={`${trip.title}, ${trip.year}`}>
					<img
						src={trip.coverImage}
						alt={trip.title}
						{loading}
						onload={(e) =>
							recordDimensions(trip.coverImage, e.currentTarget as HTMLImageElement)}
						onerror={handleImgError}
					/>
					<div class="overlay" aria-hidden="true"></div>
					<div class="trip-info">
						{#if trip.subtitle}
							<div class="trip-subtitle">{trip.subtitle}</div>
						{/if}
						<h3>{trip.title}</h3>
					</div>
					<div class="trip-date-pos">
						<p class="trip-date">{trip.year}</p>
					</div>
				</a>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.gallery {
		display: grid;
		gap: var(--gap);
		width: 100%;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		min-width: 0;
	}

	.trip {
		position: relative;
		display: block;
		width: 100%;
		font-family: var(--font-heading, 'Poppins', Helvetica, arial);
		color: white;
		text-decoration: none;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-subtle);
		transition:
			transform var(--duration-base) ease,
			box-shadow var(--duration-base) ease;
		cursor: pointer;

		img {
			display: block;
			width: 100%;
			height: auto;
			filter: brightness(85%);
			transition: filter var(--duration-base) ease;
		}

		&:hover,
		&:focus-visible {
			transform: translateY(-4px);
			box-shadow: var(--shadow-soft);

			img {
				filter: brightness(95%);
			}

			.trip-subtitle {
				opacity: 0.75;
				transform: translateY(0);
			}
		}

		&:focus-visible {
			outline: 2px solid var(--color-green);
			outline-offset: 2px;
		}
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgb(0 0 0 / 0.35) 0%,
			rgb(0 0 0 / 0) 35%,
			rgb(0 0 0 / 0) 55%,
			rgb(0 0 0 / 0.55) 100%
		);
		pointer-events: none;
	}

	.trip-info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0.5em 0;
		padding: 0 1em;

		h3 {
			font-size: 2.2em;
			color: white;
			font-weight: 600;
			margin: 0;
			padding: 0;
			line-height: 1.05;
		}
	}

	.trip-subtitle {
		font-size: 1.25em;
		color: white;
		margin: 0;
		padding: 0;
		opacity: 0;
		transform: translateY(15px);
		transition:
			opacity var(--duration-base) ease,
			transform var(--duration-base) ease;
	}

	.trip-date-pos {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		padding: 0.3em 1.2em;
	}

	.trip-date {
		color: white;
		opacity: 0.7;
		font-size: 1.2em;
		font-weight: 700;
		margin: 0;
		text-align: right;
	}

	@media (hover: none), (pointer: coarse) {
		.trip:hover {
			transform: none;

			.trip-subtitle {
				display: none;
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.trip,
		.trip img,
		.trip-subtitle {
			transition: none;
		}
	}
</style>
