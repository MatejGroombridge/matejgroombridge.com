<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		children?: Snippet;
		id?: string;
		tone?: 'default' | 'muted' | 'dark';
		class?: string;
		animate?: boolean;
	};

	let {
		children,
		id,
		tone = 'default',
		class: className = '',
		animate = true
	}: Props = $props();
</script>

<section {id} class="section {tone} {className}">
	{#if animate}
		<div class="reveal-wrap" use:reveal>
			<Container>
				{@render children?.()}
			</Container>
		</div>
	{:else}
		<Container>
			{@render children?.()}
		</Container>
	{/if}
</section>

<style lang="scss">
	.section {
		padding: clamp(2.75rem, 6vw, 4.75rem) 0;
	}

	.section.muted {
		background: var(--color-muted);
	}

	.section.dark {
		background: var(--color-ink);
		color: var(--color-cream);
	}

	.section.dark {
		:global(h1),
		:global(h2),
		:global(h3) {
			color: var(--color-cream);
		}
	}
</style>
