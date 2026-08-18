<script lang="ts">
	import { onMount } from 'svelte';
	import { year2026Timeline } from '$lib/content';

	type Cell = {
		iso: string;
		label: string;
		weekday: number;
		week: number;
		level: number;
		event?: string;
		future: boolean;
		today: boolean;
	};

	const YEAR = 2026;

	const events = new Map(year2026Timeline.map((entry) => [entry.date, entry.title]));

	/**
	 * Deterministic per-day intensity. A hash rather than `Math.random()` so the
	 * server render and the hydrated client agree — otherwise the whole grid
	 * repaints on hydration.
	 */
	function intensity(iso: string) {
		let hash = 2166136261;
		for (let i = 0; i < iso.length; i++) {
			hash ^= iso.charCodeAt(i);
			hash = Math.imul(hash, 16777619);
		}
		return ((hash >>> 0) % 1000) / 1000;
	}

	// `today` is resolved on mount: rendering it during SSR would bake the
	// server's clock into the markup and mismatch a client in another timezone.
	let today = $state<string | null>(null);
	onMount(() => {
		const now = new Date();
		today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
			now.getDate()
		).padStart(2, '0')}`;
	});

	const cells = $derived.by((): Cell[] => {
		const out: Cell[] = [];
		const start = new Date(Date.UTC(YEAR, 0, 1));
		// Sunday-first columns, matching the offset of Jan 1 in the first week.
		const offset = start.getUTCDay();
		const days = (Date.UTC(YEAR + 1, 0, 1) - Date.UTC(YEAR, 0, 1)) / 86400000;

		for (let day = 0; day < days; day++) {
			const date = new Date(Date.UTC(YEAR, 0, 1 + day));
			const iso = date.toISOString().slice(0, 10);
			const future = today ? iso > today : false;
			const raw = intensity(iso);

			out.push({
				iso,
				label: date.toLocaleDateString('en-AU', {
					weekday: 'short',
					day: 'numeric',
					month: 'long',
					timeZone: 'UTC'
				}),
				weekday: date.getUTCDay(),
				week: Math.floor((day + offset) / 7),
				// Weekends skew quieter; the curve just makes the field read nicely.
				level: future ? 0 : Math.min(4, Math.floor(raw * (date.getUTCDay() % 6 === 0 ? 3.4 : 5))),
				event: events.get(iso),
				future,
				today: iso === today
			});
		}
		return out;
	});

	const elapsed = $derived(cells.filter((cell) => !cell.future).length);
	const percent = $derived(cells.length ? Math.round((elapsed / cells.length) * 1000) / 10 : 0);

	let hovered = $state<Cell | null>(null);

	const months = Array.from({ length: 12 }, (_, m) => ({
		name: new Date(Date.UTC(YEAR, m, 1)).toLocaleDateString('en-AU', {
			month: 'short',
			timeZone: 'UTC'
		}),
		week: Math.floor(
			((Date.UTC(YEAR, m, 1) - Date.UTC(YEAR, 0, 1)) / 86400000 +
				new Date(Date.UTC(YEAR, 0, 1)).getUTCDay()) /
				7
		)
	}));
</script>

<div class="year">
	<header>
		<div class="headline">
			<span class="big" data-preserve-case>{YEAR}</span>
			<span class="sub lab-mono">day {elapsed} of {cells.length} · {percent}% gone</span>
		</div>
		<div class="legend lab-mono">
			<span>quiet</span>
			{#each [0, 1, 2, 3, 4] as level (level)}
				<span class="swatch" data-level={level}></span>
			{/each}
			<span>busy</span>
		</div>
	</header>

	<div class="bar" aria-hidden="true">
		<span class="bar-fill" style={`width:${percent}%`}></span>
	</div>

	<div class="scroller">
		<div class="months lab-mono" aria-hidden="true">
			{#each months as month (month.name)}
				<span style={`grid-column:${month.week + 1}`}>{month.name}</span>
			{/each}
		</div>

		<div class="grid" role="img" aria-label={`Calendar heatmap for ${YEAR}`}>
			{#each cells as cell (cell.iso)}
				<button
					class="cell"
					class:future={cell.future}
					class:today={cell.today}
					class:marked={!!cell.event}
					type="button"
					data-level={cell.level}
					style={`grid-column:${cell.week + 1}; grid-row:${cell.weekday + 1}`}
					onmouseenter={() => (hovered = cell)}
					onfocus={() => (hovered = cell)}
					onmouseleave={() => (hovered = null)}
					onblur={() => (hovered = null)}
					aria-label={`${cell.label}${cell.event ? ` — ${cell.event}` : ''}`}
				></button>
			{/each}
		</div>
	</div>

	<div class="readout" aria-live="polite">
		{#if hovered}
			<span class="readout-date lab-mono">{hovered.label}</span>
			{#if hovered.event}
				<span class="readout-event" data-preserve-case>{hovered.event}</span>
			{:else if hovered.future}
				<span class="readout-event dim">not yet</span>
			{:else}
				<span class="readout-event dim">nothing logged</span>
			{/if}
		{:else}
			<span class="readout-date lab-mono">
				{events.size} logged moments · hover a day
			</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.year {
		display: grid;
		gap: 0.85rem;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.headline {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
	}

	.big {
		font-family: var(--lab-kinetic);
		font-size: clamp(1.9rem, 4vw, 2.8rem);
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--color-heading);
		font-variation-settings:
			'wght' 620,
			'opsz' 120,
			'SOFT' 40;
	}

	.sub {
		font-size: 0.6rem;
		color: var(--color-subtle);
	}

	.legend {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	.swatch,
	.cell {
		width: 11px;
		height: 11px;
		border-radius: 2.5px;
		border: none;
		padding: 0;
	}

	// Shared intensity ramp for both the legend and the grid.
	.swatch[data-level='0'],
	.cell[data-level='0'] {
		background: color-mix(in srgb, var(--color-ink) 8%, transparent);
	}
	.swatch[data-level='1'],
	.cell[data-level='1'] {
		background: color-mix(in srgb, var(--lab-accent) 25%, transparent);
	}
	.swatch[data-level='2'],
	.cell[data-level='2'] {
		background: color-mix(in srgb, var(--lab-accent) 45%, transparent);
	}
	.swatch[data-level='3'],
	.cell[data-level='3'] {
		background: color-mix(in srgb, var(--lab-accent) 70%, transparent);
	}
	.swatch[data-level='4'],
	.cell[data-level='4'] {
		background: var(--lab-accent);
	}

	.bar {
		height: 3px;
		border-radius: 999px;
		background: var(--lab-hairline);
		overflow: hidden;
	}

	.bar-fill {
		display: block;
		height: 100%;
		border-radius: 999px;
		background: var(--lab-accent);
		transition: width 600ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.scroller {
		overflow-x: auto;
		padding-bottom: 0.35rem;
		scrollbar-width: thin;
	}

	.months {
		display: grid;
		grid-template-columns: repeat(53, 13px);
		margin-bottom: 0.3rem;
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(53, 13px);
		grid-template-rows: repeat(7, 13px);
		grid-auto-flow: column;
	}

	.cell {
		cursor: pointer;
		transition:
			transform 120ms ease,
			outline-color 120ms ease;
		outline: 1.5px solid transparent;
		outline-offset: 1px;
	}

	.cell:hover,
	.cell:focus-visible {
		transform: scale(1.45);
		outline-color: var(--color-heading);
	}

	.cell.future {
		background: repeating-linear-gradient(
			45deg,
			color-mix(in srgb, var(--color-ink) 6%, transparent) 0 2px,
			transparent 2px 4px
		);
	}

	// Days that carry a real log entry get a ring so they read as landmarks.
	.cell.marked {
		background: var(--lab-accent);
		box-shadow:
			0 0 0 1.5px var(--color-surface),
			0 0 0 3px var(--lab-accent);
	}

	.cell.today {
		background: var(--color-heading);
		animation: beat 2.4s ease-in-out infinite;
	}

	@keyframes beat {
		0%,
		100% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-heading) 45%, transparent);
		}
		50% {
			box-shadow: 0 0 0 5px transparent;
		}
	}

	.readout {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.6rem;
		min-height: 1.4rem;
		padding-top: 0.15rem;
		border-top: 1px solid var(--lab-hairline);
		margin-top: 0.2rem;
	}

	.readout-date {
		font-size: 0.58rem;
		color: var(--color-subtle);
	}

	.readout-event {
		font-family: var(--font-ui);
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--lab-accent);
	}

	.readout-event.dim {
		font-weight: 400;
		color: var(--color-subtle);
		opacity: 0.65;
	}
</style>
