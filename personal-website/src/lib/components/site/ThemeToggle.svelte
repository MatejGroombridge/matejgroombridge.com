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
	class="celestial"
	class:dark={theme === 'dark'}
	type="button"
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={theme === 'dark'}
	onclick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
>
	{#if theme === 'dark'}
		<!-- moon -->
		<svg viewBox="0 0 12 12" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
			<!-- crescent body -->
			<rect x="4" y="1" width="4" height="1" fill="#e6dcc0" />
			<rect x="3" y="2" width="5" height="1" fill="#e6dcc0" />
			<rect x="2" y="3" width="5" height="1" fill="#e6dcc0" />
			<rect x="2" y="4" width="4" height="1" fill="#e6dcc0" />
			<rect x="2" y="5" width="4" height="1" fill="#e6dcc0" />
			<rect x="2" y="6" width="4" height="1" fill="#e6dcc0" />
			<rect x="2" y="7" width="5" height="1" fill="#e6dcc0" />
			<rect x="3" y="8" width="5" height="1" fill="#e6dcc0" />
			<rect x="4" y="9" width="4" height="1" fill="#e6dcc0" />
			<!-- shadow side -->
			<rect x="7" y="2" width="1" height="1" fill="#b8ad8e" />
			<rect x="6" y="3" width="1" height="2" fill="#b8ad8e" />
			<rect x="5" y="4" width="1" height="3" fill="#b8ad8e" />
			<rect x="6" y="7" width="1" height="2" fill="#b8ad8e" />
			<rect x="7" y="8" width="1" height="1" fill="#b8ad8e" />
			<!-- craters -->
			<rect x="3" y="4" width="1" height="1" fill="#b8ad8e" />
			<rect x="4" y="6" width="1" height="1" fill="#b8ad8e" />
		</svg>
		{#if zzz}
			<span class="zzz z1">z</span>
			<span class="zzz z2">z</span>
			<span class="zzz z3">z</span>
		{/if}
	{:else}
		<!-- sun -->
		<svg viewBox="0 0 12 12" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
			<!-- rays -->
			<rect x="5" y="0" width="2" height="1" fill="#f4b942" />
			<rect x="5" y="11" width="2" height="1" fill="#f4b942" />
			<rect x="0" y="5" width="1" height="2" fill="#f4b942" />
			<rect x="11" y="5" width="1" height="2" fill="#f4b942" />
			<rect x="1" y="1" width="1" height="1" fill="#f4b942" />
			<rect x="10" y="1" width="1" height="1" fill="#f4b942" />
			<rect x="1" y="10" width="1" height="1" fill="#f4b942" />
			<rect x="10" y="10" width="1" height="1" fill="#f4b942" />
			<!-- body -->
			<rect x="4" y="3" width="4" height="1" fill="#f4b942" />
			<rect x="3" y="4" width="6" height="4" fill="#f4b942" />
			<rect x="4" y="8" width="4" height="1" fill="#f4b942" />
			<!-- highlight -->
			<rect x="4" y="4" width="2" height="1" fill="#ffd97a" />
			<rect x="4" y="5" width="1" height="1" fill="#ffd97a" />
			<!-- shadow -->
			<rect x="7" y="6" width="1" height="2" fill="#d99428" />
			<rect x="5" y="7" width="3" height="1" fill="#d99428" />
		</svg>
		{#if rays}
			<span class="ray-burst" aria-hidden="true"></span>
		{/if}
	{/if}
</button>

<style lang="scss">
	.celestial {
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
		transition:
			background var(--duration-fast) ease,
			border-color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.celestial:hover {
		transform: translateY(-1px);
	}

	.celestial:focus-visible {
		outline: 2px solid var(--color-green-soft);
		outline-offset: 2px;
	}

	.celestial svg {
		display: block;
		width: 24px;
		height: 24px;
		overflow: visible;
		filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.08));
	}

	.celestial.dark svg {
		animation: moon-fade 320ms ease both;
	}

	.celestial:not(.dark) svg {
		animation: sun-spin 400ms ease both;
	}

	@keyframes moon-fade {
		0% {
			opacity: 0;
			transform: translateY(-4px) rotate(-8deg);
		}
		100% {
			opacity: 1;
			transform: translateY(0) rotate(0);
		}
	}

	@keyframes sun-spin {
		0% {
			opacity: 0;
			transform: rotate(-90deg) scale(0.6);
		}
		100% {
			opacity: 1;
			transform: rotate(0) scale(1);
		}
	}

	.zzz {
		position: absolute;
		top: 0;
		left: 50%;
		font-family: var(--font-heading);
		font-size: 0.65rem;
		font-weight: 700;
		color: #b8ad8e;
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
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate(calc(-50% + 14px), -22px) rotate(8deg);
		}
	}

	.ray-burst {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 2px solid #f4b942;
		pointer-events: none;
		opacity: 0;
		animation: ray-burst 700ms ease-out forwards;
	}

	@keyframes ray-burst {
		0% {
			opacity: 0.8;
			transform: scale(0.5);
		}
		100% {
			opacity: 0;
			transform: scale(1.8);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.zzz,
		.ray-burst {
			animation: none;
			display: none;
		}
		.celestial svg {
			animation: none;
		}
	}
</style>
