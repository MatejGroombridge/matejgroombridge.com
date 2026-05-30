<script lang="ts">
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import BookStack from '$lib/components/site/BookStack.svelte';
	import PolaroidCard from '$lib/components/site/PolaroidCard.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { articles, bookNotes, homeCurrently, homeIntro, homePage, photoTrips } from '$lib/content';

	const featuredArticles = articles.slice(0, 3);
	const featuredBooks = bookNotes.slice(0, 5);
	const bookPool = bookNotes;
	const tripOrder = ['centralwest24', 'goldcoast24', 'sydney25', 'southcoast24', 'space24'];
	const featuredTrips = tripOrder
		.map((slug) => photoTrips.find((t) => t.slug === slug))
		.filter((t): t is (typeof photoTrips)[number] => Boolean(t));

	const polaroidTilts = ['-7deg', '4deg', '-3deg', '6deg', '-2deg'];
	const polaroidOffsets = [
		{ x: '0rem', y: '0.6rem' },
		{ x: '-1.5rem', y: '-0.8rem' },
		{ x: '0.75rem', y: '1rem' },
		{ x: '-0.75rem', y: '-0.4rem' },
		{ x: '1rem', y: '0.5rem' }
	];
</script>

<Seo {...homePage.seo} canonical="/" />

<section class="hero hero-section" aria-labelledby="home-hero-title">
	<div class="hero-inner">
		<div class="hero-grid">
			<div class="hero-copy">
				<h1 id="home-hero-title">Hi, I'm<br />Matej.</h1>
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

<Section id="home-body" tone="muted">
	<BlockHead title="Right now" />
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

<Section>
	<BlockHead title="About">
		{#snippet aside()}
			<a href="/2026">See the 2026 page →</a>
		{/snippet}
	</BlockHead>
	<div class="about">
		<h2>{homeIntro.title}</h2>
		<p>{homeIntro.body}</p>
	</div>
</Section>

{#if featuredArticles.length}
	<Section tone="muted">
		<BlockHead title="Writing">
			{#snippet aside()}
				<a href="/writing">Read all →</a>
			{/snippet}
		</BlockHead>
		<p class="intro">
			Short essays on software, learning, and the things I keep thinking about.
		</p>
		<div class="writing-grid">
			{#each featuredArticles as article}
				<Card href={`/writing/${article.slug}`} class="writing-card">
					<span class="card-meta">{article.published}{article.readingTime ? ` · ${article.readingTime}` : ''}</span>
					<h3>{article.title}</h3>
					<p>{article.description}</p>
					<span class="card-cta">Read →</span>
				</Card>
			{/each}
		</div>
	</Section>
{/if}

<Section>
	<BlockHead title="Photography">
		{#snippet aside()}
			<a href="/photography">See all →</a>
		{/snippet}
	</BlockHead>
	<p class="intro">
		I love taking cool photos. From natural landscapes to bustling cities, here are a few of
		my favourite recent collections.
	</p>
	<div class="polaroid-grid">
		{#each featuredTrips as trip, i}
			<div
				class="slot"
				style="--rot: {polaroidTilts[i % polaroidTilts.length]}; --tx: {polaroidOffsets[
					i % polaroidOffsets.length
				].x}; --ty: {polaroidOffsets[i % polaroidOffsets.length].y};"
			>
				<PolaroidCard
					href={`/photography/${trip.slug}`}
					image={trip.coverImage}
					alt="{trip.title} cover"
					meta={String(trip.year)}
					caption={trip.title}
					subcaption={trip.subtitle}
					ratio="4 / 3"
				/>
			</div>
		{/each}
	</div>
</Section>

<Section tone="muted">
	<BlockHead title="Book Notes">
		{#snippet aside()}
			<a href="/booknotes">Read all →</a>
		{/snippet}
	</BlockHead>
	<p class="intro">
		I document key takeaways from books on lifestyle, philosophy and tech. Check out my
		summaries and reviews.
	</p>
	<BookStack books={featuredBooks} pool={bookPool} count={5} />
</Section>

<Section>
	<BlockHead title="More" />
	<div class="more-grid">
		<Card href="/2026" class="more-card">
			<span class="card-meta">Living page</span>
			<h3>2026</h3>
			<p>A running timeline of what I'm building, reading, and thinking about this year.</p>
			<span class="card-cta">Open the page →</span>
		</Card>
		<Card href="/contact" class="more-card">
			<span class="card-meta">Say hi</span>
			<h3>Get in touch</h3>
			<p>Have a question, a project, or just want to chat? Send me a note.</p>
			<span class="card-cta">Contact me →</span>
		</Card>
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
	}

	.intro {
		max-width: 620px;
		margin-bottom: 2.25rem;
		color: var(--color-subtle);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.writing-grid,
	.more-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 1rem;
	}

	.writing-grid :global(.writing-card),
	.more-grid :global(.more-card) {
		display: grid;
		gap: 0.55rem;
		align-content: start;
		transition: transform var(--duration-base) ease, box-shadow var(--duration-base) ease;
	}

	.writing-grid :global(.writing-card:hover),
	.more-grid :global(.more-card:hover) {
		transform: translateY(-3px);
		box-shadow: var(--shadow-soft);
	}

	.writing-grid :global(h3),
	.more-grid :global(h3) {
		font-size: 1.1rem;
		margin: 0;
	}

	.writing-grid :global(p),
	.more-grid :global(p) {
		color: var(--color-subtle);
		font-size: 0.94rem;
		line-height: 1.55;
		margin: 0;
	}

	.writing-grid :global(.card-meta),
	.more-grid :global(.card-meta) {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-green);
	}

	.writing-grid :global(.card-cta),
	.more-grid :global(.card-cta) {
		font-family: var(--font-heading);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-green);
		margin-top: 0.15rem;
	}

	.polaroid-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0;
		padding: 1.5rem 0.5rem 2.5rem;
	}

	.slot {
		flex: 0 0 auto;
		width: clamp(140px, 16vw, 180px);
		margin: 0 -1.75rem;
		transform: translate(var(--tx, 0), var(--ty, 0));
	}

	.slot:nth-child(1) { z-index: 1; }
	.slot:nth-child(2) { z-index: 2; }
	.slot:nth-child(3) { z-index: 3; }
	.slot:nth-child(4) { z-index: 2; }
	.slot:nth-child(5) { z-index: 1; }

	.slot :global(.polaroid) {
		--rotate: var(--rot, 0deg);
	}

	@media (max-width: 820px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 1.75rem;
			text-align: center;
			justify-items: center;
		}

		.hero-copy {
			justify-items: center;
		}

		.hero-body {
			margin-inline: auto;
		}

		.hero-ctas {
			justify-content: center;
		}

		.hero-portrait {
			order: -1;
			justify-self: center;
			width: min(220px, 60vw);
		}

		.currently-item {
			justify-content: center;
		}

		.about {
			margin-inline: auto;
		}
	}

	@media (max-width: 620px) {
		.intro {
			margin-inline: auto;
		}

		.polaroid-grid {
			padding: 1rem 0 1.5rem;
		}

		.slot {
			width: clamp(120px, 32vw, 160px);
			margin: 0 -1rem;
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
