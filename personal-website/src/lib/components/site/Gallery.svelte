<script lang="ts">
	import { tick } from 'svelte';
	import type { PhotoImage } from '$lib/content/types';

	type Props = {
		images: readonly PhotoImage[];
		onselect?: (image: PhotoImage) => void;
		gap?: number;
		maxColumnWidth?: number;
		columnCount?: number;
		loading?: 'lazy' | 'eager';
	};

	let {
		images,
		onselect,
		gap = 15,
		maxColumnWidth = 300,
		columnCount: fixedColumnCount,
		loading = 'lazy'
	}: Props = $props();

	let galleryEl = $state<HTMLDivElement | null>(null);
	let galleryWidth = $state(0);
	// Track natural dimensions once known so we can lay out by aspect ratio.
	let dims = $state<Record<string, { w: number; h: number }>>({});

	const columnCount = $derived(
		fixedColumnCount ?? Math.max(1, Math.floor(galleryWidth / maxColumnWidth) || 1)
	);
	const columnWidth = $derived(
		galleryWidth > 0 ? (galleryWidth - gap * (columnCount - 1)) / columnCount : maxColumnWidth
	);

	const columns = $derived.by(() => {
		const cols: PhotoImage[][] = Array.from({ length: columnCount }, () => []);
		const heights: number[] = Array.from({ length: columnCount }, () => 0);

		for (const image of images) {
			let minIndex = 0;
			for (let c = 1; c < columnCount; c++) {
				if (heights[c] < heights[minIndex]) minIndex = c;
			}
			cols[minIndex].push(image);

			const d = dims[image.src];
			const estimated = d ? (d.h / d.w) * columnWidth : columnWidth;
			heights[minIndex] += estimated + gap;
		}

		return cols;
	});

	const galleryStyle = $derived(
		`grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`
	);

	async function recordDimensions(image: PhotoImage, target: HTMLImageElement) {
		const w = target.naturalWidth;
		const h = target.naturalHeight;
		if (!w || !h) return;
		if (dims[image.src]) return;
		// Re-assign to trigger reactivity for the $derived columns.
		await tick();
		dims = { ...dims, [image.src]: { w, h } };
	}

	function handleImgError(e: Event) {
		(e.currentTarget as HTMLImageElement).remove();
	}
</script>

<div
	class="gallery"
	bind:this={galleryEl}
	bind:clientWidth={galleryWidth}
	style={galleryStyle}
>
	{#each columns as column, ci (ci)}
		<div class="column">
			{#each column as image (image.src)}
				<button
					type="button"
					class="item"
					onclick={() => onselect?.(image)}
					aria-label="Open {image.alt}"
				>
					<img
						src={image.src}
						alt={image.alt}
						{loading}
						onload={(e) => recordDimensions(image, e.currentTarget as HTMLImageElement)}
						onerror={handleImgError}
					/>
				</button>
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

	.item {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		border-radius: var(--radius-lg);
		background: transparent;
		overflow: hidden;
		box-shadow: var(--shadow-subtle);
		cursor: pointer;
		transition: transform 0.25s ease;

		&:hover img,
		&:focus-visible img {
			transform: scale(1.03);
		}

		&:focus-visible {
			outline: 2px solid var(--color-accent, currentColor);
			outline-offset: 2px;
		}
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		transition: transform 0.35s ease;
	}
</style>
