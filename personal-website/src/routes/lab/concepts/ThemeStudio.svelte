<script lang="ts">
	import { onMount } from 'svelte';

	let hue = $state(146);
	let chroma = $state(0.14);
	let warmth = $state(0.014);
	let radius = $state(12);
	let live = $state(false);
	let copied = $state(false);
	let dark = $state(false);

	// Every token below is derived from four numbers, which is the point of the
	// demo: a whole palette is a function, not a list of hex codes.
	const tokens = $derived.by(() => {
		const l = dark ? 0.7 : 0.6;
		return {
			'--color-green': `oklch(${l} ${chroma.toFixed(3)} ${hue})`,
			'--color-green-soft': `oklch(${(l + 0.1).toFixed(2)} ${(chroma * 0.62).toFixed(3)} ${hue})`,
			'--color-cream': dark
				? `oklch(0.19 ${(warmth * 0.6).toFixed(3)} ${hue})`
				: `oklch(0.975 ${warmth.toFixed(3)} ${hue})`,
			'--color-surface': dark
				? `oklch(0.22 ${(warmth * 0.6).toFixed(3)} ${hue})`
				: `oklch(0.99 ${(warmth * 0.7).toFixed(3)} ${hue})`,
			'--color-muted': dark
				? `oklch(0.25 ${(warmth * 0.8).toFixed(3)} ${hue})`
				: `oklch(0.945 ${(warmth * 1.4).toFixed(3)} ${hue})`,
			'--color-muted-strong': dark
				? `oklch(0.31 ${(warmth * 0.9).toFixed(3)} ${hue})`
				: `oklch(0.9 ${(warmth * 1.8).toFixed(3)} ${hue})`,
			'--radius-sm': `${(radius * 0.25).toFixed(0)}px`,
			'--radius-md': `${(radius * 0.6).toFixed(0)}px`,
			'--radius-lg': `${radius}px`
		} satisfies Record<string, string>;
	});

	const css = $derived(
		`:root {\n${Object.entries(tokens)
			.map(([key, value]) => `\t${key}: ${value};`)
			.join('\n')}\n}`
	);

	onMount(() => {
		dark = document.documentElement.dataset.theme === 'dark';
		const observer = new MutationObserver(() => {
			dark = document.documentElement.dataset.theme === 'dark';
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
		return () => {
			observer.disconnect();
			clear();
		};
	});

	function clear() {
		const root = document.documentElement;
		for (const key of Object.keys(tokens)) root.style.removeProperty(key);
	}

	// Inline custom properties on <html> out-specify every stylesheet rule, so
	// this repaints the real header, footer and page chrome — not just a swatch.
	$effect(() => {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		if (!live) {
			clear();
			return;
		}
		for (const [key, value] of Object.entries(tokens)) root.style.setProperty(key, value);
	});

	function reset() {
		hue = 146;
		chroma = 0.14;
		warmth = 0.014;
		radius = 12;
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(css);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div
	class="studio"
	style={Object.entries(tokens)
		.map(([k, v]) => `${k}:${v}`)
		.join(';')}
>
	<div class="controls">
		<label class="control">
			<span class="lab-mono">accent hue <b>{hue}°</b></span>
			<input class="hue" type="range" min="0" max="360" step="1" bind:value={hue} />
		</label>

		<label class="control">
			<span class="lab-mono">chroma <b>{chroma.toFixed(3)}</b></span>
			<input type="range" min="0" max="0.24" step="0.005" bind:value={chroma} />
		</label>

		<label class="control">
			<span class="lab-mono">paper warmth <b>{warmth.toFixed(3)}</b></span>
			<input type="range" min="0" max="0.045" step="0.001" bind:value={warmth} />
		</label>

		<label class="control">
			<span class="lab-mono">corner radius <b>{radius}px</b></span>
			<input type="range" min="0" max="26" step="1" bind:value={radius} />
		</label>

		<div class="row">
			<button class="toggle" class:on={live} type="button" onclick={() => (live = !live)}>
				<span class="dot"></span>
				{live ? 'Applied site-wide' : 'Apply to the whole page'}
			</button>
			<button class="ghost" type="button" onclick={reset}>Reset</button>
		</div>
	</div>

	<div class="preview">
		<div class="swatches">
			<span class="sw" style="background:var(--color-green)"></span>
			<span class="sw" style="background:var(--color-green-soft)"></span>
			<span class="sw" style="background:var(--color-muted-strong)"></span>
			<span class="sw" style="background:var(--color-muted)"></span>
			<span class="sw" style="background:var(--color-surface)"></span>
		</div>

		<div class="mock">
			<span class="mock-eyebrow lab-mono">book note</span>
			<h4 data-preserve-case>Born To Run</h4>
			<p>Humans were born with the innate capacity to run long distances.</p>
			<div class="mock-actions">
				<span class="mock-btn primary">Read notes</span>
				<span class="mock-btn ghost">Buy</span>
			</div>
		</div>

		<div class="code">
			<button class="copy lab-mono" type="button" onclick={copy}>
				{copied ? 'copied ✓' : 'copy css'}
			</button>
			<pre>{css}</pre>
		</div>
	</div>
</div>

<style lang="scss">
	.studio {
		display: grid;
		grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 2rem);
		align-items: start;
	}

	.controls {
		display: grid;
		gap: 1rem;
	}

	.control {
		display: grid;
		gap: 0.4rem;
	}

	.control span {
		font-size: 0.58rem;
		color: var(--color-subtle);
	}

	.control b {
		color: var(--color-heading);
		font-variant-numeric: tabular-nums;
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 999px;
		background: var(--color-muted-strong);
		outline: none;
	}

	input[type='range'].hue {
		// Full oklch sweep so the slider itself is the colour picker.
		background: linear-gradient(
			90deg,
			oklch(0.62 0.16 0),
			oklch(0.62 0.16 60),
			oklch(0.62 0.16 120),
			oklch(0.62 0.16 180),
			oklch(0.62 0.16 240),
			oklch(0.62 0.16 300),
			oklch(0.62 0.16 360)
		);
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 999px;
		border: 2px solid var(--color-surface);
		background: var(--color-green);
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.3);
		cursor: grab;
	}

	input[type='range']::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border-radius: 999px;
		border: 2px solid var(--color-surface);
		background: var(--color-green);
		cursor: grab;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.toggle,
	.ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.5rem 0.85rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-heading);
	}

	.toggle.on {
		border-color: var(--color-green);
		background: color-mix(in srgb, var(--color-green) 14%, transparent);
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--color-muted-strong);
	}

	.toggle.on .dot {
		background: var(--color-green);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-green) 25%, transparent);
	}

	.preview {
		display: grid;
		gap: 0.85rem;
	}

	.swatches {
		display: flex;
		gap: 4px;
		height: 44px;
	}

	.sw {
		flex: 1;
		border-radius: var(--radius-md);
		border: 1px solid var(--lab-hairline);
	}

	.mock {
		display: grid;
		gap: 0.4rem;
		padding: 1.1rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
	}

	.mock-eyebrow {
		font-size: 0.55rem;
		color: var(--color-green);
	}

	.mock h4 {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.025em;
	}

	.mock p {
		margin: 0;
		font-size: 0.86rem;
		color: var(--color-subtle);
	}

	.mock-actions {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.35rem;
	}

	.mock-btn {
		padding: 0.4rem 0.85rem;
		border-radius: 999px;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
	}

	.mock-btn.primary {
		background: var(--color-green);
		color: #fff;
	}

	.mock-btn.ghost {
		border: 1px solid var(--color-muted-strong);
		background: var(--color-muted);
	}

	.code {
		position: relative;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-muted);
		overflow: hidden;
	}

	.copy {
		position: absolute;
		top: 0.45rem;
		right: 0.45rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	pre {
		margin: 0;
		padding: 0.85rem 1rem;
		font-family: var(--lab-mono);
		font-size: 0.66rem;
		line-height: 1.7;
		color: var(--color-subtle);
		overflow-x: auto;
		tab-size: 2;
	}

	@media (max-width: 760px) {
		.studio {
			grid-template-columns: 1fr;
		}
	}
</style>
