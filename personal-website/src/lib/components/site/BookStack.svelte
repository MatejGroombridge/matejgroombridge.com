<script lang="ts">
	import { onMount } from 'svelte';
	import type { BookNote } from '$lib/content/types';

	type Props = {
		books: BookNote[];
		pool?: BookNote[];
		count?: number;
	};

	let { books, pool, count }: Props = $props();

	// svelte-ignore state_referenced_locally
	const size = count ?? books.length;
	// svelte-ignore state_referenced_locally
	const sourcePool = pool ?? books;

	function shuffled(pool: BookNote[]) {
		const next = [...pool];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
		return next;
	}

	// Deterministic on first render so SSR output matches the client's initial
	// hydration pass — randomizing here would shuffle differently on the server
	// vs. the client and scramble the keyed list during hydration.
	// svelte-ignore state_referenced_locally
	let displayed = $state(sourcePool.slice(0, size));

	let viewport = $state<HTMLElement | undefined>();
	let track = $state<HTMLElement | undefined>();
	let offset = $state(0);

	onMount(() => {
		displayed = shuffled(sourcePool).slice(0, size);

		// Reduced motion keeps the shelf as a plain horizontally scrollable strip
		// rather than yoking it to page scroll.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;

		function update() {
			frame = 0;
			if (!viewport || !track) return;

			const overflow = track.scrollWidth - viewport.clientWidth;
			if (overflow <= 0) {
				offset = 0;
				return;
			}

			// Travel the full overflow across the whole time the shelf is on screen:
			// 0 as its top meets the bottom of the viewport, 1 as its bottom leaves the top.
			const rect = viewport.getBoundingClientRect();
			const span = window.innerHeight + rect.height;
			const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
			offset = -progress * overflow;
		}

		function schedule() {
			if (!frame) frame = requestAnimationFrame(update);
		}

		// Wait a frame so the shuffled covers are laid out before measuring.
		schedule();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<div class="bookstack" bind:this={viewport}>
	<ul class="shelf" bind:this={track} style="transform: translate3d({offset}px, 0, 0);">
		{#each displayed as book (book.slug)}
			<li class="slot">
				<a class="book" href={`/booknotes/${book.slug}`} aria-label={book.title}>
					<span class="cover-wrap">
						<img src={book.cover} alt="Cover of {book.title}" loading="lazy" />
						<span class="spine" aria-hidden="true"></span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.bookstack {
		// `overflow: hidden` is what clips the marquee, but it also clips the covers'
		// drop shadows. Pad the clip box out far enough for the hover shadow (which
		// reaches ~40px below the cover) and pull the same amount back off the
		// margins, so the shadows are visible without shifting the layout.
		// No horizontal inset: the covers line up with the section heading, and a
		// clipped side shadow is invisible against the marquee's own clipping.
		--shelf-pad-x: 0rem;
		--shelf-pad-top: 1.25rem;
		--shelf-pad-bottom: 2.75rem;

		overflow: hidden;
		margin: calc(var(--shelf-pad-top) * -1) calc(var(--shelf-pad-x) * -1)
			calc(var(--shelf-pad-bottom) * -1);
		padding: var(--shelf-pad-top) var(--shelf-pad-x) var(--shelf-pad-bottom);
	}

	.shelf {
		display: flex;
		width: max-content;
		gap: clamp(0.85rem, 2vw, 1.5rem);
		list-style: none;
		margin: 0;
		padding: 0;
		will-change: transform;
	}

	.slot {
		flex: 0 0 auto;
		width: clamp(128px, 15vw, 176px);
	}

	.book {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	.cover-wrap {
		position: relative;
		display: block;
		aspect-ratio: 2 / 3;
		border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
		filter: drop-shadow(0 8px 14px rgb(36 37 37 / 0.16)) drop-shadow(0 2px 4px rgb(36 37 37 / 0.1));
		transition:
			transform var(--duration-base) cubic-bezier(0.2, 0.8, 0.2, 1),
			filter var(--duration-base) ease;
	}

	.cover-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
	}

	.spine {
		position: absolute;
		inset: 0 auto 0 0;
		width: 5px;
		background: linear-gradient(
			90deg,
			rgb(0 0 0 / 0.28) 0%,
			rgb(0 0 0 / 0.06) 60%,
			rgb(255 255 255 / 0.16) 100%
		);
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		pointer-events: none;
	}

	.book:hover .cover-wrap,
	.book:focus-visible .cover-wrap {
		transform: translateY(-5px);
		filter: drop-shadow(0 16px 24px rgb(36 37 37 / 0.22))
			drop-shadow(0 4px 8px rgb(36 37 37 / 0.14));
	}

	.book:focus-visible .cover-wrap {
		outline: 2px solid var(--color-green);
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.bookstack {
			overflow-x: auto;
		}

		.shelf {
			transform: none !important;
		}

		.cover-wrap {
			transition: none;
		}
	}
</style>
