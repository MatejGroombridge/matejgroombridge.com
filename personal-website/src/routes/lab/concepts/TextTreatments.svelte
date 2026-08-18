<script lang="ts">
	import { onMount } from 'svelte';

	const GLYPHS = '▓▒░#@%&$*+=-_/\\|<>[]{}';
	const PHRASE = 'Notes from a slow web';

	let scrambled = $state(PHRASE);
	let highlightOn = $state(false);
	let blurOn = $state(false);
	let host = $state<HTMLDivElement>();

	const blurWords = 'Everything here is hand-made, on purpose, and rarely finished.'.split(' ');

	function runScramble() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			scrambled = PHRASE;
			return;
		}

		const target = PHRASE.split('');
		// Each character gets its own reveal frame, so the phrase resolves left to
		// right with a ragged edge instead of snapping all at once.
		const settleAt = target.map((_, i) => 8 + i * 2.2 + Math.random() * 10);
		let frame = 0;
		let raf = 0;

		const tick = () => {
			const out = target.map((char, i) => {
				if (char === ' ') return ' ';
				if (frame >= settleAt[i]) return char;
				return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
			});
			scrambled = out.join('');
			frame++;
			if (frame <= Math.max(...settleAt) + 1) raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}

	onMount(() => {
		if (!host) return;
		let cancelScramble: (() => void) | undefined;

		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				cancelScramble = runScramble();
				setTimeout(() => (highlightOn = true), 260);
				setTimeout(() => (blurOn = true), 120);
				io.disconnect();
			},
			{ threshold: 0.35 }
		);
		io.observe(host);

		return () => {
			io.disconnect();
			cancelScramble?.();
		};
	});

	function replay() {
		highlightOn = false;
		blurOn = false;
		requestAnimationFrame(() => {
			runScramble();
			highlightOn = true;
			blurOn = true;
		});
	}
</script>

<div class="treatments" bind:this={host}>
	<div class="row">
		<span class="tag lab-mono">01 · decode</span>
		<h4 class="scramble" aria-label={PHRASE}>
			<span aria-hidden="true">{scrambled}</span>
		</h4>
	</div>

	<div class="row">
		<span class="tag lab-mono">02 · marker</span>
		<p class="marker">
			I write these notes
			<span class="mark" class:on={highlightOn}>
				<span class="mark-text">mostly for myself</span>
				<!-- A hand-drawn marker stroke: two overlapping strokes with a slight
				     wobble, drawn on with stroke-dashoffset. -->
				<svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
					<path
						d="M4 27 C 60 19, 120 33, 180 24 S 262 18, 296 26"
						fill="none"
						stroke="currentColor"
						stroke-width="19"
						stroke-linecap="round"
					/>
					<path
						d="M10 33 C 70 28, 140 38, 210 30 S 268 27, 292 32"
						fill="none"
						stroke="currentColor"
						stroke-width="9"
						stroke-linecap="round"
						opacity="0.55"
					/>
				</svg>
			</span>
			— the fact you are reading them is a happy accident.
		</p>
	</div>

	<div class="row">
		<span class="tag lab-mono">03 · focus pull</span>
		<p class="blur" class:on={blurOn}>
			{#each blurWords as word, i (i)}
				<span style={`--d:${i * 55}ms`}>{word}</span>{' '}
			{/each}
		</p>
	</div>

	<button class="replay lab-mono" type="button" onclick={replay}>replay ↺</button>
</div>

<style lang="scss">
	.treatments {
		display: grid;
		gap: clamp(1.4rem, 3vw, 2.2rem);
	}

	.row {
		display: grid;
		grid-template-columns: 6.5rem minmax(0, 1fr);
		gap: 1rem;
		align-items: baseline;
	}

	.tag {
		font-size: 0.55rem;
		color: var(--lab-accent);
		opacity: 0.85;
	}

	.scramble {
		margin: 0;
		font-family: var(--lab-mono);
		font-size: clamp(1.15rem, 3vw, 2rem);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--color-heading);
		// Fixed advance width keeps the line from reflowing while it resolves.
		font-variant-ligatures: none;
		white-space: pre;
		overflow-x: hidden;
	}

	.marker,
	.blur {
		margin: 0;
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		line-height: 1.7;
		color: var(--color-ink);
	}

	.mark {
		position: relative;
		display: inline-block;
		color: color-mix(in srgb, var(--lab-accent) 55%, transparent);
		white-space: nowrap;
	}

	.mark-text {
		position: relative;
		z-index: 1;
		color: var(--color-heading);
		font-weight: 600;
	}

	.mark svg {
		position: absolute;
		left: -0.35em;
		right: -0.35em;
		top: 0.05em;
		width: calc(100% + 0.7em);
		height: 1.15em;
		z-index: 0;
	}

	.mark path {
		stroke-dasharray: 320;
		stroke-dashoffset: 320;
	}

	.mark.on path {
		animation: draw 620ms cubic-bezier(0.5, 0, 0.2, 1) forwards;
	}

	.mark.on path:nth-child(2) {
		animation-delay: 120ms;
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	.blur span {
		display: inline-block;
		opacity: 0;
		filter: blur(8px);
		transform: translateY(6px);
	}

	.blur.on span {
		animation: focus 620ms cubic-bezier(0.2, 0.8, 0.3, 1) var(--d) forwards;
	}

	@keyframes focus {
		to {
			opacity: 1;
			filter: blur(0);
			transform: none;
		}
	}

	.replay {
		justify-self: start;
		margin-left: 7.5rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	@media (max-width: 620px) {
		.row {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}

		.replay {
			margin-left: 0;
		}
	}
</style>
