<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id: string;
		index: number;
		title: string;
		tagline: string;
		tags?: string[];
		/** Where the concept would live on the real site. */
		slot?: string;
		/** Let the demo run edge to edge instead of sitting inside the panel gutter. */
		bleed?: boolean;
		/** Drop the panel chrome entirely (for demos that are their own surface). */
		bare?: boolean;
		children: Snippet;
		notes?: Snippet;
	};

	let {
		id,
		index,
		title,
		tagline,
		tags = [],
		slot: placement,
		bleed = false,
		bare = false,
		children,
		notes
	}: Props = $props();

	const number = $derived(String(index).padStart(2, '0'));
</script>

<section class="frame" {id} aria-labelledby={`${id}-title`}>
	<header class="head">
		<div class="head-main">
			<span class="number lab-mono" aria-hidden="true">{number}</span>
			<div class="head-text">
				<h2 id={`${id}-title`} data-preserve-case>{title}</h2>
				<p class="tagline">{tagline}</p>
			</div>
		</div>
		<div class="meta">
			{#if placement}
				<span class="lab-chip" data-tone="accent">{placement}</span>
			{/if}
			{#each tags as tag (tag)}
				<span class="lab-chip">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="stage" class:bleed class:bare>
		{@render children()}
	</div>

	{#if notes}
		<footer class="notes">
			<span class="notes-label lab-mono">why</span>
			<div class="notes-body">{@render notes()}</div>
		</footer>
	{/if}
</section>

<style lang="scss">
	.frame {
		scroll-margin-top: 1.5rem;
		padding-block: clamp(2.5rem, 5vw, 4rem);
		border-top: 1px solid var(--lab-hairline);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.35rem;
	}

	.head-main {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		min-width: 0;
	}

	.number {
		flex: 0 0 auto;
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--lab-accent);
		font-variant-numeric: tabular-nums;
	}

	.head-text {
		min-width: 0;
	}

	h2 {
		font-family: var(--font-ui);
		font-size: clamp(1.25rem, 2.1vw, 1.6rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		margin: 0;
	}

	.tagline {
		margin: 0.3rem 0 0;
		max-width: 62ch;
		color: var(--color-subtle);
		font-size: 0.94rem;
		line-height: 1.55;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding-top: 0.15rem;
	}

	.stage {
		position: relative;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-lg);
		background: var(--lab-panel);
		overflow: hidden;
	}

	.stage:not(.bleed):not(.bare) {
		padding: clamp(1.1rem, 2.8vw, 2rem);
	}

	.stage.bare {
		border: none;
		background: none;
		border-radius: 0;
		overflow: visible;
	}

	.notes {
		display: flex;
		gap: 0.85rem;
		margin-top: 1rem;
		padding-left: 0.1rem;
	}

	.notes-label {
		flex: 0 0 auto;
		padding-top: 0.2rem;
		font-size: 0.6rem;
		color: var(--lab-accent);
	}

	.notes-body {
		max-width: 70ch;
		color: var(--color-subtle);
		font-size: 0.88rem;
		line-height: 1.6;
	}

	.notes-body :global(p) {
		margin: 0;
		font-size: inherit;
		line-height: inherit;
		color: inherit;
	}

	.notes-body :global(code) {
		font-family: var(--lab-mono);
		font-size: 0.85em;
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--color-ink) 8%, transparent);
	}

	@media (max-width: 700px) {
		.head-main {
			gap: 0.6rem;
		}
	}
</style>
