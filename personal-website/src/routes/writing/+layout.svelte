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

	.writing-scope :global(.prose h2),
	.writing-scope :global(.prose h3),
	.writing-scope :global(.prose h4) {
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		letter-spacing: -0.02em;
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
	.writing-scope :global(.prose li),
	.writing-scope :global(.prose blockquote) {
		font-size: clamp(1.05rem, 0.99rem + 0.2vw, 1.15rem);
	}

	.writing-scope :global(.prose h2) {
		font-size: clamp(1.6rem, 2.4vw, 2rem);
	}

	.writing-scope :global(.prose h3) {
		font-size: clamp(1.25rem, 1.6vw, 1.45rem);
	}

	.writing-scope :global(.prose blockquote) {
		font-style: italic;
	}
</style>
