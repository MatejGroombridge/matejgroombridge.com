<script lang="ts">
	import { onMount } from 'svelte';

	type Blob = {
		x: number;
		y: number;
		r: number;
		hue: number;
		sx: number;
		sy: number;
		px: number;
		py: number;
	};

	let canvas = $state<HTMLCanvasElement>();
	let wrap = $state<HTMLDivElement>();

	onMount(() => {
		const el = canvas;
		const host = wrap;
		if (!el || !host) return;

		const ctx = el.getContext('2d');
		if (!ctx) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
		let width = 0;
		let height = 0;

		// Six slow-drifting radial blooms. Painted at quarter resolution and
		// stretched back up by CSS — the upscale blur is what sells the aurora and
		// keeps the per-frame cost near zero.
		const blobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
			x: Math.random(),
			y: Math.random(),
			r: 0.34 + Math.random() * 0.3,
			hue: i,
			sx: 0.06 + Math.random() * 0.09,
			sy: 0.05 + Math.random() * 0.08,
			px: Math.random() * Math.PI * 2,
			py: Math.random() * Math.PI * 2
		}));

		function palette() {
			const styles = getComputedStyle(host!);
			const accent = styles.getPropertyValue('--lab-accent').trim() || '#00ab44';
			const soft = styles.getPropertyValue('--color-green-soft').trim() || '#57ba86';
			const surface = styles.getPropertyValue('--color-surface').trim() || '#fffdf8';
			return [accent, soft, surface, accent, soft, surface];
		}

		let colours = palette();

		function resize() {
			const rect = host!.getBoundingClientRect();
			// Quarter-res buffer: the CSS blur hides every bit of the lost detail.
			width = el!.width = Math.max(1, Math.round(rect.width / 4));
			height = el!.height = Math.max(1, Math.round(rect.height / 4));
			colours = palette();
		}

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(host);

		const themeObserver = new MutationObserver(() => {
			colours = palette();
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		let raf = 0;
		let visible = true;

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (visible && !raf) raf = requestAnimationFrame(frame);
			},
			{ threshold: 0 }
		);
		io.observe(host);

		function paint(t: number) {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			ctx.globalCompositeOperation = 'lighter';

			for (let i = 0; i < blobs.length; i++) {
				const b = blobs[i];
				const cx = (0.5 + Math.sin(t * b.sx + b.px) * 0.42) * width;
				const cy = (0.5 + Math.cos(t * b.sy + b.py) * 0.42) * height;
				const radius = b.r * Math.max(width, height);

				const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
				grad.addColorStop(0, colours[i % colours.length]);
				grad.addColorStop(1, 'transparent');
				ctx.fillStyle = grad;
				ctx.globalAlpha = 0.42;
				ctx.beginPath();
				ctx.arc(cx, cy, radius, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'source-over';
		}

		function frame(now: number) {
			raf = 0;
			if (!visible) return;
			paint(now / 1000);
			raf = requestAnimationFrame(frame);
		}

		if (reduce.matches) {
			paint(0);
		} else {
			raf = requestAnimationFrame(frame);
		}

		return () => {
			ro.disconnect();
			io.disconnect();
			themeObserver.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="aurora lab-grain" bind:this={wrap}>
	<canvas bind:this={canvas} aria-hidden="true"></canvas>
	<div class="veil" aria-hidden="true"></div>
	<div class="content">
		<span class="lab-chip" data-tone="accent">melbourne · 37.8°s</span>
		<h3>Software by day,<br />a camera the rest of the time.</h3>
		<p>
			A living index of what I&rsquo;m building, reading and shooting — updated far more often than
			it is redesigned.
		</p>
		<div class="actions">
			<a class="btn primary" href="/photography">See the photographs</a>
			<a class="btn ghost" href="/booknotes">Read the book notes</a>
		</div>
	</div>
</div>

<style lang="scss">
	.aurora {
		position: relative;
		display: grid;
		place-items: center;
		min-height: clamp(320px, 46vw, 460px);
		padding: clamp(1.75rem, 5vw, 3.5rem);
		border-radius: var(--radius-md);
		overflow: hidden;
		isolation: isolate;
		background: var(--color-surface);
	}

	canvas {
		position: absolute;
		inset: -12%;
		width: 124%;
		height: 124%;
		// The buffer is a sixteenth of the pixels; blur turns that into gradient.
		filter: blur(46px) saturate(1.35);
		opacity: 0.85;
		z-index: -2;
	}

	// Knocks the aurora back so text keeps its contrast in both themes.
	.veil {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--color-surface) 55%, transparent),
			color-mix(in srgb, var(--color-surface) 88%, transparent)
		);
	}

	.content {
		display: grid;
		justify-items: center;
		gap: 1rem;
		max-width: 46ch;
		text-align: center;
	}

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 4.2vw, 3rem);
		font-weight: 500;
		line-height: 1.08;
		letter-spacing: -0.03em;
		font-variation-settings: 'SOFT' 45;
	}

	p {
		margin: 0;
		color: var(--color-subtle);
		font-size: clamp(0.95rem, 1.2vw, 1.05rem);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.35rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		padding: 0 1.1rem;
		border: 1px solid transparent;
		border-radius: 999px;
		font-family: var(--font-ui);
		font-size: 0.88rem;
		font-weight: 600;
		text-decoration: none;
		backdrop-filter: blur(8px);
		transition:
			transform var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-soft);
	}

	.primary {
		background: var(--lab-accent);
		color: #fff;
	}

	.ghost {
		border-color: var(--lab-hairline);
		background: color-mix(in srgb, var(--color-surface) 62%, transparent);
		color: var(--color-heading);
	}
</style>
