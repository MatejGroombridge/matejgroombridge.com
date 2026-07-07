<script lang="ts">
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

	// svelte-ignore state_referenced_locally
	const displayed = shuffled(sourcePool).slice(0, size);
</script>

<div class="bookstack">
	<ul class="shelf" style="--count: {displayed.length};">
		{#each displayed as book (book.slug)}
			<li class="slot">
				<a class="book" href={`/booknotes/${book.slug}`}>
					<span class="cover-wrap">
						<img src={book.cover} alt="Cover of {book.title}" loading="lazy" />
						<span class="spine" aria-hidden="true"></span>
					</span>
					<span class="meta">
						<span class="title">{book.title}</span>
						<span class="author">{book.author}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.bookstack {
		display: grid;
		gap: 0.85rem;
	}

	.shelf {
		display: grid;
		grid-template-columns: repeat(var(--count), minmax(0, 1fr));
		grid-template-rows: auto auto;
		grid-auto-flow: column;
		column-gap: clamp(0.85rem, 2vw, 1.5rem);
		row-gap: 0.85rem;
		list-style: none;
		margin: 0;
		padding: 0.25rem 0;
	}

	.slot {
		display: contents;
	}

	.book {
		display: contents;
		color: inherit;
		text-decoration: none;
	}

	.cover-wrap {
		position: relative;
		display: block;
		aspect-ratio: 2 / 3;
		border-radius: 3px 5px 5px 3px;
		filter: drop-shadow(0 8px 14px rgb(36 37 37 / 0.16))
			drop-shadow(0 2px 4px rgb(36 37 37 / 0.1));
		transition:
			transform var(--duration-base) cubic-bezier(0.2, 0.8, 0.2, 1),
			filter var(--duration-base) ease;
	}

	.cover-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 3px 5px 5px 3px;
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
		border-radius: 3px 0 0 3px;
		pointer-events: none;
	}

	.meta {
		display: grid;
		gap: 0.2rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--color-line);
		min-width: 0;
		transition: transform var(--duration-base) ease;
	}

	.title {
		font-family: var(--font-heading);
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1.25;
		color: var(--color-heading);
		overflow-wrap: anywhere;
	}

	.author {
		font-size: 0.78rem;
		color: var(--color-subtle);
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

	@media (max-width: 820px) {
		.shelf {
			grid-template-columns: repeat(var(--count), clamp(120px, 32vw, 160px));
			overflow-x: auto;
			scroll-snap-type: x proximity;
			padding-bottom: 0.5rem;
			margin-inline: calc(-1 * clamp(1.25rem, 4vw, 1.75rem));
			padding-inline: clamp(1.25rem, 4vw, 1.75rem);
			scrollbar-width: thin;
		}

		.cover-wrap {
			scroll-snap-align: start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cover-wrap,
		.meta {
			transition: none;
		}
	}
</style>
