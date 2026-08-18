<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { items?: string[] };
	let {
		items = [
			'photography',
			'book notes',
			'svelte',
			'long runs',
			'film cameras',
			'typography',
			'melbourne',
			'side projects'
		]
	}: Props = $props();

	// Two identical copies sit end to end so the offset can wrap without a seam.
	const lane = $derived([...items, ...items]);

	let host = $state<HTMLDivElement>();
	let trackA = $state<HTMLDivElement>();
	let trackB = $state<HTMLDivElement>();

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !host) return;

		let lastY = window.scrollY;
		let velocity = 0;
		let offsetA = 0;
		let offsetB = 0;
		let raf = 0;
		let visible = true;

		function onScroll() {
			const y = window.scrollY;
			// Clamped so a flick of the wheel can't fling the lane off-screen.
			velocity += Math.max(-60, Math.min(60, y - lastY));
			lastY = y;
		}

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (visible && !raf) raf = requestAnimationFrame(frame);
			},
			{ threshold: 0 }
		);
		io.observe(host);

		// Keep the offset inside (-width, 0] so the seam between the two copies of
		// the lane never enters the viewport, whichever way the track is moving.
		function wrap(value: number, width: number) {
			if (!width) return value;
			return -(((-value % width) + width) % width);
		}

		function frame() {
			raf = 0;
			if (!visible) return;

			velocity *= 0.9;
			const drift = 0.55 + velocity * 0.12;

			const widthA = (trackA?.scrollWidth ?? 0) / 2;
			const widthB = (trackB?.scrollWidth ?? 0) / 2;

			offsetA = wrap(offsetA - drift, widthA);
			offsetB = wrap(offsetB + drift * 0.72, widthB);

			// Skew and weight ride the same velocity, so the whole band leans into
			// the scroll and relaxes back to upright when the page settles.
			const skew = Math.max(-9, Math.min(9, -velocity * 0.28));
			host?.style.setProperty('--skew', `${skew.toFixed(2)}deg`);
			host?.style.setProperty('--rush', Math.min(1, Math.abs(velocity) / 34).toFixed(3));

			if (trackA) trackA.style.transform = `translate3d(${offsetA.toFixed(2)}px,0,0)`;
			if (trackB) trackB.style.transform = `translate3d(${offsetB.toFixed(2)}px,0,0)`;

			raf = requestAnimationFrame(frame);
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		raf = requestAnimationFrame(frame);

		return () => {
			window.removeEventListener('scroll', onScroll);
			io.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="ticker" bind:this={host} aria-hidden="true">
	<div class="lane">
		<div class="track" bind:this={trackA}>
			{#each lane as item, i (i)}
				<span class="word">{item}</span><span class="dot">◆</span>
			{/each}
		</div>
	</div>
	<div class="lane outline">
		<div class="track" bind:this={trackB}>
			{#each lane as item, i (i)}
				<span class="word">{item}</span><span class="dot">◆</span>
			{/each}
		</div>
	</div>
</div>
<p class="sr-only">Interests: {items.join(', ')}.</p>

<style lang="scss">
	.ticker {
		--skew: 0deg;
		--rush: 0;
		display: grid;
		gap: 0.2rem;
		padding: clamp(1rem, 3vw, 2rem) 0;
		overflow: hidden;
		transform: skewY(var(--skew));
		transition: transform 60ms linear;
	}

	.lane {
		overflow: hidden;
		white-space: nowrap;
	}

	.track {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		will-change: transform;
	}

	.word {
		font-family: var(--lab-kinetic);
		font-size: clamp(1.8rem, 5.5vw, 3.6rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		color: var(--color-heading);
		// Weight and optical size track the scroll rush, so the band physically
		// thickens as the page moves.
		font-variation-settings:
			'wght' calc(340 + 420 * var(--rush)),
			'opsz' calc(20 + 120 * var(--rush)),
			'SOFT' calc(80 * var(--rush));
	}

	.outline .word {
		color: transparent;
		-webkit-text-stroke: 1px color-mix(in srgb, var(--color-ink) 38%, transparent);
	}

	.dot {
		font-size: clamp(0.5rem, 1.2vw, 0.8rem);
		color: var(--lab-accent);
		transform: translateY(-0.45em);
		opacity: calc(0.35 + 0.65 * var(--rush));
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
</style>
