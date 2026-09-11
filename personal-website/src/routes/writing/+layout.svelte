<script lang="ts">
	import type { Snippet } from 'svelte';

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

<div class="writing-scope">
	{@render children?.()}
</div>

<style lang="scss">
	.writing-scope {
		--font-prose: 'Lora', 'Iowan Old Style', Georgia, serif;
	}

	// Headings match the book notes body: Poppins at the weight and tracking the
	// rest of the site sets its headings in. Only the prose itself stays serif.
	.writing-scope :global(.prose h2),
	.writing-scope :global(.prose h3),
	.writing-scope :global(.prose h4) {
		font-family: var(--font-ui);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: var(--color-heading);
	}

	.writing-scope :global(.prose p),
	.writing-scope :global(.prose li),
	.writing-scope :global(.prose blockquote),
	.writing-scope :global(.hero-copy p) {
		font-family: var(--font-prose);
		line-height: 1.7;
	}

	// The shared Prose scale (~16-17px) is tuned for short page copy. Long-form
	// reading wants more, so writing steps the whole scale up and keeps the
	// headings proportional to it.
	.writing-scope :global(.prose p),
	.writing-scope :global(.prose li) {
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
	}

	.writing-scope :global(.prose h2) {
		font-size: clamp(1.6rem, 2.4vw, 2rem);
	}

	.writing-scope :global(.prose h3) {
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
	}

	// Sub-section markers (i., ii.) sit just above body size — a step, not a shout.
	.writing-scope :global(.prose h4) {
		font-size: clamp(1.15rem, 1.4vw, 1.25rem);
	}

	.writing-scope :global(.prose blockquote) {
		font-style: italic;
	}
</style>
