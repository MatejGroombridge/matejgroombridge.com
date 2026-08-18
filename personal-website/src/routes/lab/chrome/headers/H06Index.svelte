<script lang="ts">
	const entries = [
		{ label: 'Photography', meta: '14 trips' },
		{ label: 'Book notes', meta: '33 notes' },
		{ label: 'Writing', meta: '6 essays' },
		{ label: '2026', meta: 'live' },
		{ label: 'Contact', meta: '' }
	];
	let hovered = $state<number | null>(null);
</script>

<header class="index">
	<a class="brand" href="/">
		<span class="brand-name" data-preserve-case>Matej Groombridge</span>
		<span class="brand-role lab-mono">index</span>
	</a>

	<nav aria-label="Primary" onmouseleave={() => (hovered = null)}>
		<ol>
			{#each entries as entry, i (entry.label)}
				<li class:dim={hovered !== null && hovered !== i}>
					<a href="/" onmouseenter={() => (hovered = i)} onfocus={() => (hovered = i)}>
						<span class="num lab-mono">{String(i + 1).padStart(2, '0')}</span>
						<span class="label" data-preserve-case>{entry.label}</span>
						<span class="leader" aria-hidden="true"></span>
						{#if entry.meta}
							<span class="meta lab-mono">{entry.meta}</span>
						{/if}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
</header>

<style lang="scss">
	.index {
		position: sticky;
		top: 0;
		z-index: 5;
		padding: clamp(1rem, 3cqw, 1.6rem) clamp(1rem, 4cqw, 2.5rem);
		background: var(--color-cream);
		border-bottom: 1px solid var(--lab-hairline);
	}

	.brand {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		margin-bottom: 0.85rem;
		text-decoration: none;
	}

	.brand-name {
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--color-heading);
	}

	.brand-role {
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	ol {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.15rem clamp(1rem, 3cqw, 2rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		transition: opacity 220ms ease;
	}

	// Hovering one entry recedes the rest, which is what makes a list of five
	// links read as a table of contents rather than a row of buttons.
	li.dim {
		opacity: 0.35;
	}

	a {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.28rem 0;
		text-decoration: none;
		color: var(--color-heading);
	}

	.num {
		font-size: 0.52rem;
		color: var(--lab-accent);
	}

	.label {
		font-family: var(--font-ui);
		font-size: 0.86rem;
		font-weight: 500;
		white-space: nowrap;
	}

	// Dotted leader, the way a printed contents page runs the eye to the number.
	.leader {
		flex: 1;
		min-width: 0.75rem;
		height: 1px;
		border-bottom: 1px dotted var(--lab-hairline);
		transform: translateY(-0.2em);
	}

	.meta {
		font-size: 0.5rem;
		color: var(--color-subtle);
		white-space: nowrap;
	}

	a:hover .label {
		color: var(--lab-accent);
	}

	@container (max-width: 480px) {
		ol {
			grid-template-columns: 1fr;
		}
	}
</style>
