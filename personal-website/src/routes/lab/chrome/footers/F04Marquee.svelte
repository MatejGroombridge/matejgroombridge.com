<script lang="ts">
	const links = ['Photography', 'Book notes', 'Writing', '2026', 'Contact'];
	const phrase = 'get in touch';
</script>

<footer class="foot">
	<!-- Pure CSS loop: two identical tracks, the pair translated by exactly half
	     their combined width, so the seam never lands inside the viewport. -->
	<a class="band" href="/" aria-label="Get in touch">
		<div class="track">
			{#each [0, 1] as copy (copy)}
				<span class="run" aria-hidden={copy === 1}>
					{#each [0, 1, 2, 3] as item (item)}
						<span class="word" data-preserve-case>{phrase}</span>
						<span class="sep" aria-hidden="true">✳</span>
					{/each}
				</span>
			{/each}
		</div>
	</a>

	<div class="rows">
		<nav aria-label="Footer">
			<ul>
				{#each links as link (link)}
					<li><a href="/">{link}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="meta lab-mono">
			<span>melbourne, australia</span>
			<span>© 2026</span>
		</div>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		background: var(--color-heading);
		color: var(--color-cream);
		overflow: hidden;
	}

	.band {
		display: block;
		padding: clamp(0.75rem, 2.5cqw, 1.4rem) 0;
		border-bottom: 1px solid rgb(255 255 255 / 0.12);
		text-decoration: none;
		color: inherit;
		overflow: hidden;
	}

	.track {
		display: flex;
		width: max-content;
		animation: slide 26s linear infinite;
	}

	.band:hover .track {
		animation-play-state: paused;
	}

	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}

	.run {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-right: 1.5rem;
	}

	.word {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 6cqw, 3rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		white-space: nowrap;
		font-variation-settings: 'SOFT' 60;
		transition: font-variation-settings 400ms ease;
	}

	.band:hover .word {
		font-variation-settings: 'SOFT' 0;
	}

	.sep {
		font-size: clamp(0.7rem, 2cqw, 1.1rem);
		color: var(--color-green);
	}

	.rows {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 1.5rem;
		padding: clamp(0.85rem, 3cqw, 1.4rem) clamp(1rem, 4cqw, 2.5rem);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		font-family: var(--font-ui);
		font-size: 0.84rem;
		font-weight: 500;
		color: color-mix(in srgb, var(--color-cream) 72%, transparent);
		text-decoration: none;
		transition: color 180ms ease;
	}

	nav a:hover {
		color: var(--color-cream);
	}

	.meta {
		display: flex;
		gap: 1.25rem;
		font-size: 0.52rem;
		color: color-mix(in srgb, var(--color-cream) 45%, transparent);
	}
</style>
