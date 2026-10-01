<script lang="ts">
	import ArticleContents from '$lib/components/site/ArticleContents.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import LongForm from '$lib/components/ui/LongForm.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { mediaPolicyPage } from '$lib/content/pages';
	import Body from '$lib/content/media-policy.md';

	const sections = [...mediaPolicyPage.contents];

	let activeSection = $state<string | null>(null);

	function trackActiveSection() {
		let current: string | null = null;
		for (const section of sections) {
			const el = document.getElementById(section.id);
			if (el && el.getBoundingClientRect().top <= 140) current = section.id;
		}
		activeSection = current;
	}
</script>

<svelte:window onscroll={trackActiveSection} />

<Seo {...mediaPolicyPage.seo} canonical="/media-policy" />

<!-- Laid out like an article (see writing/[slug]), minus the toolbar and the
     closing sections, so the contents always show. The copy is authored with its casing in mind, so it
     opts out of lowercase mode. -->
<LongForm>
	<Section animate={false} class="article-hero">
		<header class="hero">
			<div class="hero-text">
				<h1 data-preserve-case>{mediaPolicyPage.hero.title}</h1>
				<p class="standfirst" data-preserve-case>{mediaPolicyPage.hero.body}</p>
				<p class="byline" data-preserve-case>
					<span>last updated {mediaPolicyPage.updated}</span>
					<span class="dot" aria-hidden="true">·</span>
					<span>{mediaPolicyPage.readingTime}</span>
				</p>
			</div>
		</header>
	</Section>

	<Section animate={false} class="article-body article-body-last">
		<div class="contents-inline">
			<ArticleContents {sections} activeId={activeSection} />
		</div>

		<article class="body" data-preserve-case>
			<Prose>
				<Body />
			</Prose>
		</article>
	</Section>
</LongForm>

<style lang="scss">
	// Matches the article hero in writing/[slug]/+page.svelte, which carries the
	// reasoning behind each of these.
	:global(.section.article-hero) {
		padding-top: clamp(3.25rem, 8vw, 6.5rem);
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
	}

	.contents-inline,
	.body {
		max-width: var(--size-prose);
		margin-inline: auto;
	}

	.hero {
		display: grid;
		gap: 1.25rem;
		align-items: center;
	}

	.hero-text {
		display: grid;
		gap: 0.85rem;
		justify-items: start;
		align-content: center;
		max-width: 640px;
		min-width: 0;
	}

	.hero-text h1 {
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		font-size: clamp(2.4rem, 5vw, 3.4rem);
		line-height: 1.15;
		letter-spacing: -0.025em;
		margin: 0;
	}

	.standfirst {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.2vw, 1.08rem);
		font-weight: 400;
		color: var(--color-subtle);
		line-height: 1.6;
		max-width: 580px;
		margin: 0;
	}

	.byline {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.4rem;
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-ink);
	}

	.dot {
		color: var(--color-green);
	}

	:global(.section.article-body) {
		padding-top: clamp(2.5rem, 5vw, 3.75rem);
		padding-bottom: clamp(0.75rem, 1.5vw, 1.25rem);
	}

	:global(.section.article-body-last) {
		padding-bottom: clamp(3.5rem, 7vw, 5.5rem);
	}

	.contents-inline {
		margin-bottom: clamp(2rem, 4vw, 2.75rem);
		text-align: left;
	}

	@media (max-width: 720px) {
		.hero {
			grid-template-columns: 1fr;
			justify-items: center;
		}

		.hero-text {
			justify-items: center;
		}

		.byline {
			justify-content: center;
		}
	}
</style>
