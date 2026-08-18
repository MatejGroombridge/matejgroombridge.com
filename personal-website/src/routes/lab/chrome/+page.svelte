<script lang="ts">
	// ---------------------------------------------------------------------------
	// TEMPORARY — headers & footers sandbox, sibling to /lab.
	// Delete `src/routes/lab/` to remove this along with everything else.
	// ---------------------------------------------------------------------------
	import { onMount } from 'svelte';
	import '../lab.scss';

	import ChromeFrame from './ChromeFrame.svelte';

	import H01Rule from './headers/H01Rule.svelte';
	import H02Dock from './headers/H02Dock.svelte';
	import H03Masthead from './headers/H03Masthead.svelte';
	import H04StatusStrip from './headers/H04StatusStrip.svelte';
	import H05CommandBar from './headers/H05CommandBar.svelte';
	import H06Index from './headers/H06Index.svelte';
	import H07Rail from './headers/H07Rail.svelte';
	import H08Overlay from './headers/H08Overlay.svelte';
	import H09AutoHide from './headers/H09AutoHide.svelte';
	import H10PhotoStrip from './headers/H10PhotoStrip.svelte';

	import F01Wordmark from './footers/F01Wordmark.svelte';
	import F02Postcard from './footers/F02Postcard.svelte';
	import F03Terminal from './footers/F03Terminal.svelte';
	import F04Marquee from './footers/F04Marquee.svelte';
	import F05Colophon from './footers/F05Colophon.svelte';
	import F06Now from './footers/F06Now.svelte';
	import F07Reply from './footers/F07Reply.svelte';
	import F08Place from './footers/F08Place.svelte';
	import F09PhotoStrip from './footers/F09PhotoStrip.svelte';
	import F10Signature from './footers/F10Signature.svelte';

	type Meta = {
		id: string;
		kind: 'header' | 'footer';
		title: string;
		tagline: string;
		tags: string[];
	};

	// Single source of truth for the tab strip, the section headers and the
	// numbering, so nothing drifts as designs are cut.
	const items: Meta[] = [
		{
			id: 'h-rule',
			kind: 'header',
			title: 'Rule',
			tagline:
				'The quiet default. Condenses on scroll and draws a green rule out from the centre of the active link.',
			tags: ['sticky', 'condensing']
		},
		{
			id: 'h-dock',
			kind: 'header',
			title: 'Floating dock',
			tagline:
				'A frosted capsule detached from the top edge, with one indicator pill that travels between items and leans toward whatever you hover.',
			tags: ['glass', 'single indicator']
		},
		{
			id: 'h-masthead',
			kind: 'header',
			title: 'Editorial masthead',
			tagline:
				'A newspaper front page: oversized Fraunces wordmark, links set as two numbered columns, and a strapline rule underneath.',
			tags: ['editorial', 'display type']
		},
		{
			id: 'h-status',
			kind: 'header',
			title: 'Status strip',
			tagline:
				'A live detail bar that scrolls away, over a nav row that pins. The strip carries the local time and what I am reading.',
			tags: ['two-tier', 'live']
		},
		{
			id: 'h-command',
			kind: 'header',
			title: 'Command bar',
			tagline:
				'Nav collapses into a single search affordance. Everything is reachable by typing, so the bar stops competing with the page.',
			tags: ['⌘K', 'minimal nav']
		},
		{
			id: 'h-index',
			kind: 'header',
			title: 'Contents page',
			tagline:
				'Links set as a printed table of contents, with dotted leaders and counts. Hovering one entry recedes the rest.',
			tags: ['toc', 'dimming']
		},
		{
			id: 'h-rail',
			kind: 'header',
			title: 'Vertical rail',
			tagline:
				'Nav rotated onto a fixed left rail with the monogram at the top and socials at the foot. Lies down into a bar on small screens.',
			tags: ['vertical', 'fixed']
		},
		{
			id: 'h-overlay',
			kind: 'header',
			title: 'Overlay menu',
			tagline:
				'Almost nothing until you open it, then a full-bleed sheet of display type with a photograph cross-fading behind the hovered link.',
			tags: ['full-bleed', 'photo preview']
		},
		{
			id: 'h-autohide',
			kind: 'header',
			title: 'Auto-hide',
			tagline:
				'Gets out of the way going down, comes back the instant you scroll up, and carries a reading-progress line.',
			tags: ['scroll direction', 'progress']
		},
		{
			id: 'h-photo',
			kind: 'header',
			title: 'Photo dissolve',
			tagline:
				'Opens as a strip of the current photograph with white nav over it, then dissolves to paper and ink across the first 160px of scroll.',
			tags: ['image', 'scroll ramp']
		},

		{
			id: 'f-wordmark',
			kind: 'footer',
			title: 'Outlined wordmark',
			tagline:
				'Link columns over a giant outlined surname. Outlined rather than filled so it holds the bottom of the page without shouting.',
			tags: ['display type', 'columns']
		},
		{
			id: 'f-postcard',
			kind: 'footer',
			title: 'Postcard',
			tagline:
				'A photograph, a perforated stamp, a postmark and a handwritten note. The most personal option here by a distance.',
			tags: ['skeuomorphic', 'caveat']
		},
		{
			id: 'f-terminal',
			kind: 'footer',
			title: 'Terminal',
			tagline:
				'A shell session that types itself out on load. Links become commands, contact becomes an environment variable.',
			tags: ['mono', 'typewriter']
		},
		{
			id: 'f-marquee',
			kind: 'footer',
			title: 'Marquee band',
			tagline:
				'A scrolling call to action across the full width, pausing on hover while the display type loses its softness.',
			tags: ['marquee', 'variable font']
		},
		{
			id: 'f-colophon',
			kind: 'footer',
			title: 'Colophon',
			tagline:
				'Type-forward: two paragraphs about how the site is made, next to a spec sheet of what it is made from.',
			tags: ['long-form', 'spec sheet']
		},
		{
			id: 'f-now',
			kind: 'footer',
			title: 'Now',
			tagline:
				'Four cards of what is actually happening — reading, building, shooting, training — each on its own hairline of colour.',
			tags: ['status', 'cards']
		},
		{
			id: 'f-reply',
			kind: 'footer',
			title: 'One-field reply',
			tagline:
				'A single email field that grows a message box only once you commit to it, then confirms in place.',
			tags: ['form', 'progressive']
		},
		{
			id: 'f-place',
			kind: 'footer',
			title: 'Place',
			tagline:
				'Coordinates, live local time, and a drawn location mark — no map embed, no third-party tracking.',
			tags: ['svg map', 'live clock']
		},
		{
			id: 'f-photos',
			kind: 'footer',
			title: 'Photo strip',
			tagline:
				'Seven trips as a full-width strip that reallocates its space to whichever frame you hover. A footer that is also a way back in.',
			tags: ['flex grow', 'imagery']
		},
		{
			id: 'f-signature',
			kind: 'footer',
			title: 'Signature',
			tagline:
				'The anti-footer: one line, a drawn signature, and an email that slides to reveal its own copy state.',
			tags: ['minimal', 'one line']
		}
	];

	const headers = $derived(items.filter((item) => item.kind === 'header'));
	const footers = $derived(items.filter((item) => item.kind === 'footer'));

	function meta(id: string) {
		const index = items.findIndex((item) => item.id === id);
		const item = items[index];
		// Headers and footers are numbered 01–10 within their own run.
		const within = items.filter((other) => other.kind === item.kind).indexOf(item);
		return { ...item, index: within + 1 };
	}

	let active = $state(items[0].id);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && entry.target.id) active = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -55% 0px', threshold: 0 }
		);
		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Header &amp; footer lab | Matej Groombridge</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content="A temporary sandbox of header and footer concepts." />
</svelte:head>

<div class="lab">
	<header class="masthead">
		<div class="masthead-inner">
			<a class="back lab-mono" href="/lab">← back to the concept lab</a>
			<span class="lab-chip" data-tone="accent">temporary · /lab/chrome</span>
			<h1 data-preserve-case>Headers &amp; footers</h1>
			<p class="blurb">
				Ten of each, live rather than mocked up. Every preview has a width switcher — the chrome is
				laid out with container queries, so narrowing the frame really does put it into its
				small-screen layout instead of waiting on your browser window.
			</p>
			<p class="blurb small">
				Headers sit in a scrolling frame so you can see what they do on the way down. Footers are
				shown at their natural height with a scrap of page above.
			</p>
		</div>
	</header>

	<nav class="tabs" aria-label="Jump to">
		<div class="tabs-inner">
			<span class="tabs-label lab-mono">headers</span>
			{#each headers as item, i (item.id)}
				<a href={`#${item.id}`} class:on={active === item.id}>
					<span class="lab-mono">{String(i + 1).padStart(2, '0')}</span>
					{item.title}
				</a>
			{/each}
			<span class="tabs-label lab-mono">footers</span>
			{#each footers as item, i (item.id)}
				<a href={`#${item.id}`} class:on={active === item.id}>
					<span class="lab-mono">{String(i + 1).padStart(2, '0')}</span>
					{item.title}
				</a>
			{/each}
		</div>
	</nav>

	<div class="stream">
		<h2 class="run-title" id="headers">
			<span class="run-num lab-mono">A</span> Headers
		</h2>

		<ChromeFrame {...meta('h-rule')}>
			<H01Rule />
			{#snippet notes()}
				<p>
					The condense threshold has a gap in it — collapse past 40px, expand below 12px — so a
					scroll that settles right on the boundary can&rsquo;t make the header flicker.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-dock')}>
			<H02Dock />
			{#snippet notes()}
				<p>
					Equal-width grid columns mean the indicator travels by whole percentages, so there is no
					measuring and no resize observer — it just works at any label length.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-masthead')}><H03Masthead /></ChromeFrame>

		<ChromeFrame {...meta('h-status')}><H04StatusStrip /></ChromeFrame>

		<ChromeFrame {...meta('h-command')}>
			<H05CommandBar />
			{#snippet notes()}
				<p>
					Pairs with the command palette from the main lab page — this is what the header looks like
					once search is the primary way around the site.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-index')}><H06Index /></ChromeFrame>

		<ChromeFrame {...meta('h-rail')} layout="rail">
			<H07Rail />
			{#snippet notes()}
				<p>
					Costs about 68px of width for the whole session, which is cheap on a desktop and far too
					expensive on a phone — so under 560px it lies down into an ordinary bar.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-overlay')}>
			<H08Overlay />
			{#snippet notes()}
				<p>
					Click <em>menu</em> in the frame. The sheet wipes in and the links stagger up behind it.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-autohide')}>
			<H09AutoHide />
			{#snippet notes()}
				<p>
					Requires 4px of deliberate movement before it reacts, and never hides in the first 80px,
					so trackpad jitter can&rsquo;t make it strobe.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('h-photo')}>
			<H10PhotoStrip />
			{#snippet notes()}
				<p>
					Scroll position drives a continuous 0→1 ramp rather than flipping a class, so the header
					dissolves between photograph and paper instead of snapping between two states.
				</p>
			{/snippet}
		</ChromeFrame>

		<h2 class="run-title" id="footers">
			<span class="run-num lab-mono">B</span> Footers
		</h2>

		<ChromeFrame {...meta('f-wordmark')}><F01Wordmark /></ChromeFrame>

		<ChromeFrame {...meta('f-postcard')}>
			<F02Postcard />
			{#snippet notes()}
				<p>
					The stamp perforation is a repeating radial mask rather than an image, so it stays crisp
					at any size and costs nothing to load.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('f-terminal')} dark><F03Terminal /></ChromeFrame>

		<ChromeFrame {...meta('f-marquee')} dark><F04Marquee /></ChromeFrame>

		<ChromeFrame {...meta('f-colophon')}><F05Colophon /></ChromeFrame>

		<ChromeFrame {...meta('f-now')}><F06Now /></ChromeFrame>

		<ChromeFrame {...meta('f-reply')}>
			<F07Reply />
			{#snippet notes()}
				<p>
					Type a valid address in the frame — the send button only lights once the pattern matches,
					and the message box appears the moment the field takes focus.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('f-place')}><F08Place /></ChromeFrame>

		<ChromeFrame {...meta('f-photos')} dark>
			<F09PhotoStrip />
			{#snippet notes()}
				<p>
					The frames are flex items sharing one row, so the hovered one grows by taking space from
					its neighbours — the strip stays exactly full width the whole time.
				</p>
			{/snippet}
		</ChromeFrame>

		<ChromeFrame {...meta('f-signature')}><F10Signature /></ChromeFrame>

		<p class="tail lab-mono">
			end of the chrome lab — <a href="/lab">back to the concept lab</a>
		</p>
	</div>
</div>

<style lang="scss">
	.masthead {
		padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(1rem, 3vw, 1.75rem);
	}

	.masthead-inner {
		width: var(--size-page);
		margin-inline: auto;
		display: grid;
		justify-items: start;
		gap: 0.7rem;
	}

	.back {
		font-size: 0.55rem;
		color: var(--color-subtle);
		text-decoration: none;
	}

	.back:hover {
		color: var(--lab-accent);
	}

	h1 {
		margin: 0;
		font-family: var(--font-ui);
		font-size: clamp(2.2rem, 6.5vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.blurb {
		max-width: 64ch;
		margin: 0;
		color: var(--color-subtle);
		font-size: clamp(0.95rem, 1.3vw, 1.05rem);
		line-height: 1.65;
	}

	.blurb.small {
		font-size: 0.88rem;
		opacity: 0.85;
	}

	.tabs {
		position: sticky;
		top: 0;
		z-index: 30;
		background: color-mix(in srgb, var(--color-cream) 92%, transparent);
		backdrop-filter: blur(10px);
		border-block: 1px solid var(--lab-hairline);
	}

	.tabs-inner {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		width: var(--size-page);
		margin-inline: auto;
		padding: 0.5rem 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tabs-inner::-webkit-scrollbar {
		display: none;
	}

	.tabs-label {
		flex: 0 0 auto;
		padding: 0 0.5rem 0 0.25rem;
		font-size: 0.5rem;
		color: var(--color-subtle);
		opacity: 0.65;
	}

	.tabs-label:not(:first-child) {
		margin-left: 0.5rem;
		padding-left: 0.85rem;
		border-left: 1px solid var(--lab-hairline);
	}

	.tabs a {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		padding: 0.3rem 0.6rem;
		border-radius: 999px;
		font-family: var(--font-ui);
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
		white-space: nowrap;
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.tabs a span {
		font-size: 0.5rem;
		opacity: 0.7;
	}

	.tabs a:hover {
		background: var(--color-muted);
		color: var(--color-heading);
	}

	.tabs a.on {
		background: color-mix(in srgb, var(--lab-accent) 14%, transparent);
		color: var(--color-heading);
	}

	.tabs a.on span {
		color: var(--lab-accent);
		opacity: 1;
	}

	.stream {
		width: var(--size-page);
		margin-inline: auto;
		padding-bottom: 4rem;
	}

	.run-title {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		margin: clamp(2rem, 5vw, 3.5rem) 0 0;
		padding-bottom: 0.5rem;
		font-family: var(--font-ui);
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		scroll-margin-top: 4rem;
	}

	.run-num {
		font-size: 0.7rem;
		color: var(--lab-accent);
	}

	.tail {
		margin: 3rem 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid var(--lab-hairline);
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}

	.tail a {
		color: var(--lab-accent);
	}
</style>
