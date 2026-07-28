<script lang="ts">
	import { siteSettings } from '$lib/content/site';
	import Container from '$lib/components/ui/Container.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header class="site-header">
	<Container>
		<nav class="nav" aria-label="Primary navigation">
			<a class="brand" href="/" onclick={closeMenu} data-preserve-case
				>{siteSettings.name.toUpperCase()}</a
			>

			<div id="primary-nav" class="nav-links" class:open={menuOpen}>
				{#each siteSettings.nav as link}
					<a href={link.href} onclick={closeMenu}>
						<span class="material-symbols-rounded nav-icon" aria-hidden="true">{link.icon}</span>
						<span class="nav-label">{link.label}</span>
					</a>
				{/each}
			</div>

			<div class="actions">
				<ThemeToggle />
				<button
					class="menu-toggle"
					type="button"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
					aria-controls="primary-nav"
					onclick={toggleMenu}
				>
					<span class="material-symbols-rounded" aria-hidden="true">
						{menuOpen ? 'close' : 'menu'}
					</span>
				</button>
			</div>
		</nav>
	</Container>
</header>

<style lang="scss">
	.site-header {
		background: var(--color-cream);
		border-bottom: 1px solid var(--color-header-border);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		min-height: var(--header-height);
	}

	.brand {
		color: var(--color-heading);
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-links {
		display: flex;
		flex: 1 1 auto;
		justify-content: center;
		align-items: center;
		gap: clamp(0.75rem, 1.8vw, 1.4rem);
	}

	.nav-links a {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-ink);
		text-decoration: none;
		padding: 0.4rem 0;
		transition: color var(--duration-fast) ease;
	}

	.nav-icon {
		font-size: 1.15rem;
		line-height: 1;
		color: inherit;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 2px;
		background: var(--color-green);
		transform: scaleX(0);
		transform-origin: center;
		transition: transform var(--duration-base) cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.nav-links a:hover,
	.nav-links a:focus-visible {
		color: var(--color-heading);
	}

	.nav-links a:hover::after,
	.nav-links a:focus-visible::after {
		transform: scaleX(1);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.menu-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-ink);
	}

	.menu-toggle .material-symbols-rounded {
		font-size: 1.4rem;
	}

	@media (max-width: 820px) {
		.nav {
			flex-wrap: wrap;
			min-height: 0;
			padding-block: 0.85rem;
			gap: 0.75rem;
		}

		.menu-toggle {
			display: inline-flex;
		}

		.nav-links {
			order: 4;
			flex: 1 1 100%;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0;
			display: none;
		}

		.nav-links.open {
			display: flex;
			padding: 0.5rem 0 0.75rem;
		}

		.nav-links a {
			justify-content: center;
			padding: 0.25rem 0;
			margin: 0;
			font-size: 1rem;
			font-weight: 500;
		}

		.nav-icon {
			display: none;
		}

		.nav-links a::after {
			bottom: -4px;
		}
	}

	@media (min-width: 821px) {
		.menu-toggle {
			display: none;
		}

		.actions {
			margin-right: -0.625rem;
		}
	}
</style>
