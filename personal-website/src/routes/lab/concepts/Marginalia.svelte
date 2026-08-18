<script lang="ts">
	import { onMount } from 'svelte';

	type Block = { text: string; note?: string; footnote?: { marker: string; text: string } };

	const blocks: Block[] = [
		{
			text: 'A personal site should be cheap to change and expensive to abandon. Mine has been rebuilt five times, and every rebuild has thrown away more than it added.',
			note: 'Rebuilt in 2019, 2021, 2022, 2024 and again this year.'
		},
		{
			text: 'The first version had a carousel, a testimonial section and a pricing table. I had no clients, no testimonials and nothing to sell. It looked like a business because business websites were the only reference I had.',
			footnote: {
				marker: '1',
				text: 'The pricing table listed three tiers. All three were the same price.'
			}
		},
		{
			text: 'What survived every rewrite was the boring part: dated notes on books, photographs grouped by trip, and a page that says what I am doing this year. Everything ornamental went in the bin.',
			note: 'The book notes are the oldest continuously running part of the site.'
		},
		{
			text: 'So the design brief is small. Make the writing legible, make the photographs large, and get out of the way of both.'
		}
	];

	let focusMode = $state(true);
	let host = $state<HTMLDivElement>();
	let article = $state<HTMLDivElement>();
	let paragraphs: HTMLParagraphElement[] = [];
	let noteEls: HTMLElement[] = [];
	let activeIndex = $state(0);
	let progress = $state(0);
	let openFootnote = $state<number | null>(null);

	onMount(() => {
		if (!host || !article) return;

		let raf = 0;

		function layoutNotes() {
			// Each margin note is pinned to the top of the paragraph it annotates,
			// then nudged down if it would collide with the note above it.
			let floor = 0;
			for (let i = 0; i < noteEls.length; i++) {
				const note = noteEls[i];
				const para = paragraphs[i];
				if (!note || !para) continue;
				const top = Math.max(floor, para.offsetTop);
				note.style.transform = `translateY(${top}px)`;
				floor = top + note.offsetHeight + 14;
			}
		}

		function update() {
			raf = 0;
			const rect = host!.getBoundingClientRect();
			const span = rect.height - window.innerHeight * 0.4;
			progress = Math.min(
				1,
				Math.max(0, (window.innerHeight * 0.5 - rect.top) / Math.max(1, span))
			);

			// The "active" paragraph is whichever one straddles the reading line at
			// 42% of the viewport height.
			const line = window.innerHeight * 0.42;
			let best = 0;
			let bestDistance = Infinity;
			paragraphs.forEach((para, i) => {
				if (!para) return;
				const box = para.getBoundingClientRect();
				const distance = Math.abs(box.top + box.height / 2 - line);
				if (distance < bestDistance) {
					bestDistance = distance;
					best = i;
				}
			});
			activeIndex = best;
		}

		function onScroll() {
			if (!raf) raf = requestAnimationFrame(update);
		}

		layoutNotes();
		update();

		window.addEventListener('scroll', onScroll, { passive: true });
		const ro = new ResizeObserver(() => {
			layoutNotes();
			update();
		});
		ro.observe(article);

		return () => {
			window.removeEventListener('scroll', onScroll);
			ro.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});

	const circumference = 2 * Math.PI * 15;
</script>

<div class="reader" class:focus={focusMode} bind:this={host}>
	<div class="toolbar">
		<button
			class="switch"
			class:on={focusMode}
			type="button"
			onclick={() => (focusMode = !focusMode)}
		>
			<span class="knob"></span>
			<span class="switch-label">Focus mode</span>
		</button>

		<div class="ring" aria-label={`${Math.round(progress * 100)}% read`}>
			<svg viewBox="0 0 36 36" aria-hidden="true">
				<circle cx="18" cy="18" r="15" class="ring-track" />
				<circle
					cx="18"
					cy="18"
					r="15"
					class="ring-fill"
					stroke-dasharray={circumference}
					stroke-dashoffset={circumference * (1 - progress)}
				/>
			</svg>
			<span class="ring-text lab-mono">{Math.round(progress * 100)}</span>
		</div>
	</div>

	<div class="body">
		<div class="article" bind:this={article}>
			{#each blocks as block, i (i)}
				<p class="para" class:active={i === activeIndex} bind:this={paragraphs[i]}>
					{block.text}
					{#if block.footnote}
						<button
							class="fn"
							type="button"
							aria-expanded={openFootnote === i}
							onclick={() => (openFootnote = openFootnote === i ? null : i)}
						>
							{block.footnote.marker}
						</button>
						{#if openFootnote === i}
							<span class="fn-pop" role="note">{block.footnote.text}</span>
						{/if}
					{/if}
				</p>
			{/each}
		</div>

		<aside class="margin" aria-label="Margin notes">
			{#each blocks as block, i (i)}
				{#if block.note}
					<span class="note" class:active={i === activeIndex} bind:this={noteEls[i]}>
						<span class="note-rule" aria-hidden="true"></span>
						{block.note}
					</span>
				{/if}
			{/each}
		</aside>
	</div>
</div>

<style lang="scss">
	.reader {
		display: grid;
		gap: 1.25rem;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid var(--lab-hairline);
	}

	.switch {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.3rem 0.75rem 0.3rem 0.35rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
	}

	.knob {
		position: relative;
		width: 28px;
		height: 16px;
		border-radius: 999px;
		background: var(--color-muted-strong);
		transition: background 220ms ease;
	}

	.knob::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 12px;
		height: 12px;
		border-radius: 999px;
		background: var(--color-surface);
		transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1.4);
	}

	.switch.on .knob {
		background: var(--lab-accent);
	}

	.switch.on .knob::after {
		transform: translateX(12px);
	}

	.switch-label {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-heading);
	}

	.ring {
		position: relative;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
	}

	.ring svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.ring circle {
		fill: none;
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.ring-track {
		stroke: var(--lab-hairline);
	}

	.ring-fill {
		stroke: var(--lab-accent);
		transition: stroke-dashoffset 120ms linear;
	}

	.ring-text {
		font-size: 0.55rem;
		color: var(--color-subtle);
		font-variant-numeric: tabular-nums;
	}

	.body {
		display: grid;
		grid-template-columns: minmax(0, 62ch) minmax(0, 20ch);
		gap: clamp(1.25rem, 4vw, 3rem);
		align-items: start;
	}

	.article {
		display: grid;
		gap: 1.35rem;
	}

	.para {
		position: relative;
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.02rem, 1.4vw, 1.15rem);
		font-weight: 400;
		line-height: 1.75;
		color: var(--color-ink);
		font-variation-settings:
			'SOFT' 30,
			'opsz' 14;
		transition:
			opacity 420ms ease,
			filter 420ms ease;
	}

	// Focus mode dims everything but the paragraph on the reading line — the
	// page becomes a soft spotlight that tracks the reader down the column.
	.reader.focus .para {
		opacity: 0.34;
		filter: blur(0.35px);
	}

	.reader.focus .para.active {
		opacity: 1;
		filter: none;
	}

	.fn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.15em;
		height: 1.15em;
		margin-left: 0.12em;
		vertical-align: super;
		border: none;
		border-radius: 999px;
		background: color-mix(in srgb, var(--lab-accent) 18%, transparent);
		font-family: var(--lab-mono);
		font-size: 0.55em;
		font-weight: 700;
		color: var(--lab-accent);
	}

	.fn-pop {
		display: block;
		margin-top: 0.6rem;
		padding: 0.6rem 0.75rem;
		border-left: 2px solid var(--lab-accent);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		background: var(--color-muted);
		font-family: var(--font-body);
		font-size: 0.84rem;
		line-height: 1.55;
		color: var(--color-subtle);
		animation: slip 220ms ease;
	}

	@keyframes slip {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
	}

	.margin {
		position: relative;
		min-height: 1px;
	}

	.note {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		padding-left: 0.85rem;
		font-family: var(--font-body);
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--color-subtle);
		opacity: 0.5;
		transition:
			opacity 380ms ease,
			transform 380ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.note.active {
		opacity: 1;
	}

	.note-rule {
		position: absolute;
		left: 0;
		top: 0.35em;
		bottom: 0.2em;
		width: 2px;
		border-radius: 999px;
		background: var(--lab-hairline);
		transition: background 380ms ease;
	}

	.note.active .note-rule {
		background: var(--lab-accent);
	}

	@media (max-width: 820px) {
		.body {
			grid-template-columns: minmax(0, 1fr);
		}

		// Notes fall back to inline asides once there is no margin to live in.
		.margin {
			display: grid;
			gap: 0.75rem;
		}

		// Stays `relative` rather than `static` so the rule keeps this element as
		// its containing block instead of jumping to `.margin`.
		.note {
			position: relative;
			transform: none !important;
			opacity: 1;
		}
	}
</style>
