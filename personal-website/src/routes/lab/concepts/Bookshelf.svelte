<script lang="ts">
	import { bookNotes } from '$lib/content';

	const books = bookNotes.slice(0, 18);

	let rail = $state<HTMLDivElement>();
	let dragging = $state(false);
	let moved = 0;
	let startX = 0;
	let startScroll = 0;

	function onPointerDown(event: PointerEvent) {
		if (!rail || event.pointerType === 'touch') return;
		dragging = true;
		moved = 0;
		startX = event.clientX;
		startScroll = rail.scrollLeft;
		rail.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging || !rail) return;
		const delta = event.clientX - startX;
		moved = Math.max(moved, Math.abs(delta));
		rail.scrollLeft = startScroll - delta;
	}

	function onPointerUp(event: PointerEvent) {
		if (!rail) return;
		dragging = false;
		if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
	}

	/** Swallow the click that ends a drag so panning never navigates. */
	function onClickCapture(event: MouseEvent) {
		if (moved > 6) {
			event.preventDefault();
			event.stopPropagation();
		}
		moved = 0;
	}

	function ratingWidth(rating: string) {
		const out = Number.parseFloat(rating);
		return Number.isFinite(out) ? `${Math.min(100, out * 10)}%` : '0%';
	}
</script>

<div class="shelf">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="rail"
		class:dragging
		bind:this={rail}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onclickcapture={onClickCapture}
	>
		<div class="run">
			{#each books as book, i (book.slug)}
				<a
					class="slot"
					href={`/booknotes/${book.slug}`}
					style={`--i:${i}; --tilt:${((i * 37) % 7) - 3}deg`}
					aria-label={`${book.title} by ${book.author}`}
				>
					<span class="book">
						<span class="spine">
							<span class="spine-text" data-preserve-case>{book.title}</span>
							<span class="spine-mark" aria-hidden="true"></span>
						</span>
						<span class="cover">
							<img src={book.cover} alt="" loading="lazy" width="120" height="180" />
							<span class="sheen" aria-hidden="true"></span>
						</span>
						<span class="pages" aria-hidden="true"></span>
					</span>
					<span class="plate">
						<span class="plate-title" data-preserve-case>{book.title}</span>
						<span class="plate-author">{book.author}</span>
						<span class="bar" aria-hidden="true">
							<span class="bar-fill" style={`width:${ratingWidth(book.rating)}`}></span>
						</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
	<div class="board" aria-hidden="true"></div>
	<p class="hint lab-mono">drag the shelf · hover a spine to pull the book out</p>
</div>

<style lang="scss">
	.shelf {
		position: relative;
		display: grid;
		gap: 0;
	}

	.rail {
		// Deep perspective keeps the spines convincing without warping the ends.
		perspective: 1400px;
		perspective-origin: 50% 42%;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 4.5rem 1.25rem 0.5rem;
		scrollbar-width: none;
		cursor: grab;
	}

	.rail::-webkit-scrollbar {
		display: none;
	}

	.rail.dragging {
		cursor: grabbing;
	}

	.run {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		width: max-content;
		transform-style: preserve-3d;
	}

	.slot {
		position: relative;
		flex: 0 0 auto;
		width: 34px;
		height: 186px;
		text-decoration: none;
		color: inherit;
		transform-style: preserve-3d;
	}

	.book {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 124px;
		height: 186px;
		transform-origin: left bottom;
		transform-style: preserve-3d;
		// Edge-on by default: the spine faces the reader, the cover is a sliver.
		transform: rotateY(-70deg) rotateZ(var(--tilt)) translateZ(0);
		transition: transform 520ms cubic-bezier(0.22, 1, 0.28, 1);
	}

	.slot:hover .book,
	.slot:focus-visible .book {
		transform: rotateY(-13deg) rotateZ(0deg) translate3d(6px, -22px, 60px);
	}

	.slot:hover,
	.slot:focus-visible {
		z-index: 5;
	}

	.cover,
	.spine,
	.pages {
		position: absolute;
		inset: 0;
		border-radius: 2px 4px 4px 2px;
		backface-visibility: hidden;
	}

	.cover {
		overflow: hidden;
		background: var(--color-muted-strong);
		box-shadow:
			inset 1px 0 0 rgb(255 255 255 / 0.25),
			0 12px 26px rgb(0 0 0 / 0.24);
	}

	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			104deg,
			rgb(255 255 255 / 0.42) 0%,
			transparent 34%,
			transparent 66%,
			rgb(0 0 0 / 0.16) 100%
		);
	}

	// The spine hinges off the cover's left edge, so it stands perpendicular to
	// the cover in 3D and reads as the visible face while the book is shelved.
	.spine {
		width: 32px;
		transform-origin: left center;
		transform: rotateY(90deg);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0;
		border-radius: 2px;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--color-ink) 88%, var(--lab-accent)),
			color-mix(in srgb, var(--color-ink) 72%, var(--lab-accent)) 55%,
			color-mix(in srgb, var(--color-ink) 92%, #000)
		);
		box-shadow: inset -2px 0 6px rgb(0 0 0 / 0.4);
		overflow: hidden;
	}

	.spine-text {
		writing-mode: vertical-rl;
		font-family: var(--font-ui);
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: color-mix(in srgb, var(--color-cream) 88%, transparent);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 100%;
	}

	.spine-mark {
		position: absolute;
		left: 50%;
		bottom: 10px;
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--lab-accent);
		transform: translateX(-50%);
		opacity: 0.85;
	}

	// A hair of page block peeking out of the fore-edge.
	.pages {
		left: auto;
		right: -3px;
		width: 6px;
		transform: rotateY(90deg);
		transform-origin: right center;
		background: repeating-linear-gradient(180deg, #efeade 0 1px, #dcd6c6 1px 2px);
		border-radius: 0 3px 3px 0;
	}

	.plate {
		position: absolute;
		left: 50%;
		top: -3.6rem;
		display: grid;
		gap: 0.15rem;
		width: 168px;
		padding: 0.5rem 0.6rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-soft);
		transform: translate(-50%, 8px);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 220ms ease,
			transform 220ms ease;
	}

	.slot:hover .plate,
	.slot:focus-visible .plate {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	.plate-title {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 650;
		line-height: 1.25;
		color: var(--color-heading);
	}

	.plate-author {
		font-size: 0.72rem;
		color: var(--color-subtle);
	}

	.bar {
		display: block;
		height: 3px;
		margin-top: 0.2rem;
		border-radius: 999px;
		background: var(--color-muted-strong);
		overflow: hidden;
	}

	.bar-fill {
		display: block;
		height: 100%;
		background: var(--lab-accent);
	}

	// The shelf board itself: a plank with a contact shadow above it.
	.board {
		height: 14px;
		margin: -4px 0.5rem 0;
		border-radius: 0 0 4px 4px;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--color-ink) 26%, var(--color-muted-strong)),
			color-mix(in srgb, var(--color-ink) 55%, var(--color-muted-strong))
		);
		box-shadow: 0 12px 24px -10px rgb(0 0 0 / 0.5);
	}

	.hint {
		margin: 0.85rem 0 0;
		padding-inline: 1.25rem;
		font-size: 0.58rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}

	@media (max-width: 600px) {
		.plate {
			width: 140px;
		}
	}
</style>
