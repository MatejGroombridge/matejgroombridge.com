<script lang="ts">
	import { onMount } from 'svelte';

	type TreeKey = 'pine' | 'main' | 'cherry';

	type TreeData = {
		potRect: { x: number; y: number; w: number; h: number };
		foliageCenter: { x: number; y: number };
		landingY: number;
	};

	type Petal = {
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		rot: number;
		rotVel: number;
		phase: number;
		size: number;
		phaseAmp: number;
		life: number;
		maxLife: number;
		opacity: number;
	};

	type Drop = { id: number; x: number; y: number; vy: number };

	let gardenEl = $state<HTMLDivElement>();
	let pineEl = $state<SVGSVGElement>();
	let mainEl = $state<SVGSVGElement>();
	let cherryEl = $state<SVGSVGElement>();

	const trees = $state<Record<TreeKey, TreeData>>({
		pine: { potRect: zeroRect(), foliageCenter: zeroPt(), landingY: 0 },
		main: { potRect: zeroRect(), foliageCenter: zeroPt(), landingY: 0 },
		cherry: { potRect: zeroRect(), foliageCenter: zeroPt(), landingY: 0 }
	});

	function zeroRect() {
		return { x: 0, y: 0, w: 0, h: 0 };
	}
	function zeroPt() {
		return { x: 0, y: 0 };
	}

	const CAN_W = 42;
	const CAN_H = 30;
	const CONTENT_MAX = 880;
	const SPOUT_OFFSET = { x: 42, y: 7 };
	const PIVOT = { x: 0.32, y: 0.82 };

	let can = $state({ x: 40, y: 80, vx: 0, vy: 0, rot: 0 });
	let canDragging = $state(false);
	let canPouring = $state(false);
	let canHovered = $state(false);
	let dragOffset = { x: 0, y: 0 };
	let pointerHistory: { x: number; y: number; t: number }[] = [];

	let petals = $state<Petal[]>([]);
	let petalIdCounter = 0;
	let lastPetalSpawn = 0;

	let drops = $state<Drop[]>([]);
	let dropIdCounter = 0;

	let glow = $state<Record<TreeKey, number>>({ pine: 0, main: 0, cherry: 0 });

	let treeClicks = $state(0);
	let canRevealed = $state(false);

	function onTreeClick(key: TreeKey) {
		glow[key] = 1;
		if (canRevealed) return;
		treeClicks += 1;
		if (treeClicks >= 3) canRevealed = true;
	}

	let rafId = 0;
	let lastTickTime = 0;
	let gardenW = $state(0);
	let gardenH = $state(0);

	const GRAVITY = 0.95;
	const AIR_FRICTION = 0.985;
	const FLOOR_FRICTION = 0.62;
	const BOUNCE = 0.14;
	const THROW_CAP = 14;

	function computeRects() {
		if (!gardenEl) return;
		const g = gardenEl.getBoundingClientRect();
		gardenW = g.width;
		gardenH = g.height;
		const refs: Record<TreeKey, SVGSVGElement | undefined> = {
			pine: pineEl,
			main: mainEl,
			cherry: cherryEl
		};
		for (const key of ['pine', 'main', 'cherry'] as TreeKey[]) {
			const svg = refs[key];
			if (!svg) continue;
			const r = svg.getBoundingClientRect();
			const potFraction = key === 'main' ? 0.32 : 0.27;
			const potW = r.width * 0.6;
			const potH = r.height * potFraction;
			trees[key] = {
				potRect: {
					x: r.left - g.left + (r.width - potW) / 2,
					y: r.bottom - g.top - potH,
					w: potW,
					h: potH
				},
				foliageCenter: {
					x: r.left - g.left + r.width / 2,
					y: r.top - g.top + r.height * 0.28
				},
				landingY: r.top - g.top + r.height * 0.12
			};
		}
	}

	function ptToGarden(clientX: number, clientY: number) {
		if (!gardenEl) return { x: 0, y: 0 };
		const r = gardenEl.getBoundingClientRect();
		return { x: clientX - r.left, y: clientY - r.top };
	}

	function onCanDown(e: PointerEvent) {
		e.preventDefault();
		const p = ptToGarden(e.clientX, e.clientY);
		dragOffset = { x: p.x - can.x, y: p.y - can.y };
		canDragging = true;
		can.vx = 0;
		can.vy = 0;
		pointerHistory = [{ ...p, t: performance.now() }];
		(e.currentTarget as Element).setPointerCapture(e.pointerId);
	}

	function onCanMove(e: PointerEvent) {
		if (!canDragging) return;
		const p = ptToGarden(e.clientX, e.clientY);
		can.x = p.x - dragOffset.x;
		can.y = p.y - dragOffset.y;
		const now = performance.now();
		pointerHistory.push({ ...p, t: now });
		while (pointerHistory.length > 5) pointerHistory.shift();
	}

	function onCanUp(e: PointerEvent) {
		if (!canDragging) return;
		canDragging = false;
		const a = pointerHistory[0];
		const b = pointerHistory[pointerHistory.length - 1];
		if (a && b && b.t - a.t > 0) {
			const dt = (b.t - a.t) / 16.67;
			can.vx = clamp((b.x - a.x) / dt, -THROW_CAP, THROW_CAP);
			can.vy = clamp((b.y - a.y) / dt, -THROW_CAP, THROW_CAP);
		}
		pointerHistory = [];
		(e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
	}

	function clamp(v: number, lo: number, hi: number) {
		return Math.max(lo, Math.min(hi, v));
	}

	function getSpoutWorld() {
		const rad = (can.rot * Math.PI) / 180;
		const ox = CAN_W * PIVOT.x;
		const oy = CAN_H * PIVOT.y;
		const dx = SPOUT_OFFSET.x - ox;
		const dy = SPOUT_OFFSET.y - oy;
		const cosA = Math.cos(rad);
		const sinA = Math.sin(rad);
		return {
			x: can.x + ox + dx * cosA - dy * sinA,
			y: can.y + oy + dx * sinA + dy * cosA
		};
	}

	function detectPour() {
		const centerX = can.x + CAN_W / 2;
		const topY = can.y;
		for (const key of ['pine', 'main', 'cherry'] as TreeKey[]) {
			const t = trees[key];
			if (!t.foliageCenter.x) continue;
			const dx = centerX - t.foliageCenter.x;
			const dy = topY - t.foliageCenter.y;
			if (Math.abs(dx) < 32 && dy > -40 && dy < 12) {
				const s = getSpoutWorld();
				return { key, spoutX: s.x, spoutY: s.y };
			}
		}
		return null;
	}

	function tick(t: number) {
		if (!gardenEl) {
			rafId = requestAnimationFrame(tick);
			return;
		}
		const dt = lastTickTime ? Math.min(2.2, (t - lastTickTime) / 16.67) : 1;
		lastTickTime = t;

		const w = gardenW;
		const h = gardenH;
		const floorY = h - CAN_H;

		if (!canDragging) {
			can.vy += GRAVITY * dt;
			can.vx *= AIR_FRICTION;
			can.x += can.vx * dt;
			can.y += can.vy * dt;

			if (can.y >= floorY) {
				can.y = floorY;
				if (Math.abs(can.vy) > 3.2) can.vy = -can.vy * BOUNCE;
				else can.vy = 0;
				can.vx *= FLOOR_FRICTION;
				if (Math.abs(can.vx) < 0.15) can.vx = 0;
			}

			if (can.x < 0) {
				can.x = 0;
				can.vx = -can.vx * BOUNCE;
			} else if (can.x + CAN_W > w) {
				can.x = w - CAN_W;
				can.vx = -can.vx * BOUNCE;
			}

			for (const key of ['pine', 'main', 'cherry'] as TreeKey[]) {
				const p = trees[key].potRect;
				if (!p.w) continue;
				const canR = can.x + CAN_W;
				const canB = can.y + CAN_H;
				if (canR > p.x && can.x < p.x + p.w && canB > p.y && can.y < p.y + p.h) {
					const ot = canB - p.y;
					const ol = canR - p.x;
					const or = p.x + p.w - can.x;
					const m = Math.min(ot, ol, or);
					if (m === ot) {
						can.y = p.y - CAN_H;
						if (Math.abs(can.vy) > 3) can.vy = -can.vy * BOUNCE;
						else can.vy = 0;
						can.vx *= FLOOR_FRICTION;
					} else if (m === ol) {
						can.x = p.x - CAN_W;
						can.vx = -Math.abs(can.vx) * BOUNCE;
					} else {
						can.x = p.x + p.w;
						can.vx = Math.abs(can.vx) * BOUNCE;
					}
				}
			}
		}

		const pour = detectPour();
		canPouring = !!pour;
		const targetRot = canPouring ? 38 : canDragging ? -8 : 0;
		can.rot += (targetRot - can.rot) * 0.2;

		if (canPouring && pour) {
			if (Math.random() < 0.55) {
				const s = getSpoutWorld();
				drops.push({
					id: dropIdCounter++,
					x: s.x + (Math.random() - 0.5) * 2.5,
					y: s.y + 1,
					vy: 1.5 + Math.random() * 0.5
				});
			}
			glow[pour.key] = Math.min(1, glow[pour.key] + 0.06);
		}

		const newDrops: Drop[] = [];
		for (const d of drops) {
			d.vy += 0.35;
			d.y += d.vy;
			if (d.y < h + 16) newDrops.push(d);
		}
		drops = newDrops;

		for (const key of ['pine', 'main', 'cherry'] as TreeKey[]) {
			glow[key] = Math.max(0, glow[key] - 0.008 * dt);
		}

		if (t - lastPetalSpawn > 4500 + Math.random() * 9000) {
			const c = trees.cherry.foliageCenter;
			if (c.x) {
				petals.push({
					id: petalIdCounter++,
					x: c.x + (Math.random() - 0.5) * 36,
					y: c.y - 8 + Math.random() * 14,
					vx: (Math.random() - 0.5) * 0.6,
					vy: 0.22 + Math.random() * 0.45,
					rot: Math.random() * 360,
					rotVel: (Math.random() - 0.5) * 6,
					phase: Math.random() * Math.PI * 2,
					size: 0.55 + Math.random() * 0.45,
					phaseAmp: 0.25 + Math.random() * 0.55,
					life: 0,
					maxLife: 320 + Math.random() * 220,
					opacity: 0
				});
				lastPetalSpawn = t;
			}
		}
		const newPetals: Petal[] = [];
		const FADE_IN = 26;
		const FADE_OUT = 140;
		const bottomFadeStart = h - 18;
		const bottomFadeDist = 56;
		for (const p of petals) {
			p.phase += (0.035 + p.size * 0.02) * dt;
			p.x += (p.vx + Math.sin(p.phase) * p.phaseAmp) * dt;
			p.y += p.vy * dt;
			p.rot += p.rotVel * dt;
			p.life += dt;
			const fadeInOp = Math.min(1, p.life / FADE_IN);
			const fadeOutOp = Math.min(1, Math.max(0, (p.maxLife - p.life) / FADE_OUT));
			const bottomOp =
				p.y < bottomFadeStart ? 1 : Math.max(0, 1 - (p.y - bottomFadeStart) / bottomFadeDist);
			p.opacity = Math.min(fadeInOp, fadeOutOp, bottomOp);
			if (p.opacity > 0.01 && p.life < p.maxLife) newPetals.push(p);
		}
		petals = newPetals;
		if (petals.length > 10) petals = petals.slice(-10);

		rafId = requestAnimationFrame(tick);
	}

	onMount(() => {
		computeRects();
		const leftPad = Math.max(20, (gardenW - CONTENT_MAX) / 2);
		can.x = leftPad;
		can.y = gardenH - CAN_H;
		const ro = new ResizeObserver(() => computeRects());
		ro.observe(gardenEl!);
		window.addEventListener('resize', computeRects);
		rafId = requestAnimationFrame(tick);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			ro.disconnect();
			window.removeEventListener('resize', computeRects);
		};
	});
</script>

<div class="garden" bind:this={gardenEl} aria-hidden="true">
	<div class="trees">
		<svg
			bind:this={pineEl}
			class="tree pine"
			viewBox="0 0 22 22"
			shape-rendering="crispEdges"
			role="button"
			tabindex="0"
			aria-label="Pine bonsai"
			style:filter={glow.pine > 0
				? `drop-shadow(0 0 ${4 + glow.pine * 5}px rgba(120,220,130,${0.55 * glow.pine})) saturate(${1 + glow.pine * 0.45})`
				: ''}
			onclick={() => onTreeClick('pine')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onTreeClick('pine');
				}
			}}
		>
			<g class="crown">
				<rect x="10" y="11" width="1" height="6" fill="#5a3a22" />
				<rect x="11" y="10" width="1" height="2" fill="#5a3a22" />
				<rect x="10" y="14" width="1" height="3" fill="#3d2614" />
				<rect x="4" y="11" width="13" height="1" fill="#1f5a2a" />
				<rect x="5" y="10" width="11" height="1" fill="#2e7038" />
				<rect x="6" y="10" width="3" height="1" fill="#4a9555" />
				<rect x="13" y="11" width="3" height="1" fill="#143d1c" />
				<rect x="6" y="8" width="9" height="1" fill="#1f5a2a" />
				<rect x="7" y="7" width="7" height="1" fill="#2e7038" />
				<rect x="7" y="7" width="2" height="1" fill="#4a9555" />
				<rect x="12" y="8" width="3" height="1" fill="#143d1c" />
				<rect x="8" y="5" width="5" height="1" fill="#1f5a2a" />
				<rect x="9" y="4" width="3" height="1" fill="#2e7038" />
				<rect x="10" y="3" width="1" height="1" fill="#2e7038" />
				<rect x="9" y="4" width="1" height="1" fill="#4a9555" />
			</g>
			<g class="pot">
				<rect x="6" y="17" width="10" height="1" fill="#8a3a1a" />
				<rect x="6" y="18" width="10" height="1" fill="#b85a3a" />
				<rect x="7" y="19" width="8" height="2" fill="#9a4a26" />
				<rect x="7" y="19" width="1" height="2" fill="#b85a3a" />
				<rect x="14" y="19" width="1" height="2" fill="#6a2e14" />
				<rect x="8" y="21" width="6" height="1" fill="#5a2614" />
			</g>
		</svg>

		<svg
			bind:this={mainEl}
			class="tree main"
			viewBox="0 0 32 27"
			shape-rendering="crispEdges"
			role="button"
			tabindex="0"
			aria-label="Bonsai tree"
			style:filter={glow.main > 0
				? `drop-shadow(0 0 ${4 + glow.main * 5}px rgba(120,220,130,${0.55 * glow.main})) saturate(${1 + glow.main * 0.45})`
				: ''}
			onclick={() => onTreeClick('main')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onTreeClick('main');
				}
			}}
		>
			<g class="crown">
				<rect x="15" y="18" width="3" height="1" fill="#5a3a22" />
				<rect x="15" y="17" width="2" height="1" fill="#5a3a22" />
				<rect x="14" y="16" width="2" height="1" fill="#5a3a22" />
				<rect x="14" y="15" width="1" height="1" fill="#5a3a22" />
				<rect x="13" y="14" width="2" height="1" fill="#5a3a22" />
				<rect x="13" y="13" width="1" height="1" fill="#5a3a22" />
				<rect x="13" y="12" width="1" height="1" fill="#5a3a22" />
				<rect x="12" y="11" width="2" height="1" fill="#5a3a22" />
				<rect x="17" y="17" width="1" height="1" fill="#5a3a22" />
				<rect x="17" y="16" width="1" height="1" fill="#3d2614" />
				<rect x="18" y="15" width="1" height="1" fill="#5a3a22" />
				<rect x="19" y="14" width="1" height="1" fill="#5a3a22" />
				<rect x="20" y="13" width="1" height="1" fill="#5a3a22" />
				<rect x="21" y="12" width="1" height="1" fill="#5a3a22" />
				<rect x="15" y="13" width="1" height="1" fill="#3d2614" />
				<rect x="14" y="14" width="1" height="1" fill="#3d2614" />
				<rect x="6" y="9" width="8" height="1" fill="#3f8a4a" />
				<rect x="5" y="10" width="10" height="2" fill="#4a9b56" />
				<rect x="6" y="12" width="8" height="1" fill="#3f8a4a" />
				<rect x="7" y="8" width="6" height="1" fill="#4a9b56" />
				<rect x="8" y="7" width="3" height="1" fill="#4a9b56" />
				<rect x="8" y="8" width="2" height="1" fill="#6fc97a" />
				<rect x="6" y="10" width="2" height="1" fill="#6fc97a" />
				<rect x="9" y="11" width="2" height="1" fill="#6fc97a" />
				<rect x="13" y="11" width="1" height="2" fill="#2e6a37" />
				<rect x="17" y="10" width="8" height="1" fill="#3f8a4a" />
				<rect x="16" y="11" width="10" height="2" fill="#4a9b56" />
				<rect x="17" y="13" width="8" height="1" fill="#3f8a4a" />
				<rect x="18" y="9" width="6" height="1" fill="#4a9b56" />
				<rect x="19" y="8" width="3" height="1" fill="#4a9b56" />
				<rect x="19" y="9" width="2" height="1" fill="#6fc97a" />
				<rect x="22" y="11" width="2" height="1" fill="#6fc97a" />
				<rect x="17" y="11" width="2" height="1" fill="#6fc97a" />
				<rect x="24" y="12" width="1" height="2" fill="#2e6a37" />
				<rect x="11" y="6" width="4" height="1" fill="#3f8a4a" />
				<rect x="10" y="7" width="6" height="2" fill="#4a9b56" />
				<rect x="12" y="5" width="2" height="1" fill="#4a9b56" />
				<rect x="12" y="6" width="1" height="1" fill="#6fc97a" />
				<rect x="11" y="8" width="2" height="1" fill="#6fc97a" />
				<rect x="15" y="8" width="1" height="1" fill="#2e6a37" />
			</g>
			<g class="pot">
				<rect x="9" y="19" width="14" height="1" fill="#9b5a3a" />
				<rect x="9" y="20" width="14" height="1" fill="#c97a4f" />
				<rect x="10" y="21" width="12" height="4" fill="#a45e3a" />
				<rect x="10" y="21" width="1" height="4" fill="#c97a4f" />
				<rect x="21" y="21" width="1" height="4" fill="#7a4326" />
				<rect x="11" y="22" width="2" height="1" fill="#b86a44" />
				<rect x="11" y="25" width="10" height="1" fill="#7a4326" />
				<rect x="12" y="26" width="8" height="1" fill="#5a3019" />
			</g>
		</svg>

		<svg
			bind:this={cherryEl}
			class="tree cherry"
			viewBox="0 0 22 22"
			shape-rendering="crispEdges"
			role="button"
			tabindex="0"
			aria-label="Cherry bonsai"
			style:filter={glow.cherry > 0
				? `drop-shadow(0 0 ${4 + glow.cherry * 5}px rgba(120,220,130,${0.55 * glow.cherry})) saturate(${1 + glow.cherry * 0.45})`
				: ''}
			onclick={() => onTreeClick('cherry')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onTreeClick('cherry');
				}
			}}
		>
			<g class="crown">
				<rect x="10" y="18" width="3" height="1" fill="#5a3a22" />
				<rect x="10" y="17" width="2" height="1" fill="#5a3a22" />
				<rect x="11" y="16" width="2" height="1" fill="#5a3a22" />
				<rect x="11" y="15" width="1" height="1" fill="#5a3a22" />
				<rect x="10" y="14" width="2" height="1" fill="#5a3a22" />
				<rect x="10" y="13" width="1" height="1" fill="#5a3a22" />
				<rect x="11" y="12" width="1" height="1" fill="#5a3a22" />
				<rect x="12" y="11" width="1" height="1" fill="#5a3a22" />
				<rect x="8" y="13" width="2" height="1" fill="#5a3a22" />
				<rect x="13" y="12" width="2" height="1" fill="#5a3a22" />
				<rect x="14" y="11" width="1" height="1" fill="#5a3a22" />
				<rect x="12" y="17" width="1" height="2" fill="#3d2614" />
				<rect x="4" y="10" width="6" height="1" fill="#c87a96" />
				<rect x="3" y="9" width="7" height="1" fill="#f0a8c0" />
				<rect x="4" y="8" width="5" height="1" fill="#f0a8c0" />
				<rect x="5" y="9" width="2" height="1" fill="#fad4e0" />
				<rect x="8" y="10" width="2" height="1" fill="#c87a96" />
				<rect x="12" y="10" width="6" height="1" fill="#c87a96" />
				<rect x="13" y="9" width="6" height="1" fill="#f0a8c0" />
				<rect x="14" y="8" width="4" height="1" fill="#f0a8c0" />
				<rect x="14" y="9" width="2" height="1" fill="#fad4e0" />
				<rect x="17" y="10" width="1" height="1" fill="#c87a96" />
				<rect x="8" y="6" width="6" height="1" fill="#c87a96" />
				<rect x="7" y="5" width="8" height="1" fill="#f0a8c0" />
				<rect x="8" y="4" width="6" height="1" fill="#f0a8c0" />
				<rect x="9" y="3" width="4" height="1" fill="#f0a8c0" />
				<rect x="9" y="4" width="2" height="1" fill="#fad4e0" />
				<rect x="13" y="6" width="1" height="1" fill="#c87a96" />
				<rect x="6" y="7" width="1" height="1" fill="#fad4e0" />
				<rect x="15" y="7" width="1" height="1" fill="#fad4e0" />
			</g>
			<g class="pot">
				<rect x="6" y="17" width="10" height="1" fill="#2e2e2e" />
				<rect x="6" y="18" width="10" height="1" fill="#5a5a5a" />
				<rect x="7" y="19" width="8" height="2" fill="#454545" />
				<rect x="7" y="19" width="1" height="2" fill="#6a6a6a" />
				<rect x="14" y="19" width="1" height="2" fill="#2a2a2a" />
				<rect x="8" y="21" width="6" height="1" fill="#1a1a1a" />
			</g>
		</svg>
	</div>

	{#each petals as p (p.id)}
		<svg
			class="petal"
			viewBox="0 0 4 4"
			shape-rendering="crispEdges"
			preserveAspectRatio="xMidYMid meet"
			style:transform="translate3d({p.x - 5}px, {p.y - 5}px, 0) rotate({p.rot}deg) scale({p.size})"
			style:opacity={p.opacity}
		>
			<rect x="1" y="0" width="2" height="1" fill="#f0a8c0" />
			<rect x="0" y="1" width="4" height="2" fill="#f0a8c0" />
			<rect x="1" y="3" width="2" height="1" fill="#c87a96" />
			<rect x="1" y="1" width="1" height="1" fill="#fad4e0" />
		</svg>
	{/each}

	{#if canRevealed}
		{#each drops as d (d.id)}
			<span
				class="drop"
				style:transform="translate3d({d.x - 1}px, {d.y - 2}px, 0)"
				aria-hidden="true"
			></span>
		{/each}

		<button
			type="button"
			class="watering-can"
			class:dragging={canDragging}
			class:hovered={canHovered}
			aria-label="Watering can"
			style:transform="translate3d({can.x}px, {can.y}px, 0) rotate({can.rot}deg)"
			onpointerdown={onCanDown}
			onpointermove={onCanMove}
			onpointerup={onCanUp}
			onpointercancel={onCanUp}
			onpointerenter={() => (canHovered = true)}
			onpointerleave={() => (canHovered = false)}
		>
		<svg viewBox="0 0 21 15" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid meet">
			<!-- Back loop handle (big oval on the left) -->
			<rect x="0" y="5" width="2" height="1" fill="#2a2a2a" />
			<rect x="0" y="11" width="2" height="1" fill="#2a2a2a" />
			<rect x="0" y="6" width="1" height="5" fill="#2a2a2a" />
			<rect x="1" y="6" width="1" height="1" fill="#6a6a6a" />
			<rect x="1" y="10" width="1" height="1" fill="#3a3a3a" />

			<!-- Body outline -->
			<rect x="2" y="3" width="10" height="1" fill="#2a2a2a" />
			<rect x="2" y="4" width="1" height="8" fill="#2a2a2a" />
			<rect x="11" y="4" width="1" height="8" fill="#2a2a2a" />
			<rect x="2" y="12" width="10" height="1" fill="#2a2a2a" />
			<rect x="4" y="13" width="6" height="1" fill="#2a2a2a" />

			<!-- Body fill -->
			<rect x="3" y="4" width="8" height="1" fill="#5a5a5a" />
			<rect x="3" y="5" width="8" height="6" fill="#6a6a6a" />
			<rect x="3" y="5" width="1" height="6" fill="#a8a8a8" />
			<rect x="3" y="5" width="2" height="1" fill="#a8a8a8" />
			<rect x="10" y="5" width="1" height="6" fill="#3a3a3a" />
			<rect x="9" y="10" width="1" height="1" fill="#5a5a5a" />
			<rect x="3" y="11" width="8" height="1" fill="#3a3a3a" />
			<rect x="3" y="11" width="1" height="1" fill="#6a6a6a" />

			<!-- Subtle body shading speckles -->
			<rect x="6" y="6" width="1" height="1" fill="#7a7a7a" />
			<rect x="7" y="9" width="1" height="1" fill="#5a5a5a" />

		<!-- Angled metal spout (rising up-right from body to tip) -->
		<!-- Fill (mid grey) per stepped segment -->
		<rect x="12" y="6" width="2" height="4" fill="#5a5a5a" />
		<rect x="14" y="5" width="2" height="4" fill="#5a5a5a" />
		<rect x="16" y="4" width="2" height="4" fill="#5a5a5a" />
		<rect x="18" y="3" width="2" height="4" fill="#5a5a5a" />
		<rect x="20" y="2" width="1" height="4" fill="#5a5a5a" />
		<!-- Top edge (dark outline) -->
		<rect x="12" y="6" width="2" height="1" fill="#2a2a2a" />
		<rect x="14" y="5" width="2" height="1" fill="#2a2a2a" />
		<rect x="16" y="4" width="2" height="1" fill="#2a2a2a" />
		<rect x="18" y="3" width="2" height="1" fill="#2a2a2a" />
		<rect x="20" y="2" width="1" height="1" fill="#2a2a2a" />
		<!-- Upper inner highlight -->
		<rect x="12" y="7" width="2" height="1" fill="#8a8a8a" />
		<rect x="14" y="6" width="2" height="1" fill="#8a8a8a" />
		<rect x="16" y="5" width="2" height="1" fill="#8a8a8a" />
		<rect x="18" y="4" width="2" height="1" fill="#8a8a8a" />
		<rect x="20" y="3" width="1" height="1" fill="#a8a8a8" />
		<!-- Bottom edge (dark shadow) -->
		<rect x="12" y="9" width="2" height="1" fill="#1f1f1f" />
		<rect x="14" y="8" width="2" height="1" fill="#1f1f1f" />
		<rect x="16" y="7" width="2" height="1" fill="#1f1f1f" />
		<rect x="18" y="6" width="2" height="1" fill="#1f1f1f" />
		<rect x="20" y="5" width="1" height="1" fill="#1f1f1f" />
		<!-- Spout tip opening (hole at the very end) -->
		<rect x="20" y="3" width="1" height="2" fill="#0a0a0a" />
		<rect x="20" y="2" width="1" height="1" fill="#2a2a2a" />
		<rect x="20" y="5" width="1" height="1" fill="#2a2a2a" />
		</svg>
	</button>
	{/if}
</div>

<style lang="scss">
	.garden {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 100%;
		height: clamp(130px, 17vw, 190px);
		pointer-events: none;
		overflow: visible;
		z-index: 5;
	}

	.trees {
		position: absolute;
		bottom: 0;
		right: max(clamp(1.25rem, 5vw, 3rem), calc((100% - 880px) / 2));
		display: flex;
		align-items: flex-end;
		gap: 0;
		line-height: 0;
		pointer-events: none;
	}

	.tree {
		display: block;
		height: auto;
		overflow: visible;
		filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.08));
		transition: filter 240ms ease;
		pointer-events: auto;
		cursor: pointer;
		outline: none;
	}

	.tree:focus-visible {
		outline: 2px solid var(--color-green-soft);
		outline-offset: 4px;
		border-radius: 4px;
	}

	.main {
		width: clamp(64px, 6.2vw, 80px);
	}

	.pine,
	.cherry {
		width: clamp(40px, 3.9vw, 50px);
	}

	.pine {
		margin-right: clamp(-0.6rem, -0.7vw, -0.3rem);
	}
	.cherry {
		margin-left: clamp(-0.6rem, -0.7vw, -0.3rem);
	}

	.crown {
		transform-box: fill-box;
		transform-origin: 50% 100%;
	}
	.main .crown {
		animation: sway-main 7s ease-in-out infinite;
	}
	.pine .crown {
		animation: sway-pine 9s ease-in-out infinite;
		animation-delay: -1.5s;
	}
	.cherry .crown {
		animation: sway-cherry 5.5s ease-in-out infinite;
		animation-delay: -3s;
	}

	@keyframes sway-main {
		0% { transform: rotate(-3deg); }
		10% { transform: rotate(4deg); }
		20% { transform: rotate(7deg); }
		28% { transform: rotate(3deg); }
		40% { transform: rotate(6deg); }
		55% { transform: rotate(-1deg); }
		68% { transform: rotate(-4deg); }
		78% { transform: rotate(-6deg); }
		88% { transform: rotate(-2deg); }
		100% { transform: rotate(-3deg); }
	}
	@keyframes sway-pine {
		0% { transform: rotate(-2deg); }
		25% { transform: rotate(3deg); }
		45% { transform: rotate(1deg); }
		65% { transform: rotate(-2.5deg); }
		85% { transform: rotate(-3deg); }
		100% { transform: rotate(-2deg); }
	}
	@keyframes sway-cherry {
		0% { transform: rotate(-4deg); }
		15% { transform: rotate(6deg); }
		30% { transform: rotate(2deg); }
		45% { transform: rotate(8deg); }
		60% { transform: rotate(-2deg); }
		78% { transform: rotate(-7deg); }
		90% { transform: rotate(-3deg); }
		100% { transform: rotate(-4deg); }
	}

	.petal {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 7px;
		height: 7px;
		pointer-events: none;
		will-change: transform;
		transform-origin: center;
		filter: drop-shadow(0 0.5px 0 rgb(0 0 0 / 0.08));
	}

	.drop {
		position: absolute;
		top: 0;
		left: 0;
		width: 3px;
		height: 7px;
		background: #6ab8e0;
		border-radius: 1.5px;
		opacity: 0.9;
		pointer-events: none;
		box-shadow: 0 0 3px rgb(106 184 224 / 0.55);
	}

	.watering-can {
		position: absolute;
		top: 0;
		left: 0;
		width: 42px;
		height: 30px;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: grab;
		pointer-events: auto;
		touch-action: none;
		will-change: transform;
		transform-origin: 32% 82%;
		filter: drop-shadow(0 2px 0 rgb(0 0 0 / 0.15));
		transition: filter 160ms ease;
	}

	.watering-can svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.watering-can.hovered {
		filter: drop-shadow(0 4px 0 rgb(0 0 0 / 0.18)) brightness(1.05);
	}

	.watering-can.dragging {
		cursor: grabbing;
		filter: drop-shadow(0 6px 4px rgb(0 0 0 / 0.25)) brightness(1.05);
	}

	.watering-can:focus-visible {
		outline: 2px solid var(--color-green-soft);
		outline-offset: 4px;
		border-radius: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.crown {
			animation: none !important;
		}
	}
</style>
