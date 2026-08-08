<script lang="ts">
	import type { BookNote } from '$lib/content/types';

	type Props = {
		book: BookNote;
	};

	let { book }: Props = $props();
</script>

<a class="book-card" href={`/booknotes/${book.slug}`}>
	<div class="cover-wrap">
		<img class="cover" src={book.cover} alt="Cover of {book.title}" loading="lazy" />
		<span class="spine" aria-hidden="true"></span>
	</div>
	<div class="text">
		<h3>{book.title}</h3>
		<p>{book.author}</p>
	</div>
</a>

<style lang="scss">
	.book-card {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 0.25rem;
		text-decoration: none;
		color: inherit;
		transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.cover-wrap {
		position: relative;
		aspect-ratio: 2 / 3;
		border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
		filter: drop-shadow(0 6px 12px rgb(36 37 37 / 0.18))
			drop-shadow(0 2px 4px rgb(36 37 37 / 0.1));
		transition: filter 0.3s ease;
	}

	.cover {
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
			rgb(0 0 0 / 0.08) 55%,
			rgb(255 255 255 / 0.15) 100%
		);
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		pointer-events: none;
	}

	.text {
		display: grid;
		gap: 0.25rem;
		padding: 0 0.15rem;
	}

	h3 {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 0.98rem;
		font-weight: 600;
		line-height: 1.25;
		color: var(--color-heading);
		overflow-wrap: anywhere;
	}

	p {
		margin: 0;
		font-size: 0.82rem;
		color: var(--color-subtle);
	}

	.book-card:hover,
	.book-card:focus-visible {
		transform: translateY(-4px);
		outline: none;
	}

	.book-card:hover .cover-wrap,
	.book-card:focus-visible .cover-wrap {
		filter: drop-shadow(0 14px 22px rgb(36 37 37 / 0.24))
			drop-shadow(0 4px 8px rgb(36 37 37 / 0.14));
	}

	@media (prefers-reduced-motion: reduce) {
		.book-card,
		.cover-wrap {
			transition: none;
		}
	}
</style>
