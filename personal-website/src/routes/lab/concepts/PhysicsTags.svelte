<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { tags?: string[] };
	let {
		tags = [
			'SvelteKit',
			'TypeScript',
			'photography',
			'Sony α6700',
			'trail running',
			'Atlassian',
			'SCSS',
			'book notes',
			'film',
			'Melbourne',
			'design systems',
			'espresso',
			'Figma',
			'long walks'
		]
	}: Props = $props();

	let host = $state<HTMLDivElement>();
	let ready = $state(false);
	let flipped = $state(false);

	let api: {
		shake: () => void;
		flip: () => void;
		reset: () => void;
	} | null = null;

	onMount(() => {
		let disposed = false;
		let cleanup: (() => void) | undefined;

		// matter-js touches `window` at import time, so it can only be pulled in
		// on the client — hence the dynamic import rather than a static one.
		void (async () => {
			const Matter = await import('matter-js');
			if (disposed || !host) return;

			const { Engine, Runner, World, Bodies, Body, Composite, Mouse, MouseConstraint, Events } =
				Matter;

			const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0011 } });
			const world = engine.world;

			const chips = Array.from(host.querySelectorAll<HTMLElement>('.chip'));
			const rect = host.getBoundingClientRect();
			const W = rect.width;
			const H = rect.height;
			const WALL = 200;
			// Tags are dropped in from above, so the ceiling has to sit above the
			// whole spawn band — otherwise they land on top of it and never arrive.
			const CEILING = -420;

			const walls = [
				Bodies.rectangle(W / 2, H + WALL / 2, W * 3, WALL, { isStatic: true }),
				Bodies.rectangle(W / 2, CEILING - WALL / 2, W * 3, WALL, { isStatic: true }),
				Bodies.rectangle(-WALL / 2, H / 2, WALL, (H - CEILING) * 2, { isStatic: true }),
				Bodies.rectangle(W + WALL / 2, H / 2, WALL, (H - CEILING) * 2, { isStatic: true })
			];
			World.add(world, walls);

			/** A spawn point in the band between the ceiling and the top of the pit. */
			const dropAt = () => ({
				x: 40 + Math.random() * Math.max(1, W - 80),
				y: -40 - Math.random() * 320
			});

			const bodies = chips.map((chip) => {
				const size = chip.getBoundingClientRect();
				const spawn = dropAt();
				const body = Bodies.rectangle(spawn.x, spawn.y, size.width, size.height, {
					chamfer: { radius: Math.min(size.width, size.height) / 2 - 1 },
					restitution: 0.55,
					friction: 0.28,
					frictionAir: 0.012,
					density: 0.0016
				});
				Body.setAngle(body, (Math.random() - 0.5) * 0.6);
				return { chip, body, size };
			});
			World.add(
				world,
				bodies.map((entry) => entry.body)
			);

			const mouse = Mouse.create(host);
			const mouseConstraint = MouseConstraint.create(engine, {
				mouse,
				constraint: { stiffness: 0.18, render: { visible: false } }
			});
			World.add(world, mouseConstraint);

			// Matter binds a wheel handler to steal zoom gestures; drop it so the
			// page keeps scrolling normally when the cursor is over the pit.
			const wheelHandler = (mouse as unknown as { mousewheel: (event: Event) => void }).mousewheel;
			mouse.element.removeEventListener('wheel', wheelHandler);
			mouse.element.removeEventListener('DOMMouseScroll', wheelHandler);

			const sync = () => {
				for (const { chip, body, size } of bodies) {
					chip.style.transform = `translate3d(${body.position.x - size.width / 2}px, ${
						body.position.y - size.height / 2
					}px, 0) rotate(${body.angle}rad)`;
				}
			};
			Events.on(engine, 'afterUpdate', sync);

			const runner = Runner.create();
			Runner.run(runner, engine);
			ready = true;

			api = {
				shake() {
					for (const { body } of bodies) {
						Body.setVelocity(body, {
							x: (Math.random() - 0.5) * 22,
							y: -6 - Math.random() * 12
						});
						Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
					}
				},
				flip() {
					flipped = !flipped;
					engine.gravity.y = flipped ? -1 : 1;
					api?.shake();
				},
				reset() {
					for (const { body } of bodies) {
						Body.setPosition(body, dropAt());
						Body.setVelocity(body, { x: 0, y: 0 });
						Body.setAngularVelocity(body, 0);
					}
					flipped = false;
					engine.gravity.y = 1;
				}
			};

			// Pause the solver when the pit is off-screen — it is a physics loop,
			// not decoration, and there is no reason to burn cycles unseen.
			const io = new IntersectionObserver(
				([entry]) => {
					runner.enabled = entry.isIntersecting;
				},
				{ threshold: 0 }
			);
			io.observe(host);

			cleanup = () => {
				io.disconnect();
				Runner.stop(runner);
				Events.off(engine, 'afterUpdate', sync);
				Composite.clear(world, false);
				Engine.clear(engine);
			};
		})();

		return () => {
			disposed = true;
			cleanup?.();
		};
	});
</script>

<div class="pit-wrap">
	<div class="pit lab-grid-bg" class:ready bind:this={host}>
		{#each tags as tag (tag)}
			<span class="chip" data-preserve-case>{tag}</span>
		{/each}
		{#if !ready}
			<span class="loading lab-mono">warming up the solver…</span>
		{/if}
	</div>

	<div class="tools">
		<button type="button" onclick={() => api?.shake()}>Shake</button>
		<button type="button" onclick={() => api?.flip()}>
			{flipped ? 'Gravity: up' : 'Gravity: down'}
		</button>
		<button type="button" onclick={() => api?.reset()}>Drop again</button>
		<span class="lab-mono note">grab and throw them</span>
	</div>
</div>

<style lang="scss">
	.pit-wrap {
		display: grid;
		gap: 0.75rem;
	}

	.pit {
		position: relative;
		height: clamp(280px, 38vw, 380px);
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		overflow: hidden;
		cursor: grab;
		touch-action: none;
		opacity: 0;
		transition: opacity 400ms ease;
	}

	.pit.ready {
		opacity: 1;
	}

	.pit:active {
		cursor: grabbing;
	}

	.chip {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-flex;
		align-items: center;
		padding: 0.42rem 0.85rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--lab-accent) 35%, transparent);
		background: color-mix(in srgb, var(--lab-accent) 12%, var(--color-surface));
		font-family: var(--font-ui);
		font-size: 0.82rem;
		font-weight: 600;
		white-space: nowrap;
		color: var(--color-heading);
		box-shadow: var(--shadow-subtle);
		user-select: none;
		will-change: transform;
	}

	// Every third chip inverts, so the pile has some rhythm rather than reading
	// as one flat wall of outlines.
	.chip:nth-child(3n) {
		background: var(--lab-accent);
		border-color: var(--lab-accent);
		color: #fff;
	}

	.loading {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		font-size: 0.58rem;
		color: var(--color-subtle);
	}

	.tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
	}

	button {
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-heading);
		transition: border-color var(--duration-fast) ease;
	}

	button:hover {
		border-color: var(--lab-accent);
	}

	.note {
		margin-left: 0.3rem;
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}
</style>
