<script lang="ts">
	import { onMount } from 'svelte';
	import { bookNotes } from '$lib/content';

	const rows = bookNotes.slice(0, 8);

	let host = $state<HTMLDivElement>();
	let floater = $state<HTMLDivElement>();
	let hovered = $state<number | null>(null);

	onMount(() => {
		if (!host || !floater) return;

		let targetX = 0;
		let targetY = 0;
		let x = 0;
		let y = 0;
		let raf = 0;
		let last = 0;

		function onMove(event: PointerEvent) {
			const rect = host!.getBoundingClientRect();
			targetX = event.clientX - rect.left;
			targetY = event.clientY - rect.top;
			if (!raf) raf = requestAnimationFrame(frame);
		}

		function frame() {
			raf = 0;
			// Lag behind the cursor, and tilt in proportion to how fast it is
			// catching up — the preview reads as a physical card being dragged.
			const dx = (targetX - x) * 0.16;
			const dy = (targetY - y) * 0.16;
			x += dx;
			y += dy;
			last = last * 0.8 + dx * 0.2;

			floater!.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
				1
			)}px, 0) translate(-50%, -50%) rotate(${(last * 0.55).toFixed(2)}deg)`;

			if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) {
				raf = requestAnimationFrame(frame);
			}
		}

		host.addEventListener('pointermove', onMove);
		return () => {
			host?.removeEventListener('pointermove', onMove);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="list-wrap" bind:this={host} class:engaged={hovered !== null}>
	<div class="floater" bind:this={floater} class:on={hovered !== null} aria-hidden="true">
		{#each rows as book, i (book.slug)}
			<img src={book.cover} alt="" class:showing={hovered === i} loading="lazy" />
		{/each}
	</div>

	<ul>
		{#each rows as book, i (book.slug)}
			<li>
				<a
					href={`/booknotes/${book.slug}`}
					class:lit={hovered === i}
					onpointerenter={() => (hovered = i)}
					onfocus={() => (hovered = i)}
					onpointerleave={() => (hovered = null)}
					onblur={() => (hovered = null)}
				>
					<span class="idx lab-mono">{String(i + 1).padStart(2, '0')}</span>
					<span class="title" data-preserve-case>{book.title}</span>
					<span class="author" data-preserve-case>{book.author}</span>
					<span class="rating lab-mono">{book.rating}</span>
					<span class="arrow material-symbols-rounded" aria-hidden="true">arrow_outward</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.list-wrap {
		position: relative;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li + li a {
		border-top: 1px solid var(--lab-hairline);
	}

	a {
		position: relative;
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr) minmax(0, 0.8fr) 3rem 1.25rem;
		align-items: baseline;
		gap: 1rem;
		padding: 0.95rem 0.35rem;
		text-decoration: none;
		color: inherit;
		transition:
			opacity 260ms ease,
			padding-left 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	// Everything recedes except the row under the cursor.
	.list-wrap.engaged a {
		opacity: 0.42;
	}

	.list-wrap.engaged a.lit {
		opacity: 1;
		padding-left: 1.1rem;
	}

	.idx {
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	a.lit .idx {
		color: var(--lab-accent);
	}

	.title {
		font-family: var(--font-ui);
		font-size: clamp(1rem, 1.8vw, 1.3rem);
		font-weight: 600;
		letter-spacing: -0.025em;
		color: var(--color-heading);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.author {
		font-size: 0.85rem;
		color: var(--color-subtle);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rating {
		font-size: 0.58rem;
		color: var(--color-subtle);
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.arrow {
		font-size: 1rem;
		color: var(--lab-accent);
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 220ms ease,
			transform 220ms ease;
	}

	a.lit .arrow {
		opacity: 1;
		transform: none;
	}

	.floater {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 4;
		width: 132px;
		height: 198px;
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: 0 22px 50px -20px rgb(0 0 0 / 0.6);
		pointer-events: none;
		opacity: 0;
		transition:
			opacity 220ms ease,
			scale 320ms cubic-bezier(0.2, 0.9, 0.3, 1.3);
		scale: 0.85;
		will-change: transform;
	}

	.floater.on {
		opacity: 1;
		scale: 1;
	}

	.floater img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 180ms ease;
	}

	.floater img.showing {
		opacity: 1;
	}

	@media (hover: none) {
		.floater {
			display: none;
		}

		.list-wrap.engaged a {
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		a {
			grid-template-columns: 2rem minmax(0, 1fr) 3rem;
		}

		.author,
		.arrow {
			display: none;
		}
	}
</style>
