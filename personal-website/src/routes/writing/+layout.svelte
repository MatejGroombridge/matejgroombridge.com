<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..700,50;1,9..144,400..700,50&family=Lora:ital,wght@0,400..600;1,400..600&display=swap"
	/>
</svelte:head>

<div class="writing-scope">
	{@render children?.()}
</div>

<style lang="scss">
	.writing-scope {
		--font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
		--font-prose: 'Lora', 'Iowan Old Style', Georgia, serif;
	}

	.writing-scope :global(h1),
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

	.writing-scope :global(h1) {
		letter-spacing: -0.025em;
	}

	.writing-scope :global(.prose p),
	.writing-scope :global(.prose li),
	.writing-scope :global(.prose blockquote),
	.writing-scope :global(.hero-copy p) {
		font-family: var(--font-prose);
		line-height: 1.7;
	}

	.writing-scope :global(.prose blockquote) {
		font-style: italic;
	}

	.writing-scope :global(.has-dropcap > p:first-of-type::first-letter) {
		font-family: var(--font-display);
		font-weight: 600;
	}
</style>
