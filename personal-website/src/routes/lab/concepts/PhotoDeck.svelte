<script lang="ts">
	import { photoTrips } from '$lib/content';

	type Slide = { src: string; alt: string; location: string; when: string; trip: string };

	// One featured frame per trip, so the deck reads as a highlight reel.
	const slides: Slide[] = photoTrips.slice(0, 8).map((trip) => {
		const shot = trip.images.find((image) => image.featured) ?? trip.images[0];
		return {
			src: shot.src,
			alt: shot.alt,
			location: shot.location,
			when: shot.capturedAtLabel,
			trip: trip.title
		};
	});

	let order = $state(slides.map((_, i) => i));
	let drag = $state({ x: 0, y: 0, active: false });
	let flying = $state<'left' | 'right' | null>(null);

	const top = $derived(order[0]);

	function advance(direction: 'left' | 'right') {
		flying = direction;
		// Let the throw animation play before the card is cycled to the back.
		setTimeout(() => {
			order = [...order.slice(1), order[0]];
			drag = { x: 0, y: 0, active: false };
			flying = null;
		}, 260);
	}

	function onPointerDown(event: PointerEvent) {
		if (flying) return;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		drag = { x: 0, y: 0, active: true };
	}

	function onPointerMove(event: PointerEvent) {
		if (!drag.active) return;
		drag = { x: drag.x + event.movementX, y: drag.y + event.movementY, active: true };
	}

	function onPointerUp() {
		if (!drag.active) return;
		// 110px of travel is the commit threshold; anything less springs back.
		if (Math.abs(drag.x) > 110) advance(drag.x > 0 ? 'right' : 'left');
		else drag = { x: 0, y: 0, active: false };
	}

	function transform(index: number) {
		if (index === 0) {
			if (flying) {
				const dir = flying === 'right' ? 1 : -1;
				return `translate3d(${dir * 140}%, ${drag.y}px, 0) rotate(${dir * 22}deg)`;
			}
			return `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${drag.x * 0.045}deg)`;
		}
		const depth = Math.min(index, 4);
		return `translate3d(0, ${depth * 12}px, 0) scale(${1 - depth * 0.045})`;
	}
</script>

<div class="deck-wrap">
	<div class="deck">
		{#each order as slideIndex, position (slideIndex)}
			{@const slide = slides[slideIndex]}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="card"
				class:top={position === 0}
				class:settling={position === 0 && !drag.active}
				style={`z-index:${slides.length - position}; transform:${transform(position)}; opacity:${
					position > 4 ? 0 : 1
				}`}
				onpointerdown={position === 0 ? onPointerDown : undefined}
				onpointermove={position === 0 ? onPointerMove : undefined}
				onpointerup={position === 0 ? onPointerUp : undefined}
				onpointercancel={position === 0 ? onPointerUp : undefined}
			>
				<img
					src={slide.src}
					alt={position === 0 ? slide.alt : ''}
					loading="lazy"
					draggable="false"
				/>
				<div class="plate">
					<span class="trip" data-preserve-case>{slide.trip}</span>
					<span class="where">{slide.location}</span>
					<span class="when lab-mono">{slide.when}</span>
				</div>
				{#if position === 0}
					<span class="stamp keep" style={`opacity:${Math.max(0, drag.x / 110)}`}>keep</span>
					<span class="stamp skip" style={`opacity:${Math.max(0, -drag.x / 110)}`}>next</span>
				{/if}
			</div>
		{/each}
	</div>

	<div class="controls">
		<button type="button" aria-label="Previous photo" onclick={() => advance('left')}>
			<span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
		</button>
		<span class="counter lab-mono">
			{String(top + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
		</span>
		<button type="button" aria-label="Next photo" onclick={() => advance('right')}>
			<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
		</button>
	</div>
</div>

<style lang="scss">
	.deck-wrap {
		display: grid;
		justify-items: center;
		gap: 1.1rem;
	}

	.deck {
		position: relative;
		width: min(340px, 100%);
		aspect-ratio: 4 / 5;
		perspective: 1000px;
	}

	.card {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		border: 1px solid var(--lab-hairline);
		box-shadow: 0 18px 44px -22px rgb(0 0 0 / 0.55);
		overflow: hidden;
		will-change: transform;
		user-select: none;
		touch-action: none;
	}

	// Only the settled state animates: while a finger is down the card must
	// track the pointer exactly, with no transition lag.
	.card.settling,
	.card:not(.top) {
		transition:
			transform 380ms cubic-bezier(0.2, 0.9, 0.3, 1.05),
			opacity 300ms ease;
	}

	.card.top {
		cursor: grab;
	}

	.card.top:active {
		cursor: grabbing;
	}

	.card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}

	.plate {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.1rem 0.6rem;
		padding: 2.5rem 0.95rem 0.9rem;
		background: linear-gradient(to top, rgb(8 10 9 / 0.82), transparent);
		color: #f4f2ec;
	}

	.trip {
		grid-column: 1;
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 650;
		letter-spacing: -0.02em;
	}

	.where {
		grid-column: 1;
		grid-row: 2;
		font-size: 0.78rem;
		opacity: 0.72;
	}

	.when {
		grid-column: 2;
		grid-row: 1 / span 2;
		align-self: center;
		font-size: 0.55rem;
		opacity: 0.6;
	}

	// Polaroid-style verdict stamps that fade in as the card is dragged.
	.stamp {
		position: absolute;
		top: 1.1rem;
		padding: 0.25rem 0.7rem;
		border: 2.5px solid currentColor;
		border-radius: var(--radius-sm);
		font-family: var(--lab-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		pointer-events: none;
	}

	.keep {
		left: 1.1rem;
		color: #35d07f;
		transform: rotate(-14deg);
	}

	.skip {
		right: 1.1rem;
		color: #ff6b6b;
		transform: rotate(14deg);
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	button {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		color: var(--color-heading);
		transition:
			border-color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	button:hover {
		border-color: var(--lab-accent);
		transform: translateY(-2px);
	}

	.counter {
		font-size: 0.6rem;
		color: var(--color-subtle);
		font-variant-numeric: tabular-nums;
	}
</style>
