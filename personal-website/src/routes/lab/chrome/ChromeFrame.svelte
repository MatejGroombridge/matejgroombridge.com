<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id: string;
		index: number;
		kind: 'header' | 'footer';
		title: string;
		tagline: string;
		tags?: string[];
		/** Preview on a dark ground — for chrome that is designed inverted. */
		dark?: boolean;
		/** `rail` puts the chrome beside the page content instead of above it. */
		layout?: 'stack' | 'rail';
		children: Snippet;
		notes?: Snippet;
	};

	let {
		id,
		index,
		kind,
		title,
		tagline,
		tags = [],
		dark = false,
		layout = 'stack',
		children,
		notes
	}: Props = $props();

	const widths = [
		{ label: 'desktop', value: 0 },
		{ label: 'tablet', value: 820 },
		{ label: 'phone', value: 390 }
	];
	let width = $state(0);

	const number = $derived(String(index).padStart(2, '0'));
</script>

<section class="frame" {id} aria-labelledby={`${id}-title`}>
	<header class="head">
		<div class="head-main">
			<span class="number lab-mono" aria-hidden="true">{number}</span>
			<div class="head-text">
				<h3 id={`${id}-title`} data-preserve-case>{title}</h3>
				<p class="tagline">{tagline}</p>
			</div>
		</div>

		<div class="controls">
			<div class="widths" role="group" aria-label="Preview width">
				{#each widths as option (option.label)}
					<button
						class="width-btn lab-mono"
						class:on={width === option.value}
						type="button"
						onclick={() => (width = option.value)}
					>
						{option.label}
					</button>
				{/each}
			</div>
			{#each tags as tag (tag)}
				<span class="lab-chip">{tag}</span>
			{/each}
		</div>
	</header>

	<!--
		`container-type: inline-size` is what makes the width switcher honest: the
		chrome components below lay themselves out with `@container` queries, so
		narrowing this box really does put them into their small-screen layout.
		Media queries would only ever see the real browser window.
	-->
	<div class="stage" class:dark style={width ? `max-width:${width}px` : ''}>
		{#if kind === 'header'}
			<div class="viewport" class:rail={layout === 'rail'}>
				{@render children()}
				<div class="filler">
					<div class="filler-hero">
						<span class="lab-mono filler-eyebrow">photography</span>
						<h4>Sydney, March</h4>
						<p>Three days of walking the harbour with one lens, mostly at the wrong time of day.</p>
					</div>
					{#each [0, 1, 2, 3, 4, 5] as row (row)}
						<div class="filler-row">
							<span class="bar" style={`width:${[92, 74, 88, 61, 80, 70][row]}%`}></span>
							<span class="bar short" style={`width:${[48, 62, 38, 55, 44, 58][row]}%`}></span>
						</div>
					{/each}
				</div>
			</div>
			<p class="scroll-hint lab-mono">scroll inside the frame ↕</p>
		{:else}
			<div class="footer-stage">
				<div class="filler tail">
					<div class="filler-row">
						<span class="bar" style="width:86%"></span>
						<span class="bar short" style="width:52%"></span>
					</div>
				</div>
				{@render children()}
			</div>
		{/if}
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
		scroll-margin-top: 5rem;
		padding-block: clamp(2rem, 4vw, 3.25rem);
		border-top: 1px solid var(--lab-hairline);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.85rem;
		margin-bottom: 1.1rem;
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

	h3 {
		margin: 0;
		font-family: var(--font-ui);
		font-size: clamp(1.15rem, 1.9vw, 1.45rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.tagline {
		margin: 0.28rem 0 0;
		max-width: 60ch;
		color: var(--color-subtle);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
	}

	.widths {
		display: inline-flex;
		gap: 1px;
		padding: 2px;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-muted);
	}

	.width-btn {
		padding: 0.22rem 0.55rem;
		border: none;
		border-radius: 999px;
		background: none;
		font-size: 0.55rem;
		color: var(--color-subtle);
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.width-btn.on {
		background: var(--color-surface);
		color: var(--color-heading);
		box-shadow: var(--shadow-subtle);
	}

	.stage {
		container-type: inline-size;
		margin-inline: auto;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-lg);
		background: var(--color-cream);
		overflow: hidden;
		transition: max-width 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	// Some chrome is designed to sit on ink rather than paper; this lets a
	// preview declare that without every component shipping its own backdrop.
	.stage.dark {
		background: #141615;
		color: #e9ece7;
	}

	.viewport {
		--viewport-h: 440px;
		position: relative;
		height: var(--viewport-h);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
	}

	// A rail sits alongside the page rather than on top of it, so the scroll
	// container becomes a row and the chrome pins itself to the left of it.
	.viewport.rail {
		display: flex;
		align-items: flex-start;
	}

	.viewport.rail .filler {
		flex: 1;
		min-width: 0;
	}

	.footer-stage {
		display: grid;
	}

	.filler {
		display: grid;
		gap: 1.1rem;
		padding: 1.5rem clamp(1rem, 4cqw, 2.5rem) 3rem;
	}

	.filler.tail {
		padding-block: 1.75rem 2rem;
	}

	.filler-hero {
		display: grid;
		gap: 0.35rem;
		padding-bottom: 0.5rem;
	}

	.filler-eyebrow {
		font-size: 0.55rem;
		color: var(--lab-accent);
	}

	.filler-hero h4 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4cqw, 2.2rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-heading);
	}

	.filler-hero p {
		margin: 0;
		max-width: 46ch;
		font-size: 0.9rem;
		color: var(--color-subtle);
	}

	.filler-row {
		display: grid;
		gap: 0.5rem;
	}

	// Greeked body copy: the point of the preview is the chrome, and real
	// paragraphs would pull the eye away from it.
	.bar {
		display: block;
		height: 8px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-ink) 8%, transparent);
	}

	.bar.short {
		height: 8px;
		opacity: 0.6;
	}

	.stage.dark .bar {
		background: rgb(255 255 255 / 0.09);
	}

	.scroll-hint {
		margin: 0.5rem 0 0;
		padding: 0 0.75rem 0.6rem;
		font-size: 0.52rem;
		color: var(--color-subtle);
		opacity: 0.55;
		text-align: center;
	}

	.notes {
		display: flex;
		gap: 0.85rem;
		margin-top: 1rem;
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
		font-size: 0.86rem;
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
</style>
