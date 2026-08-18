<script lang="ts">
	import { onMount } from 'svelte';

	type Node = {
		id: string;
		label: string;
		group: 'theme' | 'book' | 'place' | 'craft';
		x: number;
		y: number;
		vx: number;
		vy: number;
		r: number;
		href?: string;
	};

	type Link = { a: number; b: number };

	const raw: { label: string; group: Node['group']; links: string[]; href?: string }[] = [
		{ label: 'Attention', group: 'theme', links: [] },
		{ label: 'Essentialism', group: 'book', links: ['Attention'], href: '/booknotes/essentialism' },
		{ label: 'Deep Work', group: 'book', links: ['Attention'] },
		{ label: 'Endurance', group: 'theme', links: [] },
		{ label: 'Born To Run', group: 'book', links: ['Endurance'], href: '/booknotes/borntorun' },
		{ label: 'Trail running', group: 'craft', links: ['Endurance'] },
		{ label: 'Seeing', group: 'theme', links: [] },
		{ label: 'Photography', group: 'craft', links: ['Seeing'], href: '/photography' },
		{ label: 'Sydney', group: 'place', links: ['Photography'], href: '/photography/sydney25' },
		{ label: 'Japan', group: 'place', links: ['Photography'] },
		{ label: 'Melbourne', group: 'place', links: ['Photography', 'Trail running'] },
		{ label: 'Making', group: 'theme', links: [] },
		{ label: 'SvelteKit', group: 'craft', links: ['Making'] },
		{ label: 'Typography', group: 'craft', links: ['Making', 'Seeing'] },
		{
			label: 'This site',
			group: 'craft',
			links: ['SvelteKit', 'Typography', 'Making'],
			href: '/2026'
		}
	];

	let canvas = $state<HTMLCanvasElement>();
	let wrap = $state<HTMLDivElement>();
	let hoveredLabel = $state<string | null>(null);

	onMount(() => {
		const el = canvas;
		const host = wrap;
		if (!el || !host) return;
		const ctx = el.getContext('2d');
		if (!ctx) return;

		const index = new Map(raw.map((item, i) => [item.label, i]));
		const links: Link[] = [];
		raw.forEach((item, i) => {
			for (const target of item.links) {
				const j = index.get(target);
				if (j != null) links.push({ a: i, b: j });
			}
		});

		let width = 0;
		let height = 0;
		let dpr = 1;

		const nodes: Node[] = raw.map((item) => ({
			id: item.label,
			label: item.label,
			group: item.group,
			x: Math.random(),
			y: Math.random(),
			vx: 0,
			vy: 0,
			r: item.group === 'theme' ? 30 : 13,
			href: item.href
		}));

		function resize() {
			const rect = host!.getBoundingClientRect();
			dpr = Math.min(2, window.devicePixelRatio || 1);
			width = rect.width;
			height = rect.height;
			el!.width = Math.round(width * dpr);
			el!.height = Math.round(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		resize();
		// Seed positions across the box once the size is known.
		for (const node of nodes) {
			node.x = width * (0.15 + Math.random() * 0.7);
			node.y = height * (0.15 + Math.random() * 0.7);
		}

		const ro = new ResizeObserver(resize);
		ro.observe(host);

		let pointer = { x: -9999, y: -9999 };
		let hovered: Node | null = null;

		function onMove(event: PointerEvent) {
			const rect = el!.getBoundingClientRect();
			pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
		}
		function onLeave() {
			pointer = { x: -9999, y: -9999 };
		}
		function onClick() {
			if (hovered?.href) window.location.assign(hovered.href);
		}

		host.addEventListener('pointermove', onMove);
		host.addEventListener('pointerleave', onLeave);
		host.addEventListener('click', onClick);

		function palette() {
			const styles = getComputedStyle(host!);
			return {
				accent: styles.getPropertyValue('--lab-accent').trim() || '#00ab44',
				ink: styles.getPropertyValue('--color-heading').trim() || '#0c100e',
				subtle: styles.getPropertyValue('--color-subtle').trim() || '#4d524f',
				line: styles.getPropertyValue('--lab-hairline').trim() || 'rgba(0,0,0,0.14)',
				surface: styles.getPropertyValue('--color-surface').trim() || '#fff'
			};
		}
		let colours = palette();
		const themeObserver = new MutationObserver(() => (colours = palette()));
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		let raf = 0;
		let visible = true;
		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (visible && !raf) raf = requestAnimationFrame(step);
			},
			{ threshold: 0 }
		);
		io.observe(host);

		const neighbours = new Map<number, Set<number>>();
		for (const { a, b } of links) {
			if (!neighbours.has(a)) neighbours.set(a, new Set());
			if (!neighbours.has(b)) neighbours.set(b, new Set());
			neighbours.get(a)!.add(b);
			neighbours.get(b)!.add(a);
		}

		function simulate() {
			// Repulsion between every pair, spring along every link, and a weak pull
			// to the centre so the graph cannot drift out of frame.
			for (let i = 0; i < nodes.length; i++) {
				const a = nodes[i];
				for (let j = i + 1; j < nodes.length; j++) {
					const b = nodes[j];
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					const distance = Math.max(a.r + b.r, Math.hypot(dx, dy));
					const force = ((a.r + b.r) * 105) / (distance * distance);
					const fx = (dx / distance) * force;
					const fy = (dy / distance) * force;
					a.vx -= fx;
					a.vy -= fy;
					b.vx += fx;
					b.vy += fy;
				}
			}

			for (const { a, b } of links) {
				const p = nodes[a];
				const q = nodes[b];
				const dx = q.x - p.x;
				const dy = q.y - p.y;
				const distance = Math.max(1, Math.hypot(dx, dy));
				const force = (distance - 124) * 0.008;
				const fx = (dx / distance) * force;
				const fy = (dy / distance) * force;
				p.vx += fx;
				p.vy += fy;
				q.vx -= fx;
				q.vy -= fy;
			}

			for (const node of nodes) {
				node.vx += (width / 2 - node.x) * 0.0016;
				node.vy += (height / 2 - node.y) * 0.0016;

				// The cursor gently pushes nodes aside, which makes the graph feel
				// like a physical object rather than a picture.
				const dx = node.x - pointer.x;
				const dy = node.y - pointer.y;
				const distance = Math.hypot(dx, dy);
				if (distance < 120) {
					const push = (120 - distance) * 0.012;
					node.vx += (dx / Math.max(1, distance)) * push;
					node.vy += (dy / Math.max(1, distance)) * push;
				}

				node.vx *= 0.86;
				node.vy *= 0.86;
				node.x = Math.min(width - node.r - 4, Math.max(node.r + 4, node.x + node.vx));
				node.y = Math.min(height - node.r - 4, Math.max(node.r + 4, node.y + node.vy));
			}
		}

		function draw() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			hovered = null;
			let hoveredIndex = -1;
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				if (Math.hypot(node.x - pointer.x, node.y - pointer.y) < node.r + 6) {
					hovered = node;
					hoveredIndex = i;
				}
			}
			hoveredLabel = hovered?.label ?? null;
			el!.style.cursor = hovered?.href ? 'pointer' : 'default';

			const lit = hoveredIndex >= 0 ? neighbours.get(hoveredIndex) : null;

			ctx.lineWidth = 1;
			for (const { a, b } of links) {
				const on = hoveredIndex < 0 || a === hoveredIndex || b === hoveredIndex;
				ctx.strokeStyle = on ? colours.accent : colours.line;
				ctx.globalAlpha = on ? (hoveredIndex < 0 ? 0.32 : 0.85) : 0.12;
				ctx.beginPath();
				ctx.moveTo(nodes[a].x, nodes[a].y);
				ctx.lineTo(nodes[b].x, nodes[b].y);
				ctx.stroke();
			}
			ctx.globalAlpha = 1;

			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				const active = hoveredIndex < 0 || i === hoveredIndex || lit?.has(i);
				const isTheme = node.group === 'theme';

				ctx.globalAlpha = active ? 1 : 0.25;

				ctx.beginPath();
				ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
				ctx.fillStyle = isTheme ? colours.accent : colours.surface;
				ctx.fill();
				ctx.lineWidth = 1.4;
				ctx.strokeStyle = isTheme ? colours.accent : colours.line;
				ctx.stroke();

				if (i === hoveredIndex) {
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.r + 6, 0, Math.PI * 2);
					ctx.strokeStyle = colours.accent;
					ctx.lineWidth = 1;
					ctx.stroke();
				}

				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				if (isTheme) {
					// Shrink to fit the disc rather than spilling outside it.
					let size = 11;
					ctx.font = `600 ${size}px 'Poppins', sans-serif`;
					while (size > 7 && ctx.measureText(node.label).width > node.r * 1.7) {
						size -= 0.5;
						ctx.font = `600 ${size}px 'Poppins', sans-serif`;
					}
					ctx.fillStyle = '#fff';
					ctx.fillText(node.label, node.x, node.y);
				} else {
					ctx.font = `500 10px 'Poppins', sans-serif`;
					ctx.fillStyle = active ? colours.ink : colours.subtle;
					ctx.fillText(node.label, node.x, node.y + node.r + 10);
				}
			}
			ctx.globalAlpha = 1;
		}

		function step() {
			raf = 0;
			if (!visible) return;
			simulate();
			draw();
			raf = requestAnimationFrame(step);
		}

		raf = requestAnimationFrame(step);

		return () => {
			host.removeEventListener('pointermove', onMove);
			host.removeEventListener('pointerleave', onLeave);
			host.removeEventListener('click', onClick);
			ro.disconnect();
			io.disconnect();
			themeObserver.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="graph-wrap">
	<div class="graph lab-grid-bg" bind:this={wrap}>
		<canvas bind:this={canvas} aria-hidden="true"></canvas>
		<span class="badge lab-mono">{hoveredLabel ?? 'what connects to what'}</span>
	</div>

	<ul class="key lab-mono">
		<li><span class="dot theme"></span>theme</li>
		<li><span class="dot other"></span>book · place · craft</li>
		<li class="spacer">hover to isolate · click a lit node to open it</li>
	</ul>
</div>

<p class="sr-only">
	A force-directed map linking themes to the books, places and crafts on this site.
</p>

<style lang="scss">
	.graph-wrap {
		display: grid;
		gap: 0.6rem;
	}

	.graph {
		position: relative;
		height: clamp(320px, 46vw, 440px);
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		overflow: hidden;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}

	.badge {
		position: absolute;
		left: 0.7rem;
		top: 0.65rem;
		padding: 0.22rem 0.5rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-surface) 88%, transparent);
		font-size: 0.55rem;
		color: var(--color-subtle);
		pointer-events: none;
	}

	.key {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.9rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	.key li {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.spacer {
		margin-left: auto;
		opacity: 0.65;
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 999px;
	}

	.dot.theme {
		background: var(--lab-accent);
	}

	.dot.other {
		border: 1.4px solid var(--lab-hairline);
		background: var(--color-surface);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
</style>
