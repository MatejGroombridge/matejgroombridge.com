<script>
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { photosData } from '../../../static/photography/photos-data.js';

	export let showModal;
	export let maxHeight;
	export let type;
	export let targetBlob;
	export let imgIndex;

	let dialog;
	let infoShown = false;
	let photoIndex;
	let photoInfo = [];

	const ID = $page.params.slug;

	$: if (dialog && showModal) dialog.showModal();

	function closeModal() {
		if ((showModal = false)) {
			showModal = true;
		}
	}

	function typeOptions() {
		if (type == 'tripImages') {
			window.open(targetBlob);
		}
	}

	async function getImgInfo() {
		photoIndex = 0;
		photoInfo = [];

		photosData.forEach((photo) => {
			if (photo.slug != ID) {
				return;
			}

			for (let i = 0; i < imgIndex; i++) {
				if (photo.imgData[i + 1] != undefined) {
					photoIndex = i + 1;
				}
			}

			let tempPhotoInfo = photo.imgData[photoIndex];

			tempPhotoInfo.forEach((element) => {
				photoInfo.push(element);
			});
		});

		return photoInfo;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-mouse-events-have-key-events a11y-no-noninteractive-element-interactions -->

<dialog
	id="#photography-dialog"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class:modalHidden={!showModal}
	style="max-height: {maxHeight}vh;"
	class="hide-mobile"
>
	<div on:click|stopPropagation class="dialog-wrapper shown">
		<div class="content">
			<slot name="image" />

			<div class="absolute top">
				<div
					on:mouseover={() => (infoShown = true)}
					on:mouseout={() => (infoShown = false)}
					class="btn mini-btn"
				>
					<i class="fa-solid fa-question" />
				</div>
			</div>

			<div class="absolute bottom">
				<button on:close={() => closeModal()} on:click={() => dialog.close()} class="btn mini-btn"
					><i class="fa-solid fa-xmark" /></button
				>
				<button on:click={() => typeOptions(type)} class="btn mini-btn"
					><i class="fa-solid fa-sm fa-up-right-and-down-left-from-center" /></button
				>
			</div>

			{#if infoShown}
				{#await getImgInfo() then imgInfo}
					<div class="photo-info" transition:fly>
						<h3 class="grey-title-text" style="font-size: 1.1em; text-transform: uppercase;">
							<i class="fa-solid fa-location-dot" />
							{imgInfo[0]}
						</h3>
						<p class="grey-title-text">
							<i class="fa-solid fa-calendar" />
							{imgInfo[1]}
						</p>
						<p class="grey-title-text" style=" font-size:0.8em">
							Shot on {imgInfo[2]}
						</p>
					</div>
				{/await}
			{/if}
		</div>
	</div>
</dialog>
