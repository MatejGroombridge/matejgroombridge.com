<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		dropCap?: boolean;
	};

	let { children, class: className = '', dropCap = false }: Props = $props();
</script>

<div class="prose {className}" class:has-dropcap={dropCap}>
	{@render children?.()}
</div>

<style lang="scss">
	.prose {
		max-width: var(--size-prose);

		:global(h1) {
			font-size: clamp(1.75rem, 2.8vw, 2.25rem);
			letter-spacing: -0.035em;
		}

		:global(h2) {
			font-size: clamp(1.35rem, 2vw, 1.7rem);
			letter-spacing: -0.03em;
		}

		:global(h3) {
			font-size: clamp(1.08rem, 1.4vw, 1.22rem);
		}

		:global(p),
		:global(li) {
			font-size: clamp(1rem, 1vw, 1.06rem);
			line-height: 1.75;
		}

		:global(* + *) {
			margin-top: 0.95rem;
		}

		:global(h2),
		:global(h3) {
			margin-top: 1.8rem;
		}

		:global(ul),
		:global(ol) {
			padding-left: 1.25rem;
			line-height: 1.75;
		}

		:global(blockquote) {
			margin-left: 0;
			padding-left: 0.875rem;
			border-left: 3px solid var(--color-green);
			color: var(--color-subtle);
		}
	}

	.has-dropcap :global(> p:first-of-type::first-letter) {
		float: left;
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: 3.6em;
		line-height: 0.88;
		font-weight: 700;
		color: var(--color-heading);
		padding: 0.08em 0.12em 0 0;
		margin-right: 0.04em;
		text-transform: uppercase;
	}

	@supports (initial-letter: 3) or (-webkit-initial-letter: 3) {
		.has-dropcap :global(> p:first-of-type::first-letter) {
			float: none;
			-webkit-initial-letter: 3;
			initial-letter: 3;
			font-size: 1em;
			line-height: 1;
			padding: 0 0.1em 0 0;
		}
	}
</style>
