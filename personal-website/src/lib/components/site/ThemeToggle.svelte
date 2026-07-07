<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>('light');
	let zzz = $state(false);
	let rays = $state(false);

	function applyTheme(nextTheme: Theme) {
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('theme', nextTheme);
		if (nextTheme === 'dark') {
			zzz = false;
			setTimeout(() => (zzz = true), 10);
			setTimeout(() => (zzz = false), 1400);
		} else {
			rays = false;
			setTimeout(() => (rays = true), 10);
			setTimeout(() => (rays = false), 700);
		}
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
	{#if rays}
		<span class="ray-burst" aria-hidden="true"></span>
	{/if}
	{#if zzz}
		<span class="zzz z1" aria-hidden="true">z</span>
		<span class="zzz z2" aria-hidden="true">z</span>
		<span class="zzz z3" aria-hidden="true">z</span>
	{/if}
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

	.ray-burst {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 2px solid currentColor;
		pointer-events: none;
		opacity: 0;
		animation: ray-burst 700ms ease-out forwards;
	}

	@keyframes ray-burst {
		0% {
			opacity: 0.7;
			transform: scale(0.5);
		}
		100% {
			opacity: 0;
			transform: scale(1.8);
		}
	}

	.zzz {
		position: absolute;
		top: 2px;
		left: 55%;
		font-family: var(--font-heading);
		font-size: 0.65rem;
		font-weight: 700;
		line-height: 1;
		color: currentColor;
		opacity: 0;
		pointer-events: none;
		animation: zzz-drift 1.4s ease-out forwards;
	}

	.zzz.z1 {
		animation-delay: 0ms;
	}
	.zzz.z2 {
		animation-delay: 250ms;
		font-size: 0.55rem;
	}
	.zzz.z3 {
		animation-delay: 500ms;
		font-size: 0.45rem;
	}

	@keyframes zzz-drift {
		0% {
			opacity: 0;
			transform: translate(-50%, 0) rotate(-8deg);
		}
		20% {
			opacity: 0.85;
		}
		100% {
			opacity: 0;
			transform: translate(calc(-50% + 14px), -22px) rotate(8deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.icon {
			transition: none;
		}

		.ray-burst,
		.zzz {
			animation: none;
			display: none;
		}
	}
</style>
