<script lang="ts">
	const now = [
		{ label: 'reading', value: 'Thinking, Fast and Slow', tint: 'a' },
		{ label: 'building', value: 'this site, again', tint: 'b' },
		{ label: 'shooting', value: 'Sony α6700 · 35mm', tint: 'c' },
		{ label: 'training for', value: 'a half, slowly', tint: 'd' }
	];
</script>

<footer class="foot">
	<div class="head">
		<span class="label lab-mono"><i class="pip"></i> now</span>
		<span class="stamp lab-mono">updated 3 days ago</span>
	</div>

	<ul class="cards">
		{#each now as item (item.label)}
			<li class={`card tint-${item.tint}`}>
				<span class="k lab-mono">{item.label}</span>
				<span class="v" data-preserve-case>{item.value}</span>
			</li>
		{/each}
	</ul>

	<div class="base">
		<p>
			This is what I am actually doing, not what I would like you to think I am doing.
			<a href="/">Full log →</a>
		</p>
		<div class="links lab-mono">
			<a href="/">photos</a>
			<a href="/">books</a>
			<a href="/">contact</a>
		</div>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		display: grid;
		gap: 0.9rem;
		padding: clamp(1.5rem, 4cqw, 2.5rem) clamp(1rem, 4cqw, 2.5rem);
		background: var(--color-muted);
		border-top: 1px solid var(--lab-hairline);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.label {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.55rem;
		color: var(--color-heading);
	}

	.pip {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--lab-accent);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--lab-accent) 55%, transparent);
		animation: ping 2.4s ease-out infinite;
	}

	@keyframes ping {
		70%,
		100% {
			box-shadow: 0 0 0 7px transparent;
		}
	}

	.stamp {
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.card {
		display: grid;
		gap: 0.25rem;
		padding: 0.75rem 0.85rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		// A hairline of colour on the leading edge distinguishes the four
		// strands without turning the row into four different coloured boxes.
		border-left-width: 3px;
		transition: transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.card:hover {
		transform: translateY(-3px);
	}

	.tint-a {
		border-left-color: var(--lab-accent);
	}
	.tint-b {
		border-left-color: #6d8fd6;
	}
	.tint-c {
		border-left-color: #d6a24c;
	}
	.tint-d {
		border-left-color: #c47a9b;
	}

	.k {
		font-size: 0.48rem;
		color: var(--color-subtle);
	}

	.v {
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--color-heading);
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem 1.5rem;
		padding-top: 0.6rem;
		border-top: 1px solid var(--lab-hairline);
	}

	.base p {
		margin: 0;
		max-width: 52ch;
		font-size: 0.8rem;
		color: var(--color-subtle);
	}

	.base p a {
		color: var(--lab-accent);
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}

	.links {
		display: flex;
		gap: 0.9rem;
		font-size: 0.52rem;
	}

	.links a {
		color: var(--color-subtle);
		text-decoration: none;
	}

	.links a:hover {
		color: var(--color-heading);
	}

	@container (max-width: 720px) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@container (max-width: 400px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
