<script lang="ts">
	const columns = [
		{ label: 'Look', links: ['Photography', 'Trips', 'Gear'] },
		{ label: 'Read', links: ['Book notes', 'Writing', 'Now'] },
		{ label: 'Find me', links: ['Instagram', 'GitHub', 'LinkedIn'] }
	];
</script>

<footer class="foot">
	<div class="top">
		{#each columns as column (column.label)}
			<div class="col">
				<span class="col-label lab-mono">{column.label}</span>
				<ul>
					{#each column.links as link (link)}
						<li><a href="/">{link}</a></li>
					{/each}
				</ul>
			</div>
		{/each}

		<div class="col say">
			<span class="col-label lab-mono">say hello</span>
			<a class="mail" href="/" data-preserve-case>matejdpg@gmail.com</a>
			<p>Usually a reply within a day, unless I am somewhere with no signal.</p>
		</div>
	</div>

	<!-- Outlined rather than filled: at this size a solid wordmark would out-shout
	     everything above it, where an outline just holds the bottom of the page. -->
	<div class="wordmark" aria-hidden="true">Groombridge</div>

	<div class="base lab-mono">
		<span>© 2026 matej groombridge</span>
		<span>built in melbourne · sveltekit</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		display: grid;
		gap: clamp(1.25rem, 4cqw, 2.5rem);
		padding: clamp(1.75rem, 5cqw, 3rem) clamp(1rem, 4cqw, 2.5rem) 0;
		background: var(--color-cream);
		border-top: 1px solid var(--lab-hairline);
		overflow: hidden;
	}

	.top {
		display: grid;
		grid-template-columns: repeat(3, auto) minmax(180px, 1fr);
		gap: clamp(1rem, 3cqw, 2.5rem);
	}

	.col-label {
		display: block;
		margin-bottom: 0.6rem;
		font-size: 0.5rem;
		color: var(--lab-accent);
	}

	ul {
		display: grid;
		gap: 0.3rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.col a {
		font-family: var(--font-ui);
		font-size: 0.84rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
		transition: color 180ms ease;
	}

	.col a:hover {
		color: var(--color-heading);
	}

	.say {
		justify-self: end;
		text-align: right;
	}

	.mail {
		display: inline-block;
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-heading);
		text-decoration: none;
		border-bottom: 1.5px solid var(--lab-accent);
	}

	.say p {
		margin: 0.5rem 0 0;
		max-width: 26ch;
		margin-left: auto;
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--color-subtle);
	}

	.wordmark {
		margin-inline: -0.02em;
		font-family: var(--font-ui);
		// Sized so the eleven characters of the surname fit at any container
		// width. Kept well under the measured limit because Poppins at weight
		// 800 sets appreciably wider than the fallback it is measured against.
		font-size: 14cqw;
		font-weight: 800;
		line-height: 0.8;
		letter-spacing: -0.045em;
		text-align: center;
		white-space: nowrap;
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in srgb, var(--color-ink) 26%, transparent);
		user-select: none;
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.35rem 1.5rem;
		padding: 0.75rem 0 1rem;
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	@container (max-width: 720px) {
		.top {
			grid-template-columns: repeat(3, 1fr);
		}

		.say {
			grid-column: 1 / -1;
			justify-self: start;
			text-align: left;
		}

		.say p {
			margin-left: 0;
		}
	}

	@container (max-width: 440px) {
		.top {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}
	}
</style>
