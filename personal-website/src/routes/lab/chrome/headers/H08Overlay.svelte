<script lang="ts">
	import { photoTrips } from '$lib/content';

	const links = [
		{ label: 'Photography', image: photoTrips[0]?.coverImage },
		{ label: 'Book notes', image: photoTrips[1]?.coverImage },
		{ label: 'Writing', image: photoTrips[2]?.coverImage },
		{ label: '2026', image: photoTrips[3]?.coverImage },
		{ label: 'Contact', image: photoTrips[4]?.coverImage }
	];

	let open = $state(false);
	let hovered = $state(0);
</script>

<header class="bar" class:open>
	<a class="brand" href="/" data-preserve-case>Matej Groombridge</a>
	<button class="toggle" type="button" aria-expanded={open} onclick={() => (open = !open)}>
		<span class="toggle-label lab-mono">{open ? 'close' : 'menu'}</span>
		<span class="burger" aria-hidden="true"><i></i><i></i></span>
	</button>
</header>

{#if open}
	<div class="overlay">
		<!-- The preview image cross-fades behind the list as you move down it. -->
		<div class="art" aria-hidden="true">
			{#each links as link, i (link.label)}
				{#if link.image}
					<img src={link.image} alt="" class:showing={hovered === i} />
				{/if}
			{/each}
		</div>

		<nav aria-label="Primary">
			<ul>
				{#each links as link, i (link.label)}
					<li style={`--d:${i * 55}ms`}>
						<a href="/" onmouseenter={() => (hovered = i)} onfocus={() => (hovered = i)}>
							<span class="num lab-mono">{String(i + 1).padStart(2, '0')}</span>
							<span class="big" data-preserve-case>{link.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}

<style lang="scss">
	.bar {
		position: sticky;
		top: 0;
		z-index: 7;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem clamp(1rem, 4cqw, 2.5rem);
		background: color-mix(in srgb, var(--color-cream) 88%, transparent);
		backdrop-filter: blur(12px);
	}

	.bar.open {
		background: transparent;
		backdrop-filter: none;
	}

	.brand {
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: -0.035em;
		color: var(--color-heading);
		text-decoration: none;
		position: relative;
		z-index: 8;
	}

	.toggle {
		position: relative;
		z-index: 8;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
	}

	.toggle-label {
		font-size: 0.55rem;
		color: var(--color-subtle);
	}

	.burger {
		display: grid;
		gap: 3px;
		width: 14px;
	}

	.burger i {
		display: block;
		height: 1.5px;
		background: var(--color-heading);
		transition: transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.2);
	}

	.bar.open .burger i:first-child {
		transform: translateY(2.25px) rotate(45deg);
	}

	.bar.open .burger i:last-child {
		transform: translateY(-2.25px) rotate(-45deg);
	}

	.overlay {
		position: absolute;
		inset: 0;
		z-index: 6;
		display: grid;
		align-content: center;
		padding: 3.5rem clamp(1rem, 4cqw, 2.5rem) 1.5rem;
		background: var(--color-cream);
		overflow: hidden;
		animation: wipe 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	@keyframes wipe {
		from {
			clip-path: inset(0 0 100% 0);
		}
	}

	.art {
		position: absolute;
		inset: 0;
		opacity: 0.22;
	}

	.art img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.06);
		transition:
			opacity 500ms ease,
			transform 900ms ease;
	}

	.art img.showing {
		opacity: 1;
		transform: scale(1);
	}

	nav {
		position: relative;
	}

	ul {
		display: grid;
		gap: 0.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		opacity: 0;
		transform: translateY(14px);
		animation: rise 460ms cubic-bezier(0.2, 0.9, 0.3, 1) var(--d) forwards;
	}

	@keyframes rise {
		to {
			opacity: 1;
			transform: none;
		}
	}

	nav a {
		display: flex;
		align-items: baseline;
		gap: 0.85rem;
		text-decoration: none;
		color: var(--color-heading);
	}

	.num {
		font-size: 0.55rem;
		color: var(--lab-accent);
	}

	.big {
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 7cqw, 3rem);
		font-weight: 500;
		line-height: 1.06;
		letter-spacing: -0.035em;
		font-variation-settings: 'SOFT' 40;
		transition:
			transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
			font-variation-settings 320ms ease;
	}

	nav a:hover .big {
		transform: translateX(10px);
		font-variation-settings: 'SOFT' 90;
	}
</style>
