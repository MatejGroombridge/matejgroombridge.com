<script lang="ts">
	const facts = [
		{ k: 'type', v: 'Poppins, Figtree, Fraunces' },
		{ k: 'built with', v: 'SvelteKit, SCSS, stubbornness' },
		{ k: 'hosted on', v: 'Netlify' },
		{ k: 'camera', v: 'Sony α6700 · 35mm' },
		{ k: 'last touched', v: '18 August 2026' }
	];
</script>

<footer class="foot">
	<div class="grid">
		<div class="prose">
			<span class="label lab-mono">colophon</span>
			<p>
				This site is written by hand, in a text editor, on a laptop that is usually somewhere it
				should not be. There is no CMS and no analytics dashboard I actually look at — just a folder
				of markdown and a folder of photographs, both of which grow slowly.
			</p>
			<p>
				Everything here is a work in progress, including the person who made it. If something is
				broken, it is probably because I changed it five minutes ago.
			</p>
		</div>

		<dl class="facts">
			{#each facts as fact (fact.k)}
				<div class="fact">
					<dt class="lab-mono">{fact.k}</dt>
					<dd data-preserve-case>{fact.v}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="base">
		<nav aria-label="Footer">
			<ul>
				<li><a href="/">Photography</a></li>
				<li><a href="/">Book notes</a></li>
				<li><a href="/">Writing</a></li>
				<li><a href="/">Contact</a></li>
			</ul>
		</nav>
		<span class="lab-mono copy">© 2026 matej groombridge</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.75rem, 5cqw, 3rem) clamp(1rem, 4cqw, 2.5rem) 1.25rem;
		background: var(--color-cream);
		border-top: 2px solid var(--color-heading);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		gap: clamp(1.25rem, 5cqw, 4rem);
		align-items: start;
	}

	.label {
		display: block;
		margin-bottom: 0.7rem;
		font-size: 0.5rem;
		color: var(--lab-accent);
	}

	.prose p {
		margin: 0 0 0.75rem;
		max-width: 54ch;
		font-family: var(--font-display);
		font-size: clamp(0.92rem, 2cqw, 1.02rem);
		font-weight: 400;
		line-height: 1.72;
		color: var(--color-ink);
		font-variation-settings:
			'SOFT' 25,
			'opsz' 14;
	}

	.prose p:last-child {
		margin-bottom: 0;
		color: var(--color-subtle);
	}

	.facts {
		display: grid;
		gap: 0;
		margin: 0;
	}

	// Each fact is its own hairline row, so the block reads as a spec sheet
	// sitting alongside the prose rather than a second paragraph.
	.fact {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--lab-hairline);
	}

	.fact:first-child {
		border-top: 1px solid var(--lab-hairline);
	}

	dt {
		flex: 0 0 auto;
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	dd {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-heading);
		text-align: right;
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem 1.5rem;
		margin-top: clamp(1.25rem, 4cqw, 2.25rem);
		padding-top: 0.85rem;
		border-top: 1px solid var(--lab-hairline);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--lab-accent);
	}

	.copy {
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	@container (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
