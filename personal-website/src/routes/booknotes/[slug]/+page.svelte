<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import LongForm from '$lib/components/ui/LongForm.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import BookNoteHeading from '$lib/components/site/BookNoteHeading.svelte';
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
		<div>
			<dt>Author</dt>
			<dd>{data.book.author}</dd>
		</div>
		<div>
			<dt>Published</dt>
			<dd>{data.book.published}</dd>
		</div>
		<div>
			<dt>My Rating</dt>
			<dd>{data.book.rating}</dd>
		</div>
		<div>
			<dt>When I read it</dt>
			<dd>{data.book.readingTime}</dd>
		</div>
	</dl>
</Section>

<!--
	Everything from here down reads like an essay: LongForm supplies the face,
	scale and pull quotes the writing pages use. Notes are written in sentence
	case, so `data-preserve-case` renders them as written rather than lowercased.
-->
<LongForm>
	<Section class="booknote-body" animate={false}>
		<article class="body" data-preserve-case>
			<Prose>
				{#if data.markdown}
					<SvelteMarkdown source={data.markdown} renderers={{ heading: BookNoteHeading }} />
				{:else}
					<p>{data.book.description}</p>
				{/if}
			</Prose>
		</article>
	</Section>

	{#if data.related.length}
		<Section class="booknote-related" animate={false}>
			<div class="column notes-end">
				<h2 class="related-title">more book notes</h2>
				<ul class="related-list">
					{#each data.related as book (book.slug)}
						<li>
							<a href={`/booknotes/${book.slug}`}>
								<span class="related-book-title" data-preserve-case>{book.title}</span>
								<span class="related-book-author" data-preserve-case>{book.author}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</Section>
	{/if}

	<Section class="booknote-disclaimer" animate={false}>
		<div class="column">
			<p class="disclaimer">
				This is a book summary and not a reflection of my beliefs. Newer notes are
				<a href="/media-policy#iii">drafted with AI</a> from my own highlights and impressions. I'd
				love to hear <a href="/contact">your thoughts</a>.
			</p>
		</div>
	</Section>
</LongForm>

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

	// Page title, so it matches the Fraunces `h1` every PageTitle route renders.
	.hero-text h1 {
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		font-size: clamp(2rem, 4.4vw, 3rem);
		line-height: 1.2;
		letter-spacing: -0.025em;
	}

	// "By {author}" reads as a sentence, not a label.
	.hero-text h2 {
		font-family: var(--font-body);
		font-size: clamp(1.05rem, 1.6vw, 1.35rem);
		font-weight: 400;
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
		font-family: var(--font-ui);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.facts dd {
		margin: 0;
		font-family: var(--font-body);
		font-weight: 600;
		color: var(--color-heading);
		font-size: 0.98rem;
		line-height: 1.4;
	}

	// The body, related list and disclaimer share the reading column, like the
	// essay pages.
	.body,
	.column {
		max-width: var(--size-prose);
		margin-inline: auto;
	}

	:global(.section.booknote-body) {
		padding-top: clamp(2.5rem, 5vw, 3.75rem);
		padding-bottom: clamp(0.75rem, 1.5vw, 1.25rem);
	}

	// The note's own sections ("The Book in 3 Sentences", "Top Quotes",
	// "Summary, Quotes & Notes") match the essays' roman-numeral markers.
	.body :global(.prose h1),
	.body :global(.prose h2) {
		font-size: clamp(1.6rem, 2.4vw, 2rem);
		margin-top: 2.75rem;
	}

	// Inside the notes, chapters run far more often, so they step down to the
	// essay's h3 size and their sub-headings to its h4.
	.body :global(.prose h1 ~ h2) {
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
		margin-top: 2.25rem;
	}

	// A chapter that is only a numeral ("IV") is one to four characters, so it
	// can carry the essays' section-marker size without shouting — and where a
	// book's parts are bare numerals over named chapters (Zarathustra), the size
	// gap makes the structure readable. Nested numerals (h3) stay small.
	.body :global(.prose h1 ~ h2.bare-numeral) {
		font-size: clamp(1.6rem, 2.4vw, 2rem);
		margin-top: 2.75rem;
	}

	.body :global(.prose h3) {
		font-size: clamp(1.15rem, 1.4vw, 1.25rem);
		margin-top: 1.75rem;
	}

	// A heading's top margin separates it from the text above. When it follows
	// another heading directly ("Summary, Quotes & Notes" then "I", or a part
	// then its first chapter) the two belong together, so they sit close.
	// `article`/`div` lift this above the size-specific margins above.
	article.body :global(div.prose :is(h1, h2, h3) + :is(h2, h3, .bare-numeral)) {
		margin-top: 1.1rem;
	}

	// The body renders as written, but its headings follow the site's lowercase
	// mode the way the essays' headings do. `!important` is needed to get past
	// the preserve-case opt-out on the article, which is itself `!important`.
	:global(:root[data-case='lower']) article.body :global(.prose :is(h1, h2, h3, h4)) {
		text-transform: lowercase !important;
	}

	// Quotes keep the notes' own treatment — set off by a green rule in the
	// reading colour — rather than the essays' centred pull quote. `article`
	// lifts these above LongForm's blockquote rules, which match them otherwise.
	article.body :global(.prose blockquote) {
		display: block;
		max-width: none;
		margin: 1.25rem 0;
		padding: 0.1rem 0 0.1rem 1rem;
		background: none;
		border-left: 3px solid var(--color-green);
		text-align: left;
		font-family: var(--font-prose);
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
		font-weight: 400;
		font-variation-settings: normal;
		line-height: 1.7;
		color: var(--color-ink);
	}

	article.body :global(.prose blockquote p) {
		margin: 0;
		font-style: italic;
	}

	article.body :global(.prose blockquote p:first-of-type)::before,
	article.body :global(.prose blockquote p:last-of-type)::after {
		content: none;
	}

	// Closing sections are headed exactly like the essays' closing run.
	.related-title {
		margin: 0 0 1.1rem;
		font-family: var(--font-ui);
		font-weight: 700;
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
		letter-spacing: -0.03em;
		line-height: 1.25;
		color: var(--color-heading);
	}

	.related-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.1rem;
	}

	.related-list a {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem 1.5rem;
		padding: 0.5rem 0;
		text-decoration: none;
		transition: color var(--duration-fast) ease;
	}

	.related-list a:hover {
		color: var(--color-green);
	}

	.related-book-title {
		font-family: var(--font-prose);
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
		font-weight: 500;
		line-height: 1.4;
		color: var(--color-heading);
	}

	.related-list a:hover .related-book-title {
		color: var(--color-green);
	}

	.related-book-author {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-subtle);
	}

	:global(.section.booknote-related) {
		padding: 0;
	}

	// Whatever ends the notes (a paragraph, a quote) shouldn't add its own margin
	// to the measured gap above the rule.
	.body :global(.prose > :last-child) {
		margin-bottom: 0;
	}

	// Where the notes end, the same rule and run-up the essays draw above their
	// footnotes: 3.5-5.5rem from the last line (less the body section's own
	// bottom padding, which already sits in that gap), then the rule.
	.notes-end {
		margin-top: calc(clamp(3.5rem, 7vw, 5.5rem) - clamp(0.75rem, 1.5vw, 1.25rem));
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	:global(.section.booknote-disclaimer) {
		padding-top: clamp(1.75rem, 3.5vw, 2.5rem);
		padding-bottom: clamp(3.5rem, 7vw, 5.5rem);
	}

	// Narrower than the reading column so it reads as a footnote to the page.
	.disclaimer {
		max-width: 30rem;
		margin-inline: auto;
		text-align: center;
		text-wrap: balance;
		font-size: 0.85rem;
		line-height: 1.6;
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

	// Long-form copy keeps a flush left edge on narrow screens (see LongForm);
	// the closing run follows it so the two line up.
	@media (max-width: 640px) {
		.column {
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.related-list a {
			transition: none;
		}
	}

	@media (max-width: 420px) {
		.facts {
			grid-template-columns: 1fr;
		}
	}
</style>
