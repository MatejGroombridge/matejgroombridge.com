<script lang="ts">
	type Reaction = { emoji: string; label: string; count: number; mine: boolean };

	let reactions = $state<Reaction[]>([
		{ emoji: '👏', label: 'applause', count: 34, mine: false },
		{ emoji: '🤔', label: 'thinking', count: 12, mine: false },
		{ emoji: '📷', label: 'nice frame', count: 27, mine: false },
		{ emoji: '🔥', label: 'fire', count: 8, mine: false }
	]);

	type Particle = { id: number; emoji: string; dx: number; dy: number; rot: number; scale: number };
	let particles = $state<Particle[]>([]);
	let seq = 0;

	function burst(reaction: Reaction, count: number) {
		const spawned: Particle[] = Array.from({ length: count }, () => ({
			id: seq++,
			emoji: reaction.emoji,
			// Cone upward: a spread of ±55° off vertical, with varied throw length.
			dx: (Math.random() - 0.5) * 130,
			dy: -70 - Math.random() * 90,
			rot: (Math.random() - 0.5) * 120,
			scale: 0.7 + Math.random() * 0.8
		}));
		particles = [...particles, ...spawned];

		const ids = new Set(spawned.map((p) => p.id));
		setTimeout(() => {
			particles = particles.filter((p) => !ids.has(p.id));
		}, 1100);
	}

	function toggle(index: number) {
		const reaction = reactions[index];
		const mine = !reaction.mine;
		reactions = reactions.map((item, i) =>
			i === index ? { ...item, mine, count: item.count + (mine ? 1 : -1) } : item
		);
		if (mine) burst(reaction, 12);
	}

	/** Holding a button keeps throwing confetti without inflating the count. */
	let holdTimer: ReturnType<typeof setInterval> | null = null;

	function startHold(index: number) {
		stopHold();
		holdTimer = setInterval(() => burst(reactions[index], 4), 130);
	}

	function stopHold() {
		if (holdTimer) clearInterval(holdTimer);
		holdTimer = null;
	}

	const total = $derived(reactions.reduce((sum, item) => sum + item.count, 0));
</script>

<svelte:window onpointerup={stopHold} />

<div class="reactions">
	<div class="bar">
		{#each reactions as reaction, i (reaction.label)}
			<button
				class="react"
				class:mine={reaction.mine}
				type="button"
				aria-pressed={reaction.mine}
				aria-label={`${reaction.label}, ${reaction.count} reactions`}
				onclick={() => toggle(i)}
				onpointerdown={() => startHold(i)}
				onpointerleave={stopHold}
			>
				<span class="emoji" data-preserve-case>{reaction.emoji}</span>
				<span class="count lab-mono">{reaction.count}</span>

				<span class="stage" aria-hidden="true">
					{#each particles.filter((p) => p.emoji === reaction.emoji) as particle (particle.id)}
						<span
							class="particle"
							style={`--dx:${particle.dx}px; --dy:${particle.dy}px; --rot:${particle.rot}deg; --s:${particle.scale}`}
						>
							{particle.emoji}
						</span>
					{/each}
				</span>
			</button>
		{/each}
	</div>

	<p class="meta lab-mono">
		{total} reactions · tap to react, hold for confetti
	</p>
</div>

<style lang="scss">
	.reactions {
		display: grid;
		gap: 0.7rem;
		justify-items: start;
	}

	.bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.react {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.8rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		transition:
			transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1.4),
			border-color 180ms ease,
			background 180ms ease;
	}

	.react:hover {
		transform: translateY(-2px);
	}

	.react:active {
		transform: translateY(0) scale(0.96);
	}

	.react.mine {
		border-color: var(--lab-accent);
		background: color-mix(in srgb, var(--lab-accent) 12%, var(--color-surface));
	}

	.emoji {
		font-size: 1.05rem;
		line-height: 1;
		transition: transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1.5);
	}

	.react.mine .emoji {
		transform: scale(1.18) rotate(-8deg);
	}

	.count {
		font-size: 0.62rem;
		color: var(--color-subtle);
		font-variant-numeric: tabular-nums;
	}

	.react.mine .count {
		color: var(--lab-accent);
	}

	// Particles are emitted from the button's centre and are allowed to escape
	// its bounds, so the stage is a zero-size anchor rather than an overlay.
	.stage {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 1rem;
		line-height: 1;
		animation: fly 1s cubic-bezier(0.15, 0.7, 0.3, 1) forwards;
	}

	@keyframes fly {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.2);
		}
		12% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--rot))
				scale(var(--s));
		}
	}

	.meta {
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.75;
	}
</style>
