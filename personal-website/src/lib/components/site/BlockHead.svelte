<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		aside?: Snippet;
	};

	let { title, aside }: Props = $props();
</script>

<header class="block-head">
	<h2>{title}</h2>
	{#if aside}
		<div class="aside">{@render aside()}</div>
	{/if}
</header>

<style lang="scss">
	.block-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		padding-bottom: 0.85rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.block-head h2 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-heading);
		margin: 0;
	}

	.aside {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		font-family: var(--font-heading);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.aside :global(a) {
		color: var(--color-green);
		text-decoration: none;
	}

	.aside :global(a:hover) {
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.block-head {
			gap: 0.5rem;
		}

		.block-head h2 {
			font-size: 1rem;
			letter-spacing: 0.03em;
		}
	}
</style>
