<script lang="ts">
	import { onMount } from 'svelte';
	import { bookNotes, photoTrips } from '$lib/content';

	const photoCount = photoTrips.reduce((sum, trip) => sum + trip.images.length, 0);

	type Stat = { value: number; label: string; suffix?: string; series: number[] };

	// Sparkline series are deterministic — derived from the data, not random —
	// so the strip renders identically on the server and after hydration.
	const stats: Stat[] = [
		{
			value: bookNotes.length,
			label: 'book notes',
			series: bookNotes.slice(0, 12).map((book) => Number.parseFloat(book.rating) || 5)
		},
		{
			value: photoCount,
			label: 'photographs',
			series: photoTrips.slice(0, 12).map((trip) => trip.images.length)
		},
		{
			value: photoTrips.length,
			label: 'trips',
			series: photoTrips.slice(0, 12).map((trip) => trip.year - 2018)
		},
		{ value: 5, label: 'site rebuilds', series: [1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5, 5] }
	];

	let host = $state<HTMLDivElement>();
	let shown = $state(stats.map(() => 0));

	onMount(() => {
		if (!host) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			shown = stats.map((stat) => stat.value);
			return;
		}

		let raf = 0;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();

				const start = performance.now();
				const DURATION = 1100;

				const tick = (now: number) => {
					const t = Math.min(1, (now - start) / DURATION);
					// Ease-out quart: fast off the mark, long settle on the final digit.
					const eased = 1 - Math.pow(1 - t, 4);
					shown = stats.map((stat) => Math.round(stat.value * eased));
					if (t < 1) raf = requestAnimationFrame(tick);
				};
				raf = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		io.observe(host);

		return () => {
			io.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});

	/** Series → an SVG polyline path across a 100×28 box. */
	function spark(series: number[]) {
		if (series.length < 2) return '';
		const min = Math.min(...series);
		const max = Math.max(...series);
		const span = max - min || 1;
		return series
			.map((value, i) => {
				const x = (i / (series.length - 1)) * 100;
				const y = 26 - ((value - min) / span) * 24;
				return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
			})
			.join(' ');
	}
</script>

<div class="strip" bind:this={host}>
	{#each stats as stat, i (stat.label)}
		<div class="stat">
			<span class="value" data-preserve-case>{shown[i]}</span>
			<span class="label lab-mono">{stat.label}</span>
			<svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
				<path d={spark(stat.series)} fill="none" stroke="currentColor" stroke-width="1.5" />
			</svg>
		</div>
	{/each}
</div>

<style lang="scss">
	.strip {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
		gap: 1px;
		background: var(--lab-hairline);
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.stat {
		display: grid;
		gap: 0.2rem;
		padding: clamp(1rem, 2.4vw, 1.4rem);
		background: var(--color-surface);
	}

	.value {
		font-family: var(--font-ui);
		font-size: clamp(1.9rem, 4vw, 2.7rem);
		font-weight: 700;
		letter-spacing: -0.045em;
		line-height: 1;
		color: var(--color-heading);
		font-variant-numeric: tabular-nums;
	}

	.label {
		font-size: 0.56rem;
		color: var(--color-subtle);
	}

	.spark {
		width: 100%;
		height: 26px;
		margin-top: 0.35rem;
		color: color-mix(in srgb, var(--lab-accent) 55%, transparent);
		overflow: visible;
	}
</style>
