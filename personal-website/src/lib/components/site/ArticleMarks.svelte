<!--
	A small cluster of hand-drawn marks beside an article title — the writing
	equivalent of a book note's cover. Three marks sit in a triangle, each drifting
	on its own slow loop, and the pointer nudges them away as it passes.

	Marks are painted with `mask-image` over `currentColor` so the sketches take
	the heading colour in both themes; an <img> could not.

	Two nested elements per mark keep the motions independent: the outer takes the
	pointer offset (a transition), the inner the float (an animation). Putting both
	transforms on one element would have each overwrite the other.
-->
<script lang="ts">
	type Props = {
		/** SVG URLs, drawn in order: top, bottom-left, bottom-right. */
		marks: string[];
	};

	let { marks }: Props = $props();

	/**
	 * How far a mark moves at most, and how close the pointer must be before it
	 * starts to. Both in px; the container is roughly 150-210px across.
	 */
	const PUSH = 12;
	const REACH = 130;

	let cluster: HTMLDivElement | undefined = $state();
	// Empty until the pointer arrives; a missing entry reads as no offset.
	let offsets = $state<{ x: number; y: number }[]>([]);

	function repel(event: PointerEvent) {
		if (!cluster) return;
		const items = cluster.querySelectorAll<HTMLElement>('.mark');
		const origin = cluster.getBoundingClientRect();
		offsets = Array.from(items, (item) => {
			// Measured from the resting position (offset*, not the client rect), so a
			// mark that has already moved doesn't feed back into its own push.
			const dx = origin.left + item.offsetLeft + item.offsetWidth / 2 - event.clientX;
			const dy = origin.top + item.offsetTop + item.offsetHeight / 2 - event.clientY;
			const distance = Math.hypot(dx, dy);
			if (distance === 0 || distance > REACH) return { x: 0, y: 0 };
			// Strongest when the pointer is on the mark, fading to nothing at REACH.
			const push = (PUSH * (REACH - distance)) / REACH;
			return { x: (dx / distance) * push, y: (dy / distance) * push };
		});
	}

	function settle() {
		offsets = [];
	}
</script>

<div
	class="cluster"
	bind:this={cluster}
	onpointermove={repel}
	onpointerleave={settle}
	aria-hidden="true"
>
	{#each marks as src, index (src)}
		<div
			class="mark mark-{index}"
			style:--dx="{offsets[index]?.x ?? 0}px"
			style:--dy="{offsets[index]?.y ?? 0}px"
		>
			<div class="float" style:--mask="url('{src}')"></div>
		</div>
	{/each}
</div>

<style lang="scss">
	.cluster {
		--size: clamp(10rem, 18vw, 14rem);
		position: relative;
		width: var(--size);
		height: calc(var(--size) * 0.9);
		color: var(--color-heading);
		user-select: none;
		// Pointer events land on the cluster itself, so the marks stay inert.
		touch-action: none;
	}

	// Big enough to touch: the three overlap a little, like stickers on a case.
	.mark {
		position: absolute;
		width: 54%;
		aspect-ratio: 1;
		transform: translate(var(--dx, 0px), var(--dy, 0px));
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	// A triangle: one on top, two below, slightly asymmetric so it reads as
	// arranged rather than stamped.
	.mark-0 {
		top: 0;
		left: 24%;
		z-index: 1;
	}

	// The flower is drawn heavier than the other two, so it sits a notch smaller.
	.mark-1 {
		bottom: 0;
		left: 7%;
		width: 50%;
	}

	.mark-2 {
		bottom: 3%;
		right: 0;
		z-index: 2;
	}

	.float {
		width: 100%;
		height: 100%;
		background: currentColor;
		mask: var(--mask) center / contain no-repeat;
		animation: float 6s ease-in-out infinite;
	}

	// Offset timings so the three never bob in unison.
	.mark-1 .float {
		animation-duration: 7.2s;
		animation-delay: -2.1s;
	}

	.mark-2 .float {
		animation-duration: 6.6s;
		animation-delay: -4.4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-6px) rotate(-2deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.float {
			animation: none;
		}

		.mark {
			transition: none;
		}
	}
</style>
