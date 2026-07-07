<script lang="ts">
	import { onMount } from 'svelte';

	const LOCATION = {
		label: 'Sydney',
		lat: -33.8688,
		lon: 151.2093,
		timeZone: 'Australia/Sydney'
	};

	let timeStr = $state('');
	let temp = $state<number | null>(null);
	let code = $state<number | null>(null);

	function updateTime() {
		const now = new Date();
		timeStr = new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
			timeZone: LOCATION.timeZone
		}).format(now);
	}

	function weatherIcon(c: number | null): string {
		if (c === null) return '';
		if (c === 0) return 'clear_day';
		if ([1, 2].includes(c)) return 'partly_cloudy_day';
		if (c === 3) return 'cloud';
		if ([45, 48].includes(c)) return 'foggy';
		if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c)) return 'rainy';
		if ([71, 73, 75, 77, 85, 86].includes(c)) return 'weather_snowy';
		if ([95, 96, 99].includes(c)) return 'thunderstorm';
		return '';
	}

	async function fetchWeather() {
		try {
			const res = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=temperature_2m,weather_code&timezone=auto`
			);
			if (!res.ok) return;
			const data = await res.json();
			temp = Math.round(data?.current?.temperature_2m ?? 0);
			code = data?.current?.weather_code ?? null;
		} catch {
			// silent — widget just won't show weather
		}
	}

	onMount(() => {
		updateTime();
		fetchWeather();
		const timeInterval = setInterval(updateTime, 30_000);
		const weatherInterval = setInterval(fetchWeather, 15 * 60_000);
		return () => {
			clearInterval(timeInterval);
			clearInterval(weatherInterval);
		};
	});
</script>

<span class="local" aria-label="Local time and weather in {LOCATION.label}">
	<span class="mark" aria-hidden="true">✘</span>
	<span class="place">{LOCATION.label}</span>
	<span class="sep" aria-hidden="true">·</span>
	<span class="time">{timeStr || '--:--'}</span>
	{#if temp !== null}
		<span class="sep" aria-hidden="true">·</span>
		<span class="temp">{temp}°</span>
		<span class="icon material-symbols-rounded" aria-hidden="true">{weatherIcon(code)}</span>
	{/if}
</span>

<style lang="scss">
	.local {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-body);
		font-size: 0.86rem;
		color: var(--color-subtle);
		letter-spacing: 0.02em;
		font-variant-numeric: tabular-nums;
	}

	.mark {
		font-size: 0.7rem;
		color: var(--color-green);
		margin-right: -0.25rem;
	}

	.place {
		font-weight: 600;
		color: var(--color-ink);
	}

	.sep {
		opacity: 0.5;
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.05rem;
		line-height: 1;
		color: inherit;
		font-variation-settings:
			'FILL' 1,
			'wght' 400,
			'GRAD' 0,
			'opsz' 20;
	}

</style>
