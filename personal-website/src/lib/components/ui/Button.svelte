<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		href?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
		type?: 'button' | 'submit' | 'reset';
		class?: string;
	};

	let {
		children,
		href,
		variant = 'primary',
		type = 'button',
		class: className = ''
	}: Props = $props();
</script>

{#if href}
	<a class="button {variant} {className}" {href}>
		{@render children?.()}
	</a>
{:else}
	<button class="button {variant} {className}" {type}>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.6rem;
		padding: 0.68rem 1rem;
		border: 1px solid transparent;
		border-radius: 999px;
		font-family: var(--font-heading);
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
	}

	.primary {
		background: var(--color-green);
		color: white;
	}

	.secondary {
		background: var(--color-muted);
		border-color: var(--color-muted-strong);
		color: var(--color-ink);
	}

	.ghost {
		background: transparent;
		border-color: var(--color-line);
	}
</style>
