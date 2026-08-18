<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { year2026Timeline } from '$lib/content';

	const entries = [...year2026Timeline].sort((a, b) => b.date.localeCompare(a.date));

	/**
	 * Scroll-driven CSS animations do the work where they exist (no observers, no
	 * rAF, runs off the main thread). Everywhere else the existing `reveal`
	 * action is the fallback, so the two paths never fight over opacity.
	 */
	let native = $state(false);
	onMount(() => {
		native =
			typeof CSS !== 'undefined' &&
			CSS.supports?.('animation-timeline', 'view()') &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function label(date: string) {
		const parsed = new Date(`${date}T00:00:00Z`);
		return {
			day: String(parsed.getUTCDate()).padStart(2, '0'),
			month: parsed.toLocaleDateString('en-AU', { month: 'short', timeZone: 'UTC' })
		};
	}
</script>

<div class="log" class:native>
	<div class="rail" aria-hidden="true">
		<span class="rail-track"></span>
		<span class="rail-fill"></span>
	</div>

	<ol>
		{#each entries as entry, i (entry.date + entry.title)}
			{@const stamp = label(entry.date)}
			<li class="entry" style={`--i:${i}`}>
				{#if !native}
					<div class="revealer" use:reveal={{ delay: i * 60, distance: 24 }}>
						<span class="node" aria-hidden="true"></span>
						<time class="stamp" datetime={entry.date}>
							<span class="day">{stamp.day}</span>
							<span class="month lab-mono">{stamp.month}</span>
						</time>
						<div class="body">
							<h4 data-preserve-case>{entry.title}</h4>
							<span class="year lab-mono">{entry.date.slice(0, 4)}</span>
						</div>
					</div>
				{:else}
					<span class="node" aria-hidden="true"></span>
					<time class="stamp" datetime={entry.date}>
						<span class="day">{stamp.day}</span>
						<span class="month lab-mono">{stamp.month}</span>
					</time>
					<div class="body">
						<h4 data-preserve-case>{entry.title}</h4>
						<span class="year lab-mono">{entry.date.slice(0, 4)}</span>
					</div>
				{/if}
			</li>
		{/each}
	</ol>

	<p class="foot lab-mono">
		{native ? 'running on native scroll-driven animations' : 'observer fallback in use'}
	</p>
</div>

<style lang="scss">
	.log {
		position: relative;
		padding-left: clamp(2.25rem, 5vw, 3.25rem);
	}

	.rail {
		position: absolute;
		left: clamp(0.9rem, 2vw, 1.4rem);
		top: 0.4rem;
		bottom: 2.4rem;
		width: 2px;
	}

	.rail-track,
	.rail-fill {
		position: absolute;
		inset: 0;
		border-radius: 999px;
	}

	.rail-track {
		background: var(--lab-hairline);
	}

	.rail-fill {
		background: linear-gradient(
			to bottom,
			var(--lab-accent),
			color-mix(in srgb, var(--lab-accent) 35%, transparent)
		);
		transform-origin: top center;
		transform: scaleY(1);
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(1.1rem, 2.5vw, 1.6rem);
	}

	.entry,
	.revealer {
		position: relative;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: 0.9rem;
	}

	.revealer {
		grid-column: 1 / -1;
	}

	.node {
		position: absolute;
		left: calc(clamp(2.25rem, 5vw, 3.25rem) * -1 + clamp(0.9rem, 2vw, 1.4rem) - 4px);
		width: 10px;
		height: 10px;
		border-radius: 999px;
		border: 2px solid var(--color-cream);
		background: var(--lab-accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--lab-accent) 22%, transparent);
	}

	.stamp {
		display: grid;
		justify-items: center;
		width: 3rem;
		padding: 0.35rem 0;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
	}

	.day {
		font-family: var(--font-ui);
		font-size: 1.05rem;
		font-weight: 700;
		line-height: 1;
		color: var(--color-heading);
		font-variant-numeric: tabular-nums;
	}

	.month {
		font-size: 0.54rem;
		color: var(--color-subtle);
	}

	.body {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 0;
		padding-bottom: 0.65rem;
		border-bottom: 1px dashed var(--lab-hairline);
	}

	h4 {
		margin: 0;
		font-family: var(--font-ui);
		font-size: clamp(0.95rem, 1.5vw, 1.08rem);
		font-weight: 550;
		letter-spacing: -0.015em;
		color: var(--color-heading);
	}

	.year {
		flex: 0 0 auto;
		font-size: 0.56rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}

	.foot {
		margin: 1.5rem 0 0;
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.6;
	}

	// --- native scroll-driven path -------------------------------------------
	// Progress is a function of scroll position, not of time, so the rail is
	// scrubbable both ways and costs nothing on the main thread.
	@supports (animation-timeline: view()) {
		.log.native .rail-fill {
			animation: draw linear both;
			animation-timeline: view();
			animation-range: entry 30% exit 45%;
		}

		.log.native .entry {
			animation: rise linear both;
			animation-timeline: view();
			animation-range: entry 5% cover 32%;
		}

		.log.native .node {
			animation: pop linear both;
			animation-timeline: view();
			animation-range: entry 12% cover 30%;
		}
	}

	@keyframes draw {
		from {
			transform: scaleY(0);
		}
		to {
			transform: scaleY(1);
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translate3d(0, 26px, 0);
			filter: blur(3px);
		}
		to {
			opacity: 1;
			transform: none;
			filter: blur(0);
		}
	}

	@keyframes pop {
		from {
			transform: scale(0.2);
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--lab-accent) 22%, transparent);
		}
		to {
			transform: scale(1);
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--lab-accent) 22%, transparent);
		}
	}

	@media (max-width: 520px) {
		.body {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.15rem;
		}
	}
</style>
