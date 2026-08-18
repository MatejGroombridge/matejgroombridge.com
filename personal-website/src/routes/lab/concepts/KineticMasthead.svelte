<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { word?: string; kicker?: string };
	let { word = 'Groombridge', kicker = 'photographer / builder / reader' }: Props = $props();

	const letters = $derived(word.split(''));

	let stage = $state<HTMLDivElement>();
	let spans: HTMLSpanElement[] = [];

	/** Pointer position in stage space; `-1` means "no pointer, run the idle wave". */
	let pointerX = -1;
	let pointerY = 0;
	let hovering = false;

	// Per-letter eased state, filled lazily so it survives a change of `word`.
	const current: number[] = [];
	const target: number[] = [];

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			for (const span of spans) span?.style.setProperty('--k', '0.35');
			return;
		}

		let raf = 0;
		let running = true;
		const start = performance.now();

		const observer = new IntersectionObserver(
			([entry]) => {
				running = entry.isIntersecting;
				if (running && !raf) raf = requestAnimationFrame(tick);
			},
			{ threshold: 0 }
		);
		if (stage) observer.observe(stage);

		function tick(now: number) {
			raf = 0;
			if (!running) return;

			const t = (now - start) / 1000;

			for (let i = 0; i < spans.length; i++) {
				const span = spans[i];
				if (!span) continue;

				if (hovering && pointerX >= 0) {
					// Distance from the pointer to this glyph's centre, normalised by a
					// falloff radius so nearby letters bloom and distant ones stay calm.
					const box = span.offsetLeft + span.offsetWidth / 2;
					const dx = (pointerX - box) / 190;
					const dy = pointerY / 260;
					target[i] = Math.max(0, 1 - Math.hypot(dx, dy));
				} else {
					// Idle: a slow wave travels along the word so it never sits dead.
					target[i] = ((Math.sin(t * 1.5 - i * 0.42) + 1) / 2) * 0.45;
				}

				const at = current[i] ?? 0;
				current[i] = at + (target[i] - at) * 0.14;
				span.style.setProperty('--k', current[i].toFixed(4));
			}

			raf = requestAnimationFrame(tick);
		}

		raf = requestAnimationFrame(tick);

		return () => {
			observer.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});

	function onMove(event: PointerEvent) {
		if (!stage) return;
		const rect = stage.getBoundingClientRect();
		pointerX = event.clientX - rect.left;
		pointerY = event.clientY - rect.top - rect.height / 2;
		hovering = true;
	}

	function onLeave() {
		hovering = false;
		pointerX = -1;
	}
</script>

<div
	class="stage lab-grain"
	bind:this={stage}
	onpointermove={onMove}
	onpointerleave={onLeave}
	role="presentation"
>
	<p class="kicker lab-mono">{kicker}</p>
	<h3 class="word" aria-label={word}>
		{#each letters as letter, i (i)}
			<span class="letter" bind:this={spans[i]} aria-hidden="true">{letter}</span>
		{/each}
	</h3>
	<div class="rule"><span class="rule-fill"></span></div>
	<p class="hint lab-mono">move your cursor across the name</p>
</div>

<style lang="scss">
	.stage {
		position: relative;
		display: grid;
		gap: 0.9rem;
		justify-items: start;
		padding: clamp(1.5rem, 4vw, 3rem) clamp(0.5rem, 2vw, 1.5rem);
		border-radius: var(--radius-md);
		background:
			radial-gradient(
				120% 140% at 8% 0%,
				color-mix(in srgb, var(--lab-accent) 12%, transparent),
				transparent 62%
			),
			var(--color-surface);
		overflow: hidden;
		touch-action: pan-y;
	}

	.kicker,
	.hint {
		margin: 0;
		font-size: 0.62rem;
		color: var(--color-subtle);
	}

	.hint {
		opacity: 0.62;
	}

	.word {
		display: flex;
		flex-wrap: nowrap;
		margin: 0;
		font-family: var(--lab-kinetic);
		font-size: clamp(2.4rem, 10.5vw, 7rem);
		line-height: 0.94;
		letter-spacing: -0.02em;
		color: var(--color-heading);
		user-select: none;
	}

	// `--k` (0 → 1) is written per glyph by the rAF loop. Everything visual is
	// derived from it, so the animation is one custom property wide.
	.letter {
		--k: 0;
		display: inline-block;
		font-variation-settings:
			'opsz' calc(9 + 135 * var(--k)),
			'wght' calc(280 + 620 * var(--k)),
			'SOFT' calc(100 * var(--k)),
			'WONK' var(--k);
		transform: translateY(calc(var(--k) * -0.07em)) scaleY(calc(1 + var(--k) * 0.055));
		color: color-mix(in srgb, var(--lab-accent) calc(var(--k) * 62%), var(--color-heading));
		will-change: font-variation-settings, transform;
	}

	.rule {
		width: 100%;
		height: 2px;
		background: var(--lab-hairline);
		overflow: hidden;
	}

	.rule-fill {
		display: block;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, var(--lab-accent), transparent);
		animation: sweep 4.5s ease-in-out infinite;
	}

	@keyframes sweep {
		0%,
		100% {
			transform: translateX(-100%);
		}
		50% {
			transform: translateX(100%);
		}
	}
</style>
