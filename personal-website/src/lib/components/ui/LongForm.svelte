<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Reading styles shared by everything long-form: essays under /writing and
	 * book notes. Wrap the page (or the part of it that holds a `Prose` body)
	 * so both read in the same face, scale and rhythm.
	 */
	let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..600;1,400..600&display=swap"
	/>
</svelte:head>

<div class="long-form">
	{@render children?.()}
</div>

<style lang="scss">
	.long-form {
		--font-prose: 'Lora', 'Iowan Old Style', Georgia, serif;
	}

	// Headings are Poppins at the weight and tracking the rest of the site sets
	// its headings in. Only the prose itself is serif.
	.long-form :global(.prose h1),
	.long-form :global(.prose h2),
	.long-form :global(.prose h3),
	.long-form :global(.prose h4) {
		font-family: var(--font-ui);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: var(--color-heading);
		// A little breathing room above an anchor the reader has just jumped to.
		scroll-margin-top: 2rem;
	}

	.long-form :global(.prose p),
	.long-form :global(.prose li),
	.long-form :global(.prose blockquote),
	.long-form :global(.hero-copy p) {
		font-family: var(--font-prose);
		line-height: 1.7;
	}

	// The shared Prose scale (~16-17px) is tuned for short page copy. Long-form
	// reading wants more, so this steps the whole scale up and keeps the
	// headings proportional to it.
	.long-form :global(.prose p),
	.long-form :global(.prose li) {
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
	}

	// Prose spaces every block a paragraph apart; list items belong to one list,
	// so they sit closer than that.
	.long-form :global(.prose li + li) {
		margin-top: 0.45rem;
	}

	.long-form :global(.prose h2) {
		font-size: clamp(1.6rem, 2.4vw, 2rem);
		// Section markers need room to breathe between movements.
		margin-top: 2.75rem;
	}

	.long-form :global(.prose h3) {
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
	}

	// Sub-section markers (i., ii.) sit just above body size — a step, not a shout.
	.long-form :global(.prose h4) {
		font-size: clamp(1.15rem, 1.4vw, 1.25rem);
		margin-top: 2.25rem;
	}

	.long-form :global(.prose > :first-child) {
		margin-top: 0;
	}

	.long-form :global(.prose a) {
		text-decoration-color: var(--color-green);
	}

	.long-form :global(.prose hr) {
		border: 0;
		border-top: 1px solid var(--color-border);
		margin: 2rem 0;
	}

	// Pull quote: centred and italic between a pair of quote marks, rather than
	// the rule-on-the-left the shared Prose component uses. Laying it out as a
	// flex column lets the closing mark be ordered before the attribution, so the
	// quote closes around the words and the source sits outside it.
	// Set in Fraunces' italic with the WONK axis on, which swaps in its quirkier
	// letterforms — the one place on the site that voice is used.
	.long-form :global(.prose blockquote) {
		display: flex;
		flex-direction: column;
		// Inset from the reading column so the quote reads as a held-apart moment
		// rather than another paragraph.
		max-width: 34rem;
		margin: clamp(2.25rem, 4.5vw, 3.25rem) auto;
		padding: 0;
		border-left: 0;
		text-align: center;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-optical-sizing: auto;
		font-variation-settings:
			'SOFT' 50,
			'WONK' 1;
		font-size: clamp(1.4rem, 1.2rem + 0.6vw, 1.85rem);
		line-height: 1.35;
		color: var(--color-green);
	}

	.long-form :global(.prose blockquote p) {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		color: inherit;
	}

	// Marks hug the first and last letter rather than sitting on their own lines.
	.long-form :global(.prose blockquote p:first-of-type)::before {
		content: '\201C';
	}

	.long-form :global(.prose blockquote p:last-of-type)::after {
		content: '\201D';
	}

	// Ordered after the closing mark, so the quote shuts around the words only.
	// Set in the reading face at body size so the source reads as part of the
	// text, not as a caption; any link belongs in a footnote, not here.
	.long-form :global(.prose blockquote cite) {
		order: 1;
		margin-top: 1.1rem;
		font-family: var(--font-prose);
		font-size: clamp(1rem, 0.95rem + 0.2vw, 1.1rem);
		font-style: normal;
		font-weight: 500;
		font-variation-settings: normal;
		letter-spacing: 0;
		color: var(--color-heading);
	}

	.long-form :global(.prose blockquote cite)::before {
		content: '\2014\00A0';
	}

	// The site centres all copy under 640px. That reads fine for short blocks,
	// but long-form text set ragged-on-both-sides is hard to follow, so the body
	// alone opts back into a flush left edge. Pull quotes set their own centring
	// and are more specific, so they stay centred.
	@media (max-width: 640px) {
		.long-form :global(.prose) {
			text-align: left;
		}
	}
</style>
