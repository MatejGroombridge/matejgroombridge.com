<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import { tripSlugs } from '$lib/photography/trip-slugs.js';
	// Avoid SSR issues with Blob by storing the image src string instead.

	let showModal: boolean = false;
	let targetBlob: string = '';

	let tripData: { title: string; subtitle: string; year: number; slug: string } | null = null;
	let imgIndex: number = 0;

	let maxHeight: number = 0;
	let imageWidth: number = 0;
	let imageHeight: number = 0;

	export let gap: number = 10;
	export let maxColumnWidth: number = 250;
	export let hover: boolean = false;
	// Optional prop; default undefined to make it non-required
	export let loading: 'lazy' | 'eager' | undefined = undefined;
	export let hasModal: boolean = false;
	export let type: 'tripView' | 'tripImages' | '' = '';

	const dispatch = createEventDispatcher();

	let slotHolder: HTMLDivElement | null = null; // container to hide raw slotted nodes
	let columns: Array<Array<{ src: string; alt: string; class: string }>> = [];
	let galleryWidth: number = 0;
	let columnCount: number = 0;

	$: columnCount = Math.max(1, Math.floor(galleryWidth / maxColumnWidth)) || 1;
	$: columnCount && Draw();
	$: galleryStyle = `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`;

	onMount(() => {
		// Try multiple times across microtask and next frame to ensure slotted images are present
		const attemptDraw = () => Draw();
		Draw(); // immediate (often enough)
		queueMicrotask(attemptDraw); // after current microtask
		requestAnimationFrame(attemptDraw); // next frame (after DOM paint)
		setTimeout(attemptDraw, 0); // final fallback

		// Observe changes to the hidden slot container to reflow when content arrives
		if (slotHolder) {
			const mo = new MutationObserver(() => Draw());
			mo.observe(slotHolder, { childList: true, subtree: true });
		}
		const onResize = () => Draw();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	function HandleClick(e: MouseEvent) {
		if (!hasModal) {
			// prevent any default navigation/behaviour
			e.preventDefault?.();
			e.stopPropagation?.();
			return;
		}
		const target = e.target as HTMLImageElement | null;
		if (!target) return;
		dispatch('click', {
			src: target.src,
			alt: target.alt,
			loading: target.loading,
			class: target.className
		});
		showModal = true;
	}

	function getImgData(img: string) {
		targetBlob = img;

		const imgElement = new Image();
		imgElement.src = img;

		imgElement.onload = () => {
			imageHeight = imgElement.naturalHeight;
			imageWidth = imgElement.naturalWidth;

			if (imageWidth > imageHeight) {
				maxHeight = 70;
			} else {
				maxHeight = 90;
			}
		};
	}

	function tripLink(trip: string) {
		if (type == 'tripView') {
			window.location.href = `/photography/${trip}`;
		}
	}

	function fetchTripData(slug: string) {
		const trip = tripSlugs.find((trip) => trip.slug === slug);
		tripData = trip ?? null;
		return (
			trip ?? {
				title: slug,
				subtitle: '',
				year: new Date().getFullYear(),
				slug
			}
		);
	}

	function getIndex(alt: string) {
		const idx = parseInt(alt.split('-')[1]);
		imgIndex = isNaN(idx) ? 0 : idx;
	}

	async function Draw() {
		await tick();

		if (!slotHolder) {
			return;
		}
		const images: HTMLImageElement[] = Array.from(slotHolder.querySelectorAll('img'));
		// If slot content isn't ready yet, try again shortly
		if (images.length === 0) {
			setTimeout(() => Draw(), 0);
			return;
		}
		// Initialize columns and heights
		columns = Array.from(
			{ length: columnCount },
			() => [] as Array<{ src: string; alt: string; class: string }>
		);
		const heights: number[] = Array.from({ length: columnCount }, () => 0);
		const columnWidth = galleryWidth > 0 ? galleryWidth / columnCount : maxColumnWidth;

		const getEstimate = (imgEl: HTMLImageElement) => {
			const w = imgEl.naturalWidth;
			const h = imgEl.naturalHeight;
			if (!w || !h) {
				// ensure we redraw once intrinsic size is known
				imgEl.addEventListener('load', () => Draw(), { once: true });
				return columnWidth; // assume square until loaded
			}
			return (h / w) * columnWidth;
		};

		for (const imgEl of images) {
			// pick the shortest column so far
			let minIndex = 0;
			let minHeight = heights[0] ?? 0;
			for (let c = 1; c < columnCount; c++) {
				if (heights[c] < minHeight) {
					minIndex = c;
					minHeight = heights[c];
				}
			}

			columns[minIndex].push({ src: imgEl.src, alt: imgEl.alt, class: imgEl.className });
			heights[minIndex] += getEstimate(imgEl) + gap;
		}
	}
</script>

<div id="slotHolder" bind:this={slotHolder}>
	<slot />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

{#if columns}
	<div id="gallery" bind:clientWidth={galleryWidth} style={galleryStyle}>
		{#each columns as column}
			<div class="column">
				{#each column as img}
					{#if type != 'tripView'}
						{#if hasModal}
							<img
								src={img.src}
								alt={img.alt}
								on:click={HandleClick}
								on:click={() => getImgData(img.src)}
								on:click={() => getIndex(img.alt)}
								class="{hover === true ? 'img-hover' : ''} {img.class}"
								{loading}
								on:error={(e) => (e.currentTarget as HTMLImageElement).remove()}
							/>
						{:else}
							<img
								src={img.src}
								alt={img.alt}
								class="{hover === true ? 'img-hover' : ''} {img.class}"
								style="cursor: default"
								{loading}
								on:error={(e) => (e.currentTarget as HTMLImageElement).remove()}
							/>
						{/if}
					{/if}

					{#if type == 'tripView'}
						<div
							class="trip-container img-hover-scale {img.class}"
							role="button"
							tabindex="0"
							on:click={HandleClick}
							on:click={() => getImgData(img.src)}
							on:click={() => tripLink(img.alt)}
						>
							<img
								src={img.src}
								alt={img.alt}
								{loading}
								on:error={(e) => (e.currentTarget as HTMLImageElement).remove()}
							/>
							<div class="trip-info">
								{#key img.alt}
									{#if fetchTripData(img.alt)}
										<div class="trip-subtitle">{fetchTripData(img.alt).subtitle}</div>
										<h3>{fetchTripData(img.alt).title}</h3>
									{/if}
								{/key}
							</div>
							<div class="trip-date-pos">
								<p class="trip-date">{fetchTripData(img.alt).year}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
{/if}

{#if hasModal}
	<Modal bind:showModal bind:maxHeight bind:type bind:targetBlob bind:imgIndex>
		<div slot="image" class="slotImg">
			<img src={targetBlob} alt="" />
		</div>
	</Modal>
{/if}
