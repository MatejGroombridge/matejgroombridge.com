<script>
	import { flip } from 'svelte/animate';
	import { onDestroy } from 'svelte';

	export let images;
	export let imageSpacing = 20;
	export let speed = 1000;
	export let controlColor = '#36c421';
	export let controlScale = '0.5';
	export let autoplay = false;
	export let autoplaySpeed = 1000;
	export let displayControls = true;

	let interval;

	const rotateLeft = (e) => {
		const transitioningImage = images[images.length - 1];
		document.getElementById(transitioningImage.id).style.opacity = 0;
		images = [images[images.length - 1], ...images.slice(0, images.length - 1)];
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = 1), speed);
	};

	const rotateRight = (e) => {
		const transitioningImage = images[0];
		document.getElementById(transitioningImage.id).style.opacity = 0;
		images = [...images.slice(1, images.length), images[0]];
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = 1), speed);
	};

	const startAutoPlay = () => {
		if (autoplay) {
			interval = setInterval(rotateRight, autoplaySpeed);
		}
	};

	const stopAutoPlay = () => {
		clearInterval(interval);
	};

	if (autoplay) {
		startAutoPlay();
	}

	onDestroy(() => {
		stopAutoPlay();
	});
</script>

<div id="carousel-container">
	<div id="carousel-images">
		{#each images as image (image.id)}
			<a
				href={image.link}
				target="_blank"
				on:mouseenter={stopAutoPlay}
				on:mouseleave={startAutoPlay}
				animate:flip={{ duration: speed }}
			>
				<img src={image.path} alt={image.id} id={image.id} style={`margin: ${imageSpacing}px;`} />
			</a>
		{/each}
	</div>

	{#if displayControls}
		<button
			id="left"
			on:click={rotateLeft}
			on:mouseenter={stopAutoPlay}
			on:mouseleave={startAutoPlay}
		>
			<slot name="left-control">
				<svg width="39px" height="110px" id="svg8" transform={`scale(${controlScale})`}>
					<g id="layer1" transform="translate(-65.605611,-95.36949)">
						<path
							style={`fill:none;stroke:${controlColor};stroke-width:9.865;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`}
							d="m 99.785711,100.30199 -23.346628,37.07648 c -7.853858,12.81098 -7.88205,12.81098 0,24.78902 l 23.346628,37.94647"
							id="path1412"
						/>
					</g>
				</svg>
			</slot>
		</button>
		<button
			id="right"
			on:click={rotateRight}
			on:mouseenter={stopAutoPlay}
			on:mouseleave={startAutoPlay}
		>
			<slot name="right-control">
				<svg width="39px" height="110px" id="svg8" transform={`rotate(180) scale(${controlScale})`}>
					<g id="layer1" transform="translate(-65.605611,-95.36949)">
						<path
							style={`fill:none;stroke:${controlColor};stroke-width:9.865;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`}
							d="m 99.785711,100.30199 -23.346628,37.07648 c -7.853858,12.81098 -7.88205,12.81098 0,24.78902 l 23.346628,37.94647"
							id="path1412"
						/>
					</g>
				</svg>
			</slot>
		</button>
	{/if}
</div>
