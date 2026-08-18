<script lang="ts">
	const primary = ['Photography', 'Book notes', 'Writing'];
	const secondary = ['2026', 'About', 'Contact'];
</script>

<header class="masthead">
	<div class="top">
		<a class="wordmark" href="/" data-preserve-case>Matej<br />Groombridge</a>

		<div class="cols">
			<nav aria-label="Primary">
				<span class="col-label lab-mono">the work</span>
				<ul>
					{#each primary as link, i (link)}
						<li>
							<a href="/">
								<span class="idx lab-mono">{String(i + 1).padStart(2, '0')}</span>
								<span class="label">{link}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Secondary">
				<span class="col-label lab-mono">the person</span>
				<ul>
					{#each secondary as link, i (link)}
						<li>
							<a href="/">
								<span class="idx lab-mono">{String(i + 4).padStart(2, '0')}</span>
								<span class="label">{link}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>

	<div class="strap lab-mono">
		<span>photographer &amp; software engineer</span>
		<span>melbourne, australia</span>
		<span>est. 2019</span>
	</div>
</header>

<style lang="scss">
	.masthead {
		padding: clamp(1.5rem, 4cqw, 2.75rem) clamp(1rem, 4cqw, 2.5rem) 0;
		border-bottom: 2px solid var(--color-heading);
		background: var(--color-cream);
	}

	.top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: clamp(1rem, 4cqw, 3rem);
	}

	.wordmark {
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 6cqw, 3.1rem);
		font-weight: 600;
		line-height: 0.94;
		letter-spacing: -0.035em;
		color: var(--color-heading);
		text-decoration: none;
		font-variation-settings:
			'SOFT' 40,
			'opsz' 120;
	}

	.cols {
		display: flex;
		gap: clamp(1.25rem, 4cqw, 3rem);
	}

	.col-label {
		display: block;
		margin-bottom: 0.55rem;
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--lab-hairline);
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	ul {
		display: grid;
		gap: 0.18rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.cols a {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-heading);
	}

	.idx {
		font-size: 0.5rem;
		color: var(--color-subtle);
		transition: color 200ms ease;
	}

	.label {
		font-family: var(--font-ui);
		font-size: 0.84rem;
		font-weight: 500;
		white-space: nowrap;
		// Underline is drawn on the text box itself so descenders stay clear.
		background-image: linear-gradient(var(--lab-accent), var(--lab-accent));
		background-size: 0% 1.5px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: background-size 280ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.cols a:hover .label {
		background-size: 100% 1.5px;
	}

	.cols a:hover .idx {
		color: var(--lab-accent);
	}

	.strap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.4rem 1.5rem;
		margin-top: clamp(1rem, 3cqw, 2rem);
		padding: 0.5rem 0;
		border-top: 1px solid var(--lab-hairline);
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	@container (max-width: 700px) {
		.top {
			flex-direction: column;
			gap: 1.25rem;
		}

		.wordmark {
			font-size: clamp(2rem, 9cqw, 2.6rem);
		}
	}

	@container (max-width: 420px) {
		.strap span:nth-child(3) {
			display: none;
		}
	}
</style>
