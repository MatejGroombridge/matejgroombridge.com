<script lang="ts">
	type Card = { icon: string; title: string; body: string; meta: string; href: string };

	const cards: Card[] = [
		{
			icon: 'photo_camera',
			title: 'Photography',
			body: 'Trips, rolls and the occasional accident worth keeping.',
			meta: '14 trips',
			href: '/photography'
		},
		{
			icon: 'menu_book',
			title: 'Book notes',
			body: 'Summaries in three sentences, then everything that stuck.',
			meta: '33 notes',
			href: '/booknotes'
		},
		{
			icon: 'edit_note',
			title: 'Writing',
			body: 'Short essays on tools, habits and building things slowly.',
			meta: 'occasional',
			href: '/writing'
		},
		{
			icon: 'calendar_today',
			title: '2026',
			body: 'A living log of what I am actually working on this year.',
			meta: 'updated weekly',
			href: '/2026'
		},
		{
			icon: 'terminal',
			title: 'Uses',
			body: 'The camera, the editor, the keyboard, the coffee.',
			meta: 'gear list',
			href: '/uses'
		},
		{
			icon: 'mail',
			title: 'Contact',
			body: 'For work, film recommendations or a coffee in Melbourne.',
			meta: 'replies fast',
			href: '/contact'
		}
	];

	let grid = $state<HTMLDivElement>();

	/**
	 * One pointer handler for the whole grid rather than one per card: the shared
	 * torch position is written to the grid element, and each card resolves its
	 * own local coordinates from it in CSS. Card rects are read once per move via
	 * a cached list so a six-card grid costs one layout read, not six.
	 */
	let rects: { el: HTMLElement; rect: DOMRect }[] = [];

	function measure() {
		if (!grid) return;
		rects = Array.from(grid.querySelectorAll<HTMLElement>('.card')).map((el) => ({
			el,
			rect: el.getBoundingClientRect()
		}));
	}

	function onMove(event: PointerEvent) {
		if (!grid) return;
		if (!rects.length) measure();

		const gridRect = grid.getBoundingClientRect();
		grid.style.setProperty('--gx', `${event.clientX - gridRect.left}px`);
		grid.style.setProperty('--gy', `${event.clientY - gridRect.top}px`);

		for (const { el, rect } of rects) {
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			el.style.setProperty('--x', `${x}px`);
			el.style.setProperty('--y', `${y}px`);

			// Proximity drives the border glow: 1 at the card's centre, 0 once the
			// pointer is more than a card-and-a-half away.
			const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
			const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
			const near = Math.max(0, 1 - Math.hypot(dx, dy) / 190);
			el.style.setProperty('--near', near.toFixed(3));
		}
	}

	function onLeave() {
		for (const { el } of rects) el.style.setProperty('--near', '0');
		grid?.style.setProperty('--torch', '0');
	}

	function onEnter() {
		measure();
		grid?.style.setProperty('--torch', '1');
	}
</script>

<svelte:window onresize={measure} onscroll={() => (rects = [])} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="grid lab-grid-bg"
	bind:this={grid}
	onpointermove={onMove}
	onpointerenter={onEnter}
	onpointerleave={onLeave}
>
	<div class="torch" aria-hidden="true"></div>
	{#each cards as card (card.title)}
		<a class="card" href={card.href}>
			<span class="border" aria-hidden="true"></span>
			<span class="wash" aria-hidden="true"></span>
			<span class="card-inner">
				<span class="material-symbols-rounded icon" aria-hidden="true">{card.icon}</span>
				<span class="title" data-preserve-case>{card.title}</span>
				<span class="body">{card.body}</span>
				<span class="meta lab-mono">{card.meta}</span>
			</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.grid {
		--gx: 50%;
		--gy: 50%;
		--torch: 0;
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(230px, 100%), 1fr));
		gap: 1px;
		padding: 1px;
		border-radius: var(--radius-md);
		background: var(--lab-hairline);
		overflow: hidden;
	}

	// A single soft light that lives above the tiles and below the text.
	.torch {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		opacity: var(--torch);
		transition: opacity 350ms ease;
		background: radial-gradient(
			240px 240px at var(--gx) var(--gy),
			color-mix(in srgb, var(--lab-accent) 16%, transparent),
			transparent 70%
		);
		mix-blend-mode: plus-lighter;
	}

	.card {
		--x: 50%;
		--y: 50%;
		--near: 0;
		position: relative;
		display: block;
		padding: 1px;
		background: var(--color-surface);
		text-decoration: none;
		color: inherit;
		isolation: isolate;
		transition: background 300ms ease;
	}

	// Gradient border: a full-bleed conic-ish wash masked to a 1px ring, faded
	// in by proximity so only the cards near the cursor light their edge.
	.border {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		opacity: var(--near);
		background: radial-gradient(
			200px 200px at var(--x) var(--y),
			var(--lab-accent),
			transparent 65%
		);
		-webkit-mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		padding: 1px;
	}

	.wash {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: calc(var(--near) * 0.55);
		background: radial-gradient(
			260px 200px at var(--x) var(--y),
			color-mix(in srgb, var(--lab-accent) 12%, transparent),
			transparent 68%
		);
	}

	.card-inner {
		position: relative;
		z-index: 3;
		display: grid;
		gap: 0.42rem;
		align-content: start;
		height: 100%;
		padding: clamp(1.1rem, 2.4vw, 1.6rem);
	}

	.icon {
		font-size: 1.35rem;
		color: color-mix(in srgb, var(--lab-accent) calc(40% + var(--near) * 60%), var(--color-subtle));
		transform: translateY(calc(var(--near) * -2px));
		transition: color 200ms ease;
	}

	.title {
		font-family: var(--font-ui);
		font-size: 1.05rem;
		font-weight: 650;
		letter-spacing: -0.02em;
		color: var(--color-heading);
	}

	.body {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--color-subtle);
	}

	.meta {
		margin-top: 0.35rem;
		font-size: 0.58rem;
		color: color-mix(in srgb, var(--lab-accent) calc(var(--near) * 100%), var(--color-subtle));
	}

	@media (hover: none) {
		.torch {
			display: none;
		}

		.card {
			--near: 0.25;
		}
	}
</style>
