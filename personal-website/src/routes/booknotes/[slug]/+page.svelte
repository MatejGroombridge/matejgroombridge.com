<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Seo {...data.book.seo} canonical={`/booknotes/${data.book.slug}`} image={data.book.cover} />

<Section animate={false} class="booknote-hero">
	<div class="hero">
		<div class="hero-text">
			<Tag label="Book Notes" />
			<h1>{data.book.title}</h1>
			<h2>By {data.book.author}</h2>
		</div>
		<div class="hero-cover">
			<img src={data.book.cover} alt="Cover of {data.book.title}" />
		</div>
	</div>
</Section>

<Section tone="muted" animate={false} class="book-bar">
	<dl class="facts">
		<div><dt>Author</dt><dd>{data.book.author}</dd></div>
		<div><dt>Published</dt><dd>{data.book.published}</dd></div>
		<div><dt>My Rating</dt><dd>{data.book.rating}</dd></div>
		<div><dt>When I read it</dt><dd>{data.book.readingTime}</dd></div>
	</dl>
</Section>

<Section class="booknote-body">
	<article class="article">
		{#if data.markdown}
			<SvelteMarkdown source={data.markdown} />
		{:else}
			<p>{data.book.description}</p>
		{/if}
	</article>
</Section>

{#if data.related.length}
	<Section class="booknote-related">
		<h2 class="related-title">You Might Also Like...</h2>
		<ul class="related-list">
			{#each data.related as book}
				<li>
					<a href={`/booknotes/${book.slug}`}>
						<span class="related-book-title">{book.title}</span>
						<span class="related-book-author">{book.author}</span>
					</a>
				</li>
			{/each}
		</ul>
	</Section>
{/if}

<Section class="booknote-disclaimer" animate={false}>
	<p class="disclaimer">
		This is a book summary and may not reflect my attitudes or beliefs on certain topics. I'd love
		to hear <a href="/contact">your thoughts</a>.
	</p>
</Section>

<style lang="scss">
	:global(.section.booknote-hero) {
		padding-top: clamp(2.5rem, 5vw, 4rem);
		padding-bottom: clamp(2rem, 4vw, 3rem);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		min-height: 40vh;
	}

	.hero-text {
		display: grid;
		gap: 0.4rem;
		max-width: 36ch;
	}

	.hero-text h1 {
		font-size: clamp(2rem, 4.4vw, 3rem);
		line-height: 1.2;
		letter-spacing: -0.04em;
	}

	.hero-text h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.05rem, 1.6vw, 1.35rem);
		font-weight: 500;
		color: var(--color-subtle);
		letter-spacing: -0.01em;
		margin-top: 0.4rem;
	}

	.hero-cover img {
		width: clamp(180px, 22vw, 270px);
		height: auto;
		border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
		box-shadow:
			0 18px 38px rgb(36 37 37 / 0.18),
			0 4px 10px rgb(36 37 37 / 0.1);
	}

	:global(.section.book-bar) {
		padding: clamp(1.25rem, 2vw, 1.75rem) 0;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 2rem);
		margin: 0;
	}

	.facts > div {
		display: grid;
		gap: 0.3rem;
	}

	.facts dt {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.facts dd {
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 600;
		color: var(--color-heading);
		font-size: 0.98rem;
		line-height: 1.4;
	}

	.article {
		max-width: var(--size-prose);
		margin: 0 auto;
	}

	.article :global(h1) {
		font-size: clamp(1.75rem, 2.8vw, 2.25rem);
		letter-spacing: -0.035em;
		margin: 1.8rem 0 0.6rem;
	}

	.article :global(h2) {
		font-size: clamp(1.35rem, 2vw, 1.7rem);
		letter-spacing: -0.03em;
		margin: 1.8rem 0 0.5rem;
	}

	.article :global(h3) {
		font-size: clamp(1.08rem, 1.4vw, 1.22rem);
		margin: 1.4rem 0 0.4rem;
	}

	.article :global(p),
	.article :global(li) {
		font-size: clamp(1rem, 1vw, 1.06rem);
		line-height: 1.75;
	}

	.article :global(p) {
		margin: 0.95rem 0;
	}

	.article :global(ul),
	.article :global(ol) {
		padding-left: 1.25rem;
		margin: 0.95rem 0;
	}

	.article :global(li) {
		margin: 0.25rem 0;
	}

	.article :global(a) {
		text-decoration-color: var(--color-green);
	}

	.article :global(blockquote) {
		background: var(--color-muted);
		border-left: 3px solid var(--color-green);
		margin: 1rem 0;
		padding: 0.65rem 0.9rem;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		color: var(--color-subtle);
	}

	.article :global(blockquote p) {
		font-style: italic;
		margin: 0.25rem 0;
	}

	.article :global(hr) {
		border: 0;
		border-top: 1px solid var(--color-border);
		margin: 1.5rem 0;
	}

	.related-title {
		font-size: clamp(1.5rem, 2.4vw, 2rem);
		letter-spacing: -0.035em;
		margin-bottom: 1.25rem;
	}

	.related-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.65rem;
		max-width: 70ch;
	}

	.related-list a {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px dashed var(--color-border);
		text-decoration: none;
		transition: color var(--duration-fast) ease;
	}

	.related-list a:hover {
		color: var(--color-green);
	}

	.related-book-title {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 1rem;
		color: var(--color-heading);
	}

	.related-list a:hover .related-book-title {
		color: var(--color-green);
	}

	.related-book-author {
		font-size: 0.85rem;
		color: var(--color-subtle);
	}

	:global(.section.booknote-disclaimer) {
		padding-top: clamp(1.5rem, 3vw, 2.5rem);
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.disclaimer {
		max-width: 56ch;
		margin: 0 auto;
		text-align: center;
		font-size: 0.85rem;
		color: var(--color-subtle);
	}

	@media (max-width: 720px) {
		.hero {
			grid-template-columns: 1fr;
			justify-items: center;
			text-align: center;
		}

		.hero-text {
			justify-items: center;
		}

		.facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}

		.related-list a {
			justify-content: center;
		}
	}

	@media (max-width: 420px) {
		.facts {
			grid-template-columns: 1fr;
		}
	}
</style>
