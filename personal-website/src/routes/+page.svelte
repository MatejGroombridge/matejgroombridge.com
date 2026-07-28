<script lang="ts">
	import { onMount } from 'svelte';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import BookStack from '$lib/components/site/BookStack.svelte';
	import ContactForm from '$lib/components/site/ContactForm.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import TripGallery from '$lib/components/site/TripGallery.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import {
		articles,
		bookNotes,
		contactForm,
		homeCurrently,
		homeIntro,
		homeMoreCards,
		homePage,
		homeSections,
		photoTrips
	} from '$lib/content';

	const featuredArticles = articles.slice(0, 3).map((article, index) => ({
		...article,
		number: articles.length - index
	}));
	const featuredBooks = bookNotes.slice(0, 5);
	const bookPool = bookNotes;

	function shuffled<T>(arr: readonly T[]): T[] {
		const next = [...arr];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
		return next;
	}

	// Deterministic on first render so SSR output matches the client's initial
	// hydration pass — randomizing here would shuffle differently on the server
	// vs. the client and scramble the keyed masonry layout during hydration.
	// svelte-ignore state_referenced_locally
	let featuredTrips = $state(photoTrips.slice(0, 8));

	onMount(() => {
		featuredTrips = shuffled(photoTrips).slice(0, 8);
	});
</script>

<Seo {...homePage.seo} canonical="/" />

<section class="hero hero-section" aria-labelledby="home-hero-title">
	<div class="hero-inner">
		<div class="hero-grid">
			<div class="hero-copy">
				<h1 id="home-hero-title"><span data-preserve-case>Hi</span>{homePage.hero.title.slice(2)}</h1>
				<p class="hero-body">{homePage.hero.body}</p>
				<div class="hero-ctas">
					{#each homePage.hero.ctas as cta}
						<Button href={cta.href} variant={'variant' in cta ? cta.variant : undefined}
							>{cta.label}</Button
						>
					{/each}
				</div>
			</div>
			<div class="hero-portrait">
				<img
					src={homePage.hero.image.src}
					alt={homePage.hero.image.alt}
					width="320"
					height="400"
					loading="eager"
				/>
			</div>
		</div>
	</div>
</section>

{#if false}
<Section id="home-body" tone="muted">
	<BlockHead title={homeSections.currently.title} />
	<div class="currently">
		{#each homeCurrently as item}
			<div class="currently-item">
				<span class="currently-icon material-symbols-rounded" aria-hidden="true">{item.icon}</span>
				<div class="currently-text">
					<span class="currently-label">{item.label}</span>
					<span class="currently-value">{item.value}</span>
				</div>
			</div>
		{/each}
	</div>
</Section>
{/if}

<Section tone="muted">
	<BlockHead title={homeSections.about.title}>
		{#snippet aside()}
			<a class="aside-link" href={homeSections.about.asideHref}>
				<span class="label">{homeSections.about.asideLabel}</span>
				<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
			</a>
		{/snippet}
	</BlockHead>
	<div class="about">
		<h2>{homeIntro.title}</h2>
		<p>{homeIntro.body}</p>
	</div>
</Section>

{#if false && featuredArticles.length}
	<Section tone="muted">
		<BlockHead title={homeSections.writing.title}>
			{#snippet aside()}
				<a class="aside-link" href={homeSections.writing.asideHref}>
					<span class="label">{homeSections.writing.asideLabel}</span>
					<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
				</a>
			{/snippet}
		</BlockHead>
		<p class="intro">{homeSections.writing.intro}</p>
		<ul class="articles">
			{#each featuredArticles as article (article.slug)}
				<li>
					<a class="row" href={`/writing/${article.slug}`}>
						<span class="number">#{article.number}</span>
						<span class="title">{article.title}</span>
						<span class="meta"
							>{article.published}{article.readingTime ? ` · ${article.readingTime}` : ''}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	</Section>
{/if}

<Section>
	<BlockHead title={homeSections.photography.title}>
		{#snippet aside()}
			<a class="aside-link" href={homeSections.photography.asideHref}>
				<span class="label">{homeSections.photography.asideLabel}</span>
				<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
			</a>
		{/snippet}
	</BlockHead>
	<p class="intro">{homeSections.photography.intro}</p>
	<div class="gallery-fade">
		<TripGallery trips={featuredTrips} gap={15} maxColumnWidth={220} minColumns={2} />
	</div>
</Section>

<Section tone="muted">
	<BlockHead title={homeSections.booknotes.title}>
		{#snippet aside()}
			<a class="aside-link" href={homeSections.booknotes.asideHref}>
				<span class="label">{homeSections.booknotes.asideLabel}</span>
				<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
			</a>
		{/snippet}
	</BlockHead>
	<p class="intro">{homeSections.booknotes.intro}</p>
	<div class="shelf-fade">
		<BookStack books={featuredBooks} pool={bookPool} count={5} />
	</div>
</Section>

{#if false}
	<Section>
		<BlockHead title={homeSections.more.title} />
		<div class="more-grid">
			{#each homeMoreCards as card}
				<Card href={card.href} class="more-card">
					<h3>{card.title}</h3>
					<p>{card.body}</p>
					<span class="card-cta">
						{card.cta}
						<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
					</span>
				</Card>
			{/each}
		</div>
	</Section>
{/if}

<Section id="contact">
	<BlockHead title={homeSections.contact.title}>
		{#snippet aside()}
			<a class="aside-link" href={homeSections.contact.asideHref}>
				<span class="label">{homeSections.contact.asideLabel}</span>
				<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
			</a>
		{/snippet}
	</BlockHead>
	<div class="contact-grid">
		<div class="contact-details">
			<p>{homeSections.contact.intro}</p>
		</div>
		<ContactForm definition={contactForm} />
	</div>
</Section>

<style lang="scss">
	.hero {
		padding: clamp(2.5rem, 6vw, 4.75rem) 0 clamp(1.5rem, 4vw, 3rem);
	}

	.hero-inner {
		width: var(--size-page);
		margin-inline: auto;
		position: relative;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
		gap: clamp(1.5rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: grid;
		gap: 1.1rem;
		max-width: 560px;
	}

	.hero-copy h1 {
		font-size: clamp(2.75rem, 7.2vw, 5.25rem);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.045em;
		margin: 0;
		white-space: pre-line;
	}

	.hero-body {
		font-size: clamp(1.05rem, 1.45vw, 1.2rem);
		line-height: 1.65;
		color: var(--color-subtle);
		max-width: 38ch;
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 0.4rem;
	}

	.hero-portrait {
		justify-self: end;
		width: min(320px, 100%);
	}

	.hero-portrait img {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-soft);
	}

	.currently {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem 1.5rem;
	}

	.currently-item {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		padding: 0.5rem 0;
	}

	.currently-icon {
		font-size: 1.4rem;
		color: var(--color-green);
		flex: 0 0 auto;
		margin-top: 0.1rem;
	}

	.currently-text {
		display: grid;
		gap: 0.15rem;
		min-width: 0;
	}

	.currently-label {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.currently-value {
		font-family: var(--font-heading);
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--color-heading);
		line-height: 1.35;
	}

	.about {
		display: grid;
		gap: 0.85rem;
		max-width: 60ch;
	}

	.about h2 {
		font-size: clamp(1.4rem, 2.4vw, 1.95rem);
		margin: 0;
	}

	.about p {
		color: var(--color-subtle);
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		line-height: 1.65;
	}

	.intro {
		max-width: 620px;
		margin-bottom: 2.25rem;
		color: var(--color-subtle);
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		line-height: 1.65;
	}

	.more-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 1rem;
	}

	.more-grid :global(.more-card) {
		display: grid;
		gap: 0.55rem;
		align-content: start;
		transition: transform var(--duration-base) ease, box-shadow var(--duration-base) ease;
	}

	.more-grid :global(.more-card:hover) {
		transform: translateY(-3px);
		box-shadow: var(--shadow-soft);
	}

	.more-grid :global(h3) {
		font-size: 1.1rem;
		margin: 0;
	}

	.more-grid :global(p) {
		color: var(--color-subtle);
		font-size: 0.94rem;
		line-height: 1.55;
		margin: 0;
	}

	.more-grid :global(.card-cta) {
		font-family: var(--font-heading);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-green);
		margin-top: 0.15rem;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.more-grid :global(.card-cta .material-symbols-rounded) {
		font-size: 1rem;
		transition: transform var(--duration-fast) ease;
	}

	.more-grid :global(.more-card:hover .card-cta .material-symbols-rounded) {
		transform: translateX(3px);
	}

	.articles {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.articles li {
		border-bottom: 1px dashed var(--color-border);
	}

	.articles li:last-child {
		border-bottom: none;
	}

	.row {
		--row-gap: 1rem;
		display: grid;
		grid-template-columns: 4.25rem 1fr auto;
		gap: var(--row-gap);
		align-items: baseline;
		padding: 0.95rem 0.25rem;
		text-decoration: none;
		color: inherit;
		transition: background-color 0.15s ease;
	}

	.row:hover,
	.row:focus-visible {
		background: var(--color-muted);
		outline: none;
	}

	.number {
		position: relative;
		font-family: var(--font-heading);
		font-variant-numeric: tabular-nums;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: lowercase;
		color: var(--color-subtle);
	}

	.number::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: calc(var(--row-gap) / -2);
		width: 1px;
		background: var(--color-border);
	}

	.title {
		color: var(--color-heading);
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		font-weight: 500;
	}

	.row .meta {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-subtle);
		white-space: nowrap;
	}

	.aside-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		text-decoration: none;
	}

	// BlockHead's shared `.aside :global(a:hover)` rule underlines the whole
	// anchor (including the icon glyph) and, since it targets the bare `a`
	// element, it out-specifies a same-weight class selector here. Scope through
	// `.aside` too so this reset wins instead of relying on source order.
	:global(.aside) .aside-link:hover {
		text-decoration: none;
	}

	.aside-link:hover .label {
		text-decoration: underline;
	}

	.aside-link .material-symbols-rounded {
		font-size: 1rem;
		transition: transform var(--duration-fast) ease;
	}

	.aside-link:hover .material-symbols-rounded {
		transform: translateX(3px);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 0.75fr 1.25fr;
		gap: clamp(1.75rem, 4.5vw, 3.75rem);
		align-items: start;
	}

	.contact-details {
		display: grid;
		gap: 0.6rem;
		align-content: start;
	}

	.contact-details p {
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		color: var(--color-subtle);
		line-height: 1.65;
		margin: 0;
	}

	.gallery-fade {
		position: relative;
		max-height: clamp(260px, 32vw, 340px);
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
	}

	// Full covers stay solid; only the caption fades — the shelf wraps to a
	// single row at 4 books, so there's no extra content to tease/hide here.
	.shelf-fade {
		position: relative;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
	}

	// Below this the shelf wraps to two rows, so switch to the same
	// crop-and-tease treatment the mobile view already uses.
	@media (max-width: 760px) {
		.shelf-fade {
			max-height: clamp(280px, 78vw, 340px);
			-webkit-mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
			mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
		}
	}

	@media (max-width: 820px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 1.1rem;
			text-align: center;
			justify-items: center;
		}

		// Flatten the copy block so the portrait can be ordered between the blurb
		// and the CTAs rather than sitting above the heading.
		.hero-copy {
			display: contents;
		}

		.hero-copy h1 {
			order: 1;
		}

		.hero-body {
			order: 2;
			margin-inline: auto;
		}

		.hero-portrait {
			order: 3;
			justify-self: center;
			width: min(220px, 60vw);
			margin-block: 0.35rem;
		}

		.hero-ctas {
			order: 4;
			justify-content: center;
		}

		.currently-item {
			justify-content: center;
		}

		.about {
			margin-inline: auto;
		}
	}

	@media (max-width: 800px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 620px) {
		.intro {
			margin-inline: auto;
		}

		.gallery-fade {
			max-height: clamp(300px, 85vw, 360px);
		}

		.row {
			--row-gap: 0.75rem;
			grid-template-columns: 3rem 1fr;
		}

		.row .meta {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.hero-ctas {
			width: 100%;
			justify-content: center;
		}

		.hero-ctas :global(.button) {
			flex: 0 0 auto;
		}
	}
</style>
