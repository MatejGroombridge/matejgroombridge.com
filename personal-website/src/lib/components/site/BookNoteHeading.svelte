<!--
	Heading renderer for book notes. A heading written as a roman numeral — on
	its own ("IV") or before a name ("IV. Of Human Bondage") — draws the numeral
	as a separate marker, the way essays number their sections, with a gap
	before the name. Everything else renders as a plain heading.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		depth: number;
		text: string;
		options: { headerIds?: boolean; headerPrefix?: string };
		slug: (value: string) => string;
		children?: Snippet;
	};

	let { depth, text, options, slug, children }: Props = $props();

	const id = $derived(options.headerIds ? `${options.headerPrefix ?? ''}${slug(text)}` : undefined);

	// The full stop is required before a name so headings that merely start with
	// "I" ("I Am…") are not read as numbered.
	const numbered = $derived(text.match(/^([IVXLC]+)(?:\.\s+(.+))?$/));
	const tag = $derived(`h${Math.min(Math.max(depth, 1), 6)}`);
	// A numeral on its own is tagged so the page can size it like the essays'
	// section markers.
</script>

<svelte:element this={tag} {id} class={numbered && !numbered[2] ? 'bare-numeral' : undefined}>
	{#if numbered}
		<!-- The name stays a bare text node so it follows the heading's casing;
		     the numeral keeps its capitals even in lowercase mode. -->
		<span class="numeral" class:named={Boolean(numbered[2])}>{numbered[1]}</span
		>{#if numbered[2]}{' '}{numbered[2]}{/if}
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>

<style lang="scss">
	.numeral {
		text-transform: none;
	}

	// A real space keeps the heading reading as "IV Of…" to screen readers and
	// copy-paste; the margin widens it into a visible break.
	.numeral.named {
		margin-right: 0.35em;
	}
</style>
