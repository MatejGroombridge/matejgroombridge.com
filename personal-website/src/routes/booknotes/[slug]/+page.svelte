<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import BookCard from '$lib/components/site/BookCard.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Seo {...data.book.seo} canonical={`/booknotes/${data.book.slug}`} image={data.book.cover} />
<PageTitle eyebrow="Book Notes" title={data.book.title} body={`By ${data.book.author}`} />

<Section>
	<BlockHead title="At a glance" />
	<div class="book-meta">
		<img src={data.book.cover} alt="Cover of {data.book.title}" />
		<dl class="facts">
			<div><dt>Author</dt><dd>{data.book.author}</dd></div>
			<div><dt>Published</dt><dd>{data.book.published}</dd></div>
			<div><dt>My rating</dt><dd>{data.book.rating}</dd></div>
			<div><dt>When I read it</dt><dd>{data.book.readingTime}</dd></div>
		</dl>
	</div>
</Section>

<Section>
	<BlockHead title="Notes" />
	<Prose dropCap>
		{#if data.markdown}
			<SvelteMarkdown source={data.markdown} />
		{:else}
			<p>{data.book.description}</p>
		{/if}
	</Prose>
</Section>

{#if data.related.length}
	<Section>
		<BlockHead title="You might also like" />
		<div class="related">
			{#each data.related as book}
				<BookCard {book} />
			{/each}
		</div>
		<p class="disclaimer">
			This is a book summary and may not reflect my attitudes or beliefs on certain topics. I would
			love to hear <a href="/contact">your thoughts</a>.
		</p>
	</Section>
{/if}

<style lang="scss">
	.book-meta {
		display: grid;
		grid-template-columns: 140px minmax(0, 1fr);
		gap: 1.25rem;
		align-items: start;
	}

	.book-meta img {
		width: 140px;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-soft);
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0;
		margin: 0;
	}

	.facts > div {
		display: grid;
		gap: 0.15rem;
		padding: 0.55rem 0;
		border-bottom: 1px dashed var(--color-border);
	}

	.facts dt {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.facts dd {
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 600;
		color: var(--color-heading);
		font-size: 0.95rem;
	}

	.related {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
		gap: clamp(1.25rem, 2.5vw, 2rem) clamp(1rem, 2vw, 1.5rem);
	}

	.disclaimer {
		max-width: var(--size-prose);
		margin-top: 1.5rem;
		font-size: 0.85rem;
		color: var(--color-subtle);
	}

	@media (max-width: 640px) {
		.book-meta {
			grid-template-columns: 1fr;
			justify-items: center;
		}

		.disclaimer {
			margin-inline: auto;
		}
	}
</style>
