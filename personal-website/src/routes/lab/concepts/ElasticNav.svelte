<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { options?: string[] };
	let { options = ['All', 'Photography', 'Book notes', 'Writing', 'Projects'] }: Props = $props();

	let selected = $state(0);
	let hovered = $state<number | null>(null);
	let list = $state<HTMLDivElement>();
	let indicator = $state<HTMLSpanElement>();
	let buttons: HTMLButtonElement[] = [];

	onMount(() => {
		if (!list || !indicator) return;

		// A tiny critically-under-damped spring. The overshoot is the whole point:
		// a CSS transition arrives politely, a spring arrives with momentum, and
		// the squash is read straight off its velocity.
		const STIFFNESS = 0.16;
		const DAMPING = 0.74;

		let x = 0;
		let vx = 0;
		let w = 0;
		let vw = 0;
		let raf = 0;
		let settled = false;

		function targetFor(index: number) {
			const button = buttons[index];
			if (!button) return null;
			return { x: button.offsetLeft, w: button.offsetWidth };
		}

		function frame() {
			raf = 0;
			// Hovering leans the pill part-way toward the hovered item without
			// committing to it — the nav acknowledges the cursor before the click.
			const base = targetFor(selected);
			const lean = hovered != null ? targetFor(hovered) : null;
			if (!base) return;

			const target = lean
				? { x: base.x + (lean.x - base.x) * 0.22, w: base.w + (lean.w - base.w) * 0.22 }
				: base;

			vx = (vx + (target.x - x) * STIFFNESS) * DAMPING;
			vw = (vw + (target.w - w) * STIFFNESS) * DAMPING;
			x += vx;
			w += vw;

			// Squash along travel, stretch across it, conserving apparent volume.
			const squash = Math.min(0.32, Math.abs(vx) / 62);

			if (indicator) {
				indicator.style.transform = `translate3d(${x.toFixed(2)}px,0,0) scale(${(
					1 + squash
				).toFixed(3)}, ${(1 - squash * 0.55).toFixed(3)})`;
				indicator.style.width = `${w.toFixed(2)}px`;
			}

			settled = Math.abs(vx) < 0.02 && Math.abs(vw) < 0.02 && Math.abs(target.x - x) < 0.3;
			if (!settled) raf = requestAnimationFrame(frame);
		}

		function kick() {
			if (!raf) raf = requestAnimationFrame(frame);
		}

		const initial = targetFor(0);
		if (initial) {
			x = initial.x;
			w = initial.w;
			indicator.style.width = `${w}px`;
			indicator.style.transform = `translate3d(${x}px,0,0)`;
			indicator.style.opacity = '1';
		}

		// Any change to selection or hover restarts the spring.
		const stop = $effect.root(() => {
			$effect(() => {
				void selected;
				void hovered;
				kick();
			});
		});

		const ro = new ResizeObserver(kick);
		ro.observe(list);

		return () => {
			stop();
			ro.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});

	// Roving tabindex: the newly selected tab is the only tabbable one, so focus
	// has to follow the selection or the keyboard user is left on a -1 element.
	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const step = event.key === 'ArrowRight' ? 1 : -1;
		selected = (selected + step + options.length) % options.length;
		buttons[selected]?.focus();
	}
</script>

<div class="nav-demo">
	<div
		class="segmented"
		bind:this={list}
		role="tablist"
		aria-label="Filter"
		tabindex="-1"
		onmouseleave={() => (hovered = null)}
	>
		<span class="indicator" bind:this={indicator} aria-hidden="true"></span>
		{#each options as option, i (option)}
			<button
				class="seg"
				class:on={selected === i}
				bind:this={buttons[i]}
				type="button"
				role="tab"
				aria-selected={selected === i}
				tabindex={selected === i ? 0 : -1}
				onclick={() => (selected = i)}
				onkeydown={onKeydown}
				onmouseenter={() => (hovered = i)}
				onfocus={() => (hovered = i)}
			>
				{option}
			</button>
		{/each}
	</div>

	<p class="echo">
		Showing <b data-preserve-case>{options[selected]}</b> — arrow keys work too.
	</p>
</div>

<style lang="scss">
	.nav-demo {
		display: grid;
		gap: 0.9rem;
		justify-items: start;
	}

	// Deliberately nowrap: the indicator is positioned from `offsetLeft` alone,
	// so a wrapped second row would leave it stranded on the first.
	.segmented {
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		gap: 0.15rem;
		max-width: 100%;
		padding: 0.28rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-muted);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.segmented::-webkit-scrollbar {
		display: none;
	}

	.indicator {
		position: absolute;
		top: 0.28rem;
		left: 0;
		height: calc(100% - 0.56rem);
		border-radius: 999px;
		background: var(--color-surface);
		box-shadow: var(--shadow-subtle);
		opacity: 0;
		transform-origin: center;
		will-change: transform, width;
	}

	.seg {
		position: relative;
		z-index: 1;
		padding: 0.5rem 0.95rem;
		border: none;
		border-radius: 999px;
		background: none;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-subtle);
		white-space: nowrap;
		transition: color 200ms ease;
	}

	.seg.on {
		color: var(--color-heading);
	}

	.seg:hover {
		color: var(--color-heading);
	}

	.echo {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-subtle);
	}

	.echo b {
		color: var(--lab-accent);
	}
</style>
