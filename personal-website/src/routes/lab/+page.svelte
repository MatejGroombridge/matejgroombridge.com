<script lang="ts">
	// ---------------------------------------------------------------------------
	// TEMPORARY design-concept sandbox.
	//
	// This whole route is disposable: nothing outside `src/routes/lab/` imports
	// from it, and deleting the folder (plus the `matter-js` dependency, if the
	// physics concept is not kept) removes it completely.
	// ---------------------------------------------------------------------------
	import { onMount } from 'svelte';
	import './lab.scss';

	import ConceptFrame from './concepts/ConceptFrame.svelte';
	import AuroraHero from './concepts/AuroraHero.svelte';
	import Bookshelf from './concepts/Bookshelf.svelte';
	import CommandPalette from './concepts/CommandPalette.svelte';
	import Constellation from './concepts/Constellation.svelte';
	import ContactSheet from './concepts/ContactSheet.svelte';
	import ElasticNav from './concepts/ElasticNav.svelte';
	import HorizontalRail from './concepts/HorizontalRail.svelte';
	import HoverPreviewList from './concepts/HoverPreviewList.svelte';
	import KineticMasthead from './concepts/KineticMasthead.svelte';
	import Marginalia from './concepts/Marginalia.svelte';
	import MegaFooter from './concepts/MegaFooter.svelte';
	import PhotoDeck from './concepts/PhotoDeck.svelte';
	import PhysicsTags from './concepts/PhysicsTags.svelte';
	import ReactionBar from './concepts/ReactionBar.svelte';
	import ScrollTimeline from './concepts/ScrollTimeline.svelte';
	import SpotlightGrid from './concepts/SpotlightGrid.svelte';
	import StatsStrip from './concepts/StatsStrip.svelte';
	import StatusOrb from './concepts/StatusOrb.svelte';
	import TextTreatments from './concepts/TextTreatments.svelte';
	import ThemeStudio from './concepts/ThemeStudio.svelte';
	import VelocityTicker from './concepts/VelocityTicker.svelte';
	import YearGrid from './concepts/YearGrid.svelte';

	type ConceptMeta = {
		id: string;
		title: string;
		tagline: string;
		slot: string;
		tags: string[];
	};

	// Single source of truth for the index rail, the section headers and the
	// numbering — so nothing can drift out of sync as concepts are cut.
	const concepts: ConceptMeta[] = [
		{
			id: 'kinetic-masthead',
			title: 'Kinetic masthead',
			tagline:
				'The name is set in a variable font and every glyph reacts to the cursor — weight, optical size and softness all move at once.',
			slot: 'home hero',
			tags: ['variable font', 'pointer', 'rAF']
		},
		{
			id: 'aurora-hero',
			title: 'Aurora hero',
			tagline:
				'A quarter-resolution canvas of drifting colour, blurred into a gradient field, with film grain over the top. Reads the theme, pauses off-screen.',
			slot: 'home hero',
			tags: ['canvas', 'theme-aware', 'grain']
		},
		{
			id: 'command-palette',
			title: 'Command palette',
			tagline:
				'⌘K opens one fuzzy index over every page, book note, trip and site action. The most useful thing on this page.',
			slot: 'site-wide',
			tags: ['⌘K', 'fuzzy search', 'keyboard']
		},
		{
			id: 'stats-strip',
			title: 'Counting stats',
			tagline:
				'Numbers count up once when the strip is scrolled into view, each with a sparkline derived from the real data behind it.',
			slot: 'about / home',
			tags: ['count-up', 'sparkline']
		},
		{
			id: 'spotlight-grid',
			title: 'Spotlight grid',
			tagline:
				'One shared torch follows the cursor across the whole grid while each card lights its own gradient border by proximity.',
			slot: 'home index',
			tags: ['mask border', 'proximity']
		},
		{
			id: 'velocity-ticker',
			title: 'Velocity ticker',
			tagline:
				'A two-lane marquee whose speed, skew and font weight are all driven by how fast you are scrolling.',
			slot: 'section divider',
			tags: ['scroll velocity', 'variable font']
		},
		{
			id: 'text-treatments',
			title: 'Three text treatments',
			tagline:
				'A decode scramble, a hand-drawn marker highlight that draws itself, and a word-by-word focus pull.',
			slot: 'headings',
			tags: ['scramble', 'svg', 'stagger']
		},
		{
			id: 'elastic-nav',
			title: 'Elastic segmented nav',
			tagline:
				'The indicator is driven by a spring, not a transition — it squashes along its travel and leans toward whatever you hover.',
			slot: 'filters / nav',
			tags: ['spring', 'squash & stretch']
		},
		{
			id: 'hover-preview-list',
			title: 'Hover-preview index',
			tagline:
				'A dense text index where the cover trails the cursor with lag and tilt, and every other row recedes.',
			slot: 'book notes index',
			tags: ['cursor follow', 'dimming']
		},
		{
			id: 'bookshelf',
			title: '3D bookshelf',
			tagline:
				'Real spines standing on a real shelf in CSS 3D. Hover pulls a book out and turns it to face you; drag to pan the shelf.',
			slot: 'book notes',
			tags: ['css 3d', 'drag']
		},
		{
			id: 'contact-sheet',
			title: 'Film contact sheet',
			tagline:
				'Each trip is a strip of 35mm. Sweeping across a frame scrubs through the roll, frame counter and all.',
			slot: 'photography index',
			tags: ['scrub', 'film']
		},
		{
			id: 'photo-deck',
			title: 'Throwable photo deck',
			tagline:
				'A physical card stack. Drag past the threshold to throw a photo away and reveal the next.',
			slot: 'photography',
			tags: ['drag', 'stack']
		},
		{
			id: 'horizontal-rail',
			title: 'Pinned horizontal story',
			tagline:
				'The section pins to the viewport and scrolls sideways as you scroll down — five panels of process, then an exit.',
			slot: 'about / process',
			tags: ['scroll pinning', 'parallax']
		},
		{
			id: 'scroll-timeline',
			title: 'Scroll-driven log',
			tagline:
				'Uses native CSS scroll-driven animations where the browser supports them, and falls back to the existing reveal action where it does not.',
			slot: '2026 page',
			tags: ['animation-timeline', 'progressive']
		},
		{
			id: 'year-grid',
			title: 'The year in days',
			tagline:
				'365 cells, days elapsed filled, logged moments ringed, today pulsing. Hover for the day.',
			slot: '2026 page',
			tags: ['heatmap', 'deterministic']
		},
		{
			id: 'status-orb',
			title: 'Live status card',
			tagline:
				'Melbourne time to the second, real sunrise and sunset from a solar calculation, and a rotating “currently” line.',
			slot: 'home / about',
			tags: ['live clock', 'solar math']
		},
		{
			id: 'constellation',
			title: 'Interest constellation',
			tagline:
				'A force-directed map of what connects to what. Nodes repel, links spring, the cursor pushes them around, hovering isolates a neighbourhood.',
			slot: 'about / colophon',
			tags: ['canvas', 'force graph']
		},
		{
			id: 'physics-tags',
			title: 'Physics tag pile',
			tagline:
				'Real rigid-body physics via matter-js. Throw the tags around, flip gravity, drop them again.',
			slot: 'about',
			tags: ['matter-js', 'ragdoll']
		},
		{
			id: 'marginalia',
			title: 'Marginalia reader',
			tagline:
				'Margin notes pinned to their paragraphs, inline footnotes, a progress ring, and a focus mode that dims everything but the line you are on.',
			slot: 'writing',
			tags: ['reading', 'focus mode']
		},
		{
			id: 'reaction-bar',
			title: 'Reaction bar',
			tagline:
				'Tap to react, hold to spray confetti. Cheap feedback that does not need an account.',
			slot: 'writing / photos',
			tags: ['particles', 'micro-interaction']
		},
		{
			id: 'theme-studio',
			title: 'Theme studio',
			tagline:
				'Four sliders generate an entire oklch palette and rewrite the live custom properties on <html>. Switch it on and the real header retints.',
			slot: 'footer / easter egg',
			tags: ['oklch', 'css vars', 'live']
		},
		{
			id: 'mega-footer',
			title: 'Mega wordmark footer',
			tagline:
				'The name, clipped by the page edge, filled with a photograph, rising into place as you reach the bottom.',
			slot: 'footer',
			tags: ['background-clip', 'parallax']
		}
	];

	function frame(id: string) {
		const index = concepts.findIndex((concept) => concept.id === id);
		return { ...concepts[index], index: index + 1 };
	}

	let active = $state(concepts[0].id);
	let scrolled = $state(0);

	onMount(() => {
		// Scroll spy: the band between 25% and 60% of the viewport decides which
		// concept the index rail highlights.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && entry.target.id) active = entry.target.id;
				}
			},
			{ rootMargin: '-25% 0px -40% 0px', threshold: 0 }
		);

		for (const concept of concepts) {
			const el = document.getElementById(concept.id);
			if (el) observer.observe(el);
		}

		let raf = 0;
		function update() {
			raf = 0;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			scrolled = max > 0 ? window.scrollY / max : 0;
		}
		function onScroll() {
			if (!raf) raf = requestAnimationFrame(update);
		}
		update();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:head>
	<title>Design lab | Matej Groombridge</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content="A temporary sandbox of design concepts." />
</svelte:head>

<div class="lab">
	<div class="page-progress" aria-hidden="true">
		<span style={`transform:scaleX(${scrolled})`}></span>
	</div>

	<header class="masthead">
		<div class="masthead-inner">
			<span class="lab-chip" data-tone="accent">temporary · /lab</span>
			<h1 data-preserve-case>Design lab</h1>
			<p class="blurb">
				{concepts.length} self-contained concepts for the site — each one live, not a screenshot. Nothing
				here is wired into the real pages, and the whole thing is one folder to delete. Keep what you
				like, bin the rest.
			</p>
			<p class="blurb small">
				Try <kbd data-preserve-case>⌘K</kbd> anywhere on this page, and flip the site into dark mode with
				the header toggle — everything below is built for both.
			</p>
			<a class="sibling" href="/lab/chrome">
				<span class="lab-mono sibling-label">also in the lab</span>
				<span class="sibling-title" data-preserve-case>Headers &amp; footers →</span>
				<span class="sibling-note">Ten of each, with a working width switcher.</span>
			</a>
		</div>
	</header>

	<div class="layout">
		<nav class="rail" aria-label="Concept index">
			<span class="rail-title lab-mono">index</span>
			<ol>
				{#each concepts as concept, i (concept.id)}
					<li>
						<a href={`#${concept.id}`} class:on={active === concept.id}>
							<span class="rail-num lab-mono">{String(i + 1).padStart(2, '0')}</span>
							<span class="rail-label">{concept.title}</span>
						</a>
					</li>
				{/each}
			</ol>
		</nav>

		<div class="stream">
			<ConceptFrame {...frame('kinetic-masthead')} bleed>
				<KineticMasthead />
				{#snippet notes()}
					<p>
						One custom property per glyph does all the work, so the browser animates
						<code>font-variation-settings</code> and nothing else. Falls back to a slow travelling wave
						when there is no pointer, and to a static weight under reduced motion.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('aurora-hero')} bleed>
				<AuroraHero />
				{#snippet notes()}
					<p>
						The canvas is a sixteenth of the pixels it appears to be — a heavy CSS blur turns six
						cheap radial fills into a gradient mesh. It reads the palette out of the CSS variables,
						so it retints itself in dark mode and after the theme studio below has been used.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('command-palette')}>
				<CommandPalette />
				{#snippet notes()}
					<p>
						The index is built from the same content modules the pages use, so it never goes stale.
						Scoring rewards matches at word starts and runs of adjacent characters, which is why
						<code>btr</code> finds <em>Born To Run</em> before anything else.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('stats-strip')}>
				<StatsStrip />
			</ConceptFrame>

			<ConceptFrame {...frame('spotlight-grid')} bleed>
				<SpotlightGrid />
				{#snippet notes()}
					<p>
						Card rectangles are measured once and cached, so moving the cursor costs one layout read
						for the whole grid rather than one per card. On touch devices the torch is dropped and
						the cards settle at a fixed glow.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('velocity-ticker')} bleed>
				<VelocityTicker />
			</ConceptFrame>

			<ConceptFrame {...frame('text-treatments')}>
				<TextTreatments />
			</ConceptFrame>

			<ConceptFrame {...frame('elastic-nav')}>
				<ElasticNav />
			</ConceptFrame>

			<ConceptFrame {...frame('hover-preview-list')}>
				<HoverPreviewList />
			</ConceptFrame>

			<ConceptFrame {...frame('bookshelf')} bleed>
				<Bookshelf />
				{#snippet notes()}
					<p>
						Each book is one element with three faces in <code>preserve-3d</code>: cover, spine
						hinged at its left edge, and a sliver of page block. Shelved, you see the spine; hovered
						or tabbed to, the whole thing swings out.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('contact-sheet')}>
				<ContactSheet />
			</ConceptFrame>

			<ConceptFrame {...frame('photo-deck')}>
				<PhotoDeck />
			</ConceptFrame>

			<ConceptFrame {...frame('horizontal-rail')} bare>
				<HorizontalRail />
				{#snippet notes()}
					<p>
						Vertical scroll distance is mapped straight onto a horizontal transform — no scroll
						hijacking, so a flick, a trackpad and a scrollbar drag all behave the way the reader
						expects, and the back button still works.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('scroll-timeline')}>
				<ScrollTimeline />
			</ConceptFrame>

			<ConceptFrame {...frame('year-grid')}>
				<YearGrid />
			</ConceptFrame>

			<ConceptFrame {...frame('status-orb')}>
				<StatusOrb />
				{#snippet notes()}
					<p>
						Sunrise and sunset come from NOAA's approximation evaluated in the browser — accurate to
						about a minute, with no API call and no date library. The clock only renders after mount
						so a cached page can never show a stale time.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('constellation')} bleed>
				<Constellation />
			</ConceptFrame>

			<ConceptFrame {...frame('physics-tags')}>
				<PhysicsTags />
				{#snippet notes()}
					<p>
						The only third-party dependency on this page. If this concept goes, so does
						<code>matter-js</code> — everything else here is hand-rolled.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('marginalia')}>
				<Marginalia />
			</ConceptFrame>

			<ConceptFrame {...frame('reaction-bar')}>
				<ReactionBar />
			</ConceptFrame>

			<ConceptFrame {...frame('theme-studio')}>
				<ThemeStudio />
				{#snippet notes()}
					<p>
						Inline custom properties on <code>&lt;html&gt;</code> out-specify every stylesheet rule, so
						switching this on retints the real header and footer too. It cleans up after itself when you
						navigate away.
					</p>
				{/snippet}
			</ConceptFrame>

			<ConceptFrame {...frame('mega-footer')} bleed>
				<MegaFooter />
			</ConceptFrame>

			<p class="tail lab-mono">
				end of the lab — delete <code>src/routes/lab/</code> to remove it all
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.page-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 60;
		background: transparent;
		pointer-events: none;
	}

	.page-progress span {
		display: block;
		height: 100%;
		background: var(--lab-accent);
		transform-origin: left center;
		transform: scaleX(0);
	}

	.masthead {
		padding: clamp(2rem, 6vw, 4rem) 0 clamp(1.5rem, 4vw, 2.5rem);
	}

	.masthead-inner {
		width: var(--size-page);
		margin-inline: auto;
		display: grid;
		justify-items: start;
		gap: 0.85rem;
	}

	h1 {
		margin: 0;
		font-family: var(--font-ui);
		font-size: clamp(2.4rem, 7vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.blurb {
		max-width: 62ch;
		margin: 0;
		color: var(--color-subtle);
		font-size: clamp(0.95rem, 1.3vw, 1.08rem);
		line-height: 1.65;
	}

	.blurb.small {
		font-size: 0.88rem;
		opacity: 0.85;
	}

	kbd {
		font-family: var(--lab-mono);
		font-size: 0.72em;
		padding: 0.16em 0.4em;
		border: 1px solid var(--lab-hairline);
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		background: var(--color-muted);
	}

	.sibling {
		display: grid;
		gap: 0.15rem;
		margin-top: 0.5rem;
		padding: 0.7rem 1rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		text-decoration: none;
		transition:
			border-color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.sibling:hover {
		border-color: var(--lab-accent);
		transform: translateY(-2px);
	}

	.sibling-label {
		font-size: 0.5rem;
		color: var(--lab-accent);
	}

	.sibling-title {
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 650;
		letter-spacing: -0.02em;
		color: var(--color-heading);
	}

	.sibling-note {
		font-size: 0.8rem;
		color: var(--color-subtle);
	}

	.layout {
		width: var(--size-page);
		margin-inline: auto;
		display: grid;
		grid-template-columns: var(--lab-rail) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
		padding-bottom: 4rem;
	}

	.rail {
		position: sticky;
		top: 1.5rem;
		max-height: calc(100vh - 3rem);
		overflow-y: auto;
		padding-right: 0.5rem;
		scrollbar-width: thin;
	}

	.rail-title {
		display: block;
		margin-bottom: 0.6rem;
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}

	.rail ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1px;
	}

	.rail a {
		display: grid;
		grid-template-columns: 1.6rem minmax(0, 1fr);
		gap: 0.4rem;
		align-items: baseline;
		padding: 0.32rem 0.45rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		color: var(--color-subtle);
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.rail a:hover {
		background: var(--color-muted);
		color: var(--color-heading);
	}

	.rail a.on {
		background: color-mix(in srgb, var(--lab-accent) 13%, transparent);
		color: var(--color-heading);
	}

	.rail-num {
		font-size: 0.55rem;
		opacity: 0.75;
	}

	.rail a.on .rail-num {
		color: var(--lab-accent);
		opacity: 1;
	}

	.rail-label {
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.35;
	}

	.stream {
		min-width: 0;
	}

	// The first frame supplies its own top rule via ConceptFrame; suppress it so
	// the stream does not open with a stray hairline under the masthead.
	.stream :global(section.frame:first-child) {
		border-top: none;
		padding-top: 0;
	}

	.tail {
		margin: 3rem 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid var(--lab-hairline);
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.6;
	}

	.tail code {
		font-family: var(--lab-mono);
	}

	@media (max-width: 1000px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			gap: 1rem;
		}

		// The index becomes a sticky horizontal strip once there is no gutter for it.
		.rail {
			position: sticky;
			top: 0;
			z-index: 30;
			max-height: none;
			margin-inline: calc(var(--size-page) / -2 + 50%);
			padding: 0.5rem 0;
			background: color-mix(in srgb, var(--color-cream) 92%, transparent);
			backdrop-filter: blur(10px);
			border-bottom: 1px solid var(--lab-hairline);
		}

		.rail-title {
			display: none;
		}

		.rail ol {
			display: flex;
			gap: 0.25rem;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.rail ol::-webkit-scrollbar {
			display: none;
		}

		.rail a {
			grid-template-columns: auto auto;
			white-space: nowrap;
			border: 1px solid var(--lab-hairline);
			border-radius: 999px;
			padding: 0.3rem 0.65rem;
		}
	}
</style>
