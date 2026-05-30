<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		href?: string;
		class?: string;
	};

	let { children, href, class: className = '' }: Props = $props();
</script>

{#if href}
	<a class="card linked {className}" {href}>
		{@render children?.()}
	</a>
{:else}
	<div class="card {className}">
		{@render children?.()}
	</div>
{/if}

<style lang="scss">
	.card {
		display: block;
		padding: clamp(1rem, 2.2vw, 1.5rem);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-subtle);
		text-decoration: none;
	}
</style>
