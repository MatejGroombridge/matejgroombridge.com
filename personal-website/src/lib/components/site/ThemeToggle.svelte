<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>('light');

	function applyTheme(nextTheme: Theme) {
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('theme', nextTheme);
	}

	onMount(() => {
		const currentTheme = document.documentElement.dataset.theme;
		theme = currentTheme === 'dark' ? 'dark' : 'light';
	});
</script>

<button
	class="theme-toggle"
	type="button"
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={theme === 'dark'}
	onclick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
>
	<svg class="icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="M4.93 4.93l1.41 1.41" />
		<path d="M17.66 17.66l1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="M6.34 17.66l-1.41 1.41" />
		<path d="M19.07 4.93l-1.41 1.41" />
	</svg>
	<svg class="icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
	</svg>
</button>

<style lang="scss">
	.theme-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: inherit;
		cursor: pointer;
		transition:
			color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.theme-toggle:hover {
		color: var(--color-green);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-green-soft);
		outline-offset: 2px;
	}

	.icon {
		position: absolute;
		width: 20px;
		height: 20px;
		transition:
			opacity var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.icon-sun {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	.icon-moon {
		opacity: 0;
		transform: scale(0.5) rotate(-90deg);
	}

	:global([data-theme='dark']) .icon-sun {
		opacity: 0;
		transform: scale(0.5) rotate(90deg);
	}

	:global([data-theme='dark']) .icon-moon {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.icon {
			transition: none;
		}
	}
</style>
