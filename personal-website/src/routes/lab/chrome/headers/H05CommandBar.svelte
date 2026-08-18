<script lang="ts">
	// Nav collapses to a single affordance: everything on the site is reachable
	// by typing, and the bar stops competing with the page for attention.
	const recent = ['Sydney, March', 'Born To Run', 'On writing less'];
	let open = $state(false);
</script>

<header class="bar">
	<a class="brand" href="/" aria-label="Home">
		<span class="mark" aria-hidden="true"></span>
		<span class="name" data-preserve-case>Matej</span>
	</a>

	<div class="field-wrap">
		<button class="field" type="button" onclick={() => (open = !open)} aria-expanded={open}>
			<span class="glyph" aria-hidden="true">⌕</span>
			<span class="placeholder">Search photos, books, writing…</span>
			<kbd class="lab-mono" data-preserve-case>⌘K</kbd>
		</button>

		{#if open}
			<div class="sheet">
				<span class="sheet-label lab-mono">recent</span>
				{#each recent as item (item)}
					<a class="sheet-row" href="/" data-preserve-case>{item}</a>
				{/each}
			</div>
		{/if}
	</div>

	<div class="actions">
		<button type="button" aria-label="Toggle theme"><span class="dot"></span></button>
		<a class="ghost" href="/">Contact</a>
	</div>
</header>

<style lang="scss">
	.bar {
		position: sticky;
		top: 0;
		z-index: 5;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(0.6rem, 3cqw, 1.5rem);
		padding: 0.75rem clamp(0.85rem, 4cqw, 2.5rem);
		background: color-mix(in srgb, var(--color-cream) 88%, transparent);
		backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--lab-hairline);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	.mark {
		width: 22px;
		height: 22px;
		border-radius: 7px;
		background: linear-gradient(140deg, var(--lab-accent), var(--color-heading));
	}

	.name {
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: -0.035em;
		color: var(--color-heading);
	}

	.field-wrap {
		position: relative;
		justify-self: center;
		width: min(100%, 380px);
	}

	.field {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		width: 100%;
		padding: 0.45rem 0.45rem 0.45rem 0.7rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		text-align: left;
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease;
	}

	.field:hover {
		border-color: color-mix(in srgb, var(--lab-accent) 45%, transparent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--lab-accent) 10%, transparent);
	}

	.glyph {
		font-size: 0.9rem;
		color: var(--lab-accent);
	}

	.placeholder {
		flex: 1;
		min-width: 0;
		font-size: 0.8rem;
		color: var(--color-subtle);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	kbd {
		flex: 0 0 auto;
		padding: 0.14rem 0.36rem;
		border: 1px solid var(--lab-hairline);
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		background: var(--color-muted);
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	.sheet {
		position: absolute;
		top: calc(100% + 0.4rem);
		left: 0;
		right: 0;
		display: grid;
		padding: 0.35rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: 0 18px 40px -20px rgb(0 0 0 / 0.4);
		animation: drop 180ms cubic-bezier(0.2, 0.9, 0.3, 1.1);
	}

	@keyframes drop {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	.sheet-label {
		padding: 0.35rem 0.5rem 0.2rem;
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	.sheet-row {
		padding: 0.4rem 0.5rem;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		color: var(--color-heading);
		text-decoration: none;
	}

	.sheet-row:hover {
		background: color-mix(in srgb, var(--lab-accent) 12%, transparent);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.actions button {
		display: grid;
		place-items: center;
		width: 1.9rem;
		height: 1.9rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--color-heading) 50%, var(--color-muted) 50%);
		border: 1px solid var(--color-heading);
	}

	.ghost {
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		background: var(--color-heading);
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-cream);
		text-decoration: none;
		white-space: nowrap;
	}

	@container (max-width: 620px) {
		// The search affordance is the nav, so it keeps its space and the
		// secondary call to action is what gives way.
		.ghost {
			display: none;
		}

		.name {
			display: none;
		}
	}
</style>
