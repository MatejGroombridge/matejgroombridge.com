<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
	};

	let { children, class: className = '' }: Props = $props();
</script>

<div class="container {className}">
	{@render children?.()}
</div>

<style lang="scss">
	.container {
		width: var(--size-page);
		margin-inline: auto;
	}
</style>
