<script>
	import { onMount, createEventDispatcher, getAllContexts } from 'svelte';
	import { tick } from 'svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import { tripSlugs } from '../../../static/photography/trip-slugs.js';

	let showModal = false;
	let targetBlob = new Blob();

	let tripData;
	let imgIndex;

	$: imageWidth = 0;
	$: imageHeight = 0;
	$: maxHeight = '';

	export let gap = 10;
	export let maxColumnWidth = 250;
	export let hover = false;
	export let loading;
	export let hasModal = false;
	export let type = '';

	const dispatch = createEventDispatcher();

	let slotHolder = null;
	let columns = [];
	let galleryWidth = 0;
	let columnCount = 0;

	$: columnCount = parseInt(galleryWidth / maxColumnWidth) || 1;
	$: columnCount && Draw();
	$: galleryStyle = `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`;

	onMount(Draw);

	function HandleClick(e) {
		dispatch('click', {
			src: e.target.src,
			alt: e.target.alt,
			loading: e.target.loading,
			class: e.target.className
		});

		showModal = true;
	}

	function getImgData(img) {
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

	function tripLink(trip) {
		if (type == 'tripView') {
			window.location.href = `/photography/${trip}`;
		}
	}

	function fetchTripData(slug) {
		const trip = tripSlugs.find((trip) => trip.slug === slug);
		tripData = trip;
		return trip;
	}

	function getIndex(alt) {
		imgIndex = alt.split('-')[1];
	}

	async function Draw() {
		await tick();

		if (!slotHolder) {
			return;
		}

		const images = Array.from(slotHolder.childNodes).filter((child) => child.tagName === 'IMG');
		columns = [];

		// Fill the columns with image URLs
		for (let i = 0; i < images.length; i++) {
			const idx = i % columnCount;
			columns[idx] = [
				...(columns[idx] || []),
				{ src: images[i].src, alt: images[i].alt, class: images[i].className }
			];
		}
	}
</script>

<div id="slotHolder" bind:this={slotHolder} on:DOMNodeInserted={Draw} on:DOMNodeRemoved={Draw}>
	<slot />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

{#if columns}
	<div id="gallery" bind:clientWidth={galleryWidth} style={galleryStyle}>
		{#each columns as column}
			<div class="column">
				{#each column as img}
					{#if type != 'tripView'}
						<img
							src={img.src}
							alt={img.alt}
							on:click={HandleClick}
							on:click={() => getImgData(img.src)}
							on:click={() => getIndex(img.alt)}
							class="{hover === true ? 'img-hover' : ''} {img.class}"
							{loading}
						/>
					{/if}

					{#if type == 'tripView'}
						<div
							class="trip-container img-hover-scale {img.class}"
							{loading}
							on:click={HandleClick}
							on:click={() => getImgData(img.src)}
							on:click={() => tripLink(img.alt)}
						>
							<img src={img.src} alt={img.alt} />
							<div class="trip-info">
								<div class="trip-subtitle">{fetchTripData(img.alt).subtitle}</div>
								<h3>{fetchTripData(img.alt).title}</h3>
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
	<Modal bind:showModal bind:maxHeight bind:type bind:targetBlob bind:tripData bind:imgIndex>
		<div slot="image" class="slotImg">
			<img src={targetBlob} alt="" />
		</div>
	</Modal>
{/if}
