<script lang="ts">
	import { onMount } from 'svelte';

	const ZONE = 'Australia/Melbourne';
	const LAT = -37.8136;
	const LNG = 144.9631;

	const statuses = [
		{ icon: 'menu_book', label: 'reading', value: 'Thinking, Fast and Slow' },
		{ icon: 'code', label: 'building', value: 'this site, again' },
		{ icon: 'directions_run', label: 'training for', value: 'a half, slowly' },
		{ icon: 'photo_camera', label: 'shooting', value: 'Sony α6700 · 35mm' }
	];

	// Rendered blank until mount: a server-rendered clock would bake the build
	// machine's time into the HTML and then visibly jump on hydration.
	let now = $state<Date | null>(null);
	let rotating = $state(0);

	onMount(() => {
		now = new Date();
		const clock = setInterval(() => (now = new Date()), 1000);
		const cycle = setInterval(() => (rotating = (rotating + 1) % statuses.length), 4200);
		return () => {
			clearInterval(clock);
			clearInterval(cycle);
		};
	});

	/** Minutes past local midnight in Melbourne, and the zone's UTC offset. */
	function zoneParts(date: Date) {
		const formatter = new Intl.DateTimeFormat('en-AU', {
			timeZone: ZONE,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		const parts = Object.fromEntries(
			formatter.formatToParts(date).map((part) => [part.type, part.value])
		);
		const hour = Number(parts.hour ?? 0) % 24;
		const minute = Number(parts.minute ?? 0);
		const second = Number(parts.second ?? 0);

		const offsetName =
			new Intl.DateTimeFormat('en-AU', { timeZone: ZONE, timeZoneName: 'shortOffset' })
				.formatToParts(date)
				.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT+10';
		const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(offsetName);
		const sign = match?.[1] === '-' ? -1 : 1;
		const offset = match ? sign * (Number(match[2]) * 60 + Number(match[3] ?? 0)) : 600;

		return { hour, minute, second, minutes: hour * 60 + minute + second / 60, offset };
	}

	/**
	 * NOAA's sunrise/sunset approximation. Accurate to about a minute, which is
	 * plenty for drawing an arc, and avoids shipping a date library for it.
	 */
	function solar(date: Date, offsetMinutes: number) {
		const start = Date.UTC(date.getUTCFullYear(), 0, 0);
		const dayOfYear = Math.floor((date.getTime() - start) / 86400000);
		const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + 0.5);

		const eqTime =
			229.18 *
			(0.000075 +
				0.001868 * Math.cos(gamma) -
				0.032077 * Math.sin(gamma) -
				0.014615 * Math.cos(2 * gamma) -
				0.040849 * Math.sin(2 * gamma));

		const decl =
			0.006918 -
			0.399912 * Math.cos(gamma) +
			0.070257 * Math.sin(gamma) -
			0.006758 * Math.cos(2 * gamma) +
			0.000907 * Math.sin(2 * gamma) -
			0.002697 * Math.cos(3 * gamma) +
			0.00148 * Math.sin(3 * gamma);

		const lat = (LAT * Math.PI) / 180;
		const cosHa =
			Math.cos((90.833 * Math.PI) / 180) / (Math.cos(lat) * Math.cos(decl)) -
			Math.tan(lat) * Math.tan(decl);

		// Polar day / polar night — never happens at this latitude, but the guard
		// keeps `acos` from returning NaN if the coordinates are ever changed.
		if (cosHa > 1) return { sunrise: 0, sunset: 0 };
		if (cosHa < -1) return { sunrise: 0, sunset: 1440 };

		const ha = (Math.acos(cosHa) * 180) / Math.PI;
		const wrap = (m: number) => ((m % 1440) + 1440) % 1440;

		return {
			sunrise: wrap(720 - 4 * (LNG + ha) - eqTime + offsetMinutes),
			sunset: wrap(720 - 4 * (LNG - ha) - eqTime + offsetMinutes)
		};
	}

	const clock = $derived(now ? zoneParts(now) : null);
	const sun = $derived(now && clock ? solar(now, clock.offset) : null);

	const daylight = $derived.by(() => {
		if (!clock || !sun) return null;
		const span = sun.sunset - sun.sunrise;
		const through = (clock.minutes - sun.sunrise) / span;
		return {
			up: through >= 0 && through <= 1,
			through: Math.min(1, Math.max(0, through)),
			hours: Math.floor(span / 60),
			minutes: Math.round(span % 60)
		};
	});

	function hhmm(minutes: number) {
		const h = Math.floor(minutes / 60) % 24;
		const m = Math.round(minutes % 60) % 60;
		return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
	}

	// The sun's position along a 180° arc of radius 90, centred at (100, 100).
	const marker = $derived.by(() => {
		const t = daylight?.through ?? 0;
		const angle = Math.PI * (1 - t);
		return { x: 100 + Math.cos(angle) * 90, y: 100 - Math.sin(angle) * 90 };
	});
</script>

<div class="orb-card" class:night={daylight ? !daylight.up : false}>
	<div class="left">
		<div class="pulse" aria-hidden="true">
			<span class="ring r1"></span>
			<span class="ring r2"></span>
			<span class="core"></span>
		</div>
		<div class="place">
			<span class="city" data-preserve-case>Melbourne</span>
			<span class="coords lab-mono">37.81° S · 144.96° E</span>
		</div>
	</div>

	<div class="clock">
		{#if clock}
			<span class="time" data-preserve-case>
				{String(clock.hour).padStart(2, '0')}<span class="colon">:</span>{String(
					clock.minute
				).padStart(2, '0')}
				<span class="secs lab-mono">{String(clock.second).padStart(2, '0')}</span>
			</span>
			<span class="zone lab-mono">
				{daylight?.up ? 'daylight' : 'after dark'} · utc{clock.offset >= 0 ? '+' : ''}{(
					clock.offset / 60
				).toFixed(clock.offset % 60 ? 1 : 0)}
			</span>
		{:else}
			<span class="time skeleton" aria-hidden="true">--:--</span>
			<span class="zone lab-mono">syncing…</span>
		{/if}
	</div>

	<div class="arc">
		<svg viewBox="0 0 200 118" aria-hidden="true">
			<defs>
				<linearGradient id="orb-sky" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stop-color="var(--lab-accent)" stop-opacity="0.15" />
					<stop offset="50%" stop-color="var(--lab-accent)" stop-opacity="0.9" />
					<stop offset="100%" stop-color="var(--lab-accent)" stop-opacity="0.15" />
				</linearGradient>
			</defs>
			<path
				d="M10 100 A 90 90 0 0 1 190 100"
				fill="none"
				stroke="url(#orb-sky)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-dasharray="1 5"
			/>
			<line x1="4" y1="100" x2="196" y2="100" stroke="var(--lab-hairline)" stroke-width="1" />
			{#if daylight}
				<circle class="sun" cx={marker.x} cy={marker.y} r="7" />
				<circle class="sun-halo" cx={marker.x} cy={marker.y} r="13" />
			{/if}
		</svg>
		<div class="arc-labels lab-mono">
			<span>↑ {sun ? hhmm(sun.sunrise) : '--:--'}</span>
			<span>
				{daylight ? `${daylight.hours}h ${daylight.minutes}m of light` : ''}
			</span>
			<span>{sun ? hhmm(sun.sunset) : '--:--'} ↓</span>
		</div>
	</div>

	<div class="status">
		{#each statuses as item, i (item.label)}
			<div class="status-line" class:on={i === rotating}>
				<span class="material-symbols-rounded" aria-hidden="true">{item.icon}</span>
				<span class="status-label lab-mono">{item.label}</span>
				<span class="status-value" data-preserve-case>{item.value}</span>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.orb-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-areas:
			'left clock'
			'arc arc'
			'status status';
		gap: clamp(0.9rem, 2.5vw, 1.5rem);
		padding: clamp(1.1rem, 2.6vw, 1.75rem);
		border-radius: var(--radius-lg);
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--lab-accent) 10%, var(--color-surface)),
			var(--color-surface) 55%
		);
		border: 1px solid var(--lab-hairline);
		transition: background 900ms ease;
	}

	.orb-card.night {
		background: linear-gradient(
			160deg,
			color-mix(in srgb, #2b3a6b 22%, var(--color-surface)),
			var(--color-surface) 60%
		);
	}

	.left {
		grid-area: left;
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.pulse {
		position: relative;
		width: 34px;
		height: 34px;
		flex: 0 0 auto;
	}

	.core,
	.ring {
		position: absolute;
		inset: 0;
		margin: auto;
		border-radius: 999px;
	}

	.core {
		width: 12px;
		height: 12px;
		background: var(--lab-accent);
		box-shadow: 0 0 14px color-mix(in srgb, var(--lab-accent) 70%, transparent);
	}

	.ring {
		width: 12px;
		height: 12px;
		border: 1.5px solid var(--lab-accent);
		opacity: 0;
		animation: breathe 3.2s ease-out infinite;
	}

	.r2 {
		animation-delay: 1.6s;
	}

	@keyframes breathe {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		100% {
			transform: scale(2.9);
			opacity: 0;
		}
	}

	.place {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
	}

	.city {
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 650;
		letter-spacing: -0.02em;
		color: var(--color-heading);
	}

	.coords {
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.clock {
		grid-area: clock;
		display: grid;
		justify-items: end;
		gap: 0.15rem;
	}

	.time {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		font-family: var(--font-ui);
		font-size: clamp(1.7rem, 4.5vw, 2.6rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--color-heading);
		font-variant-numeric: tabular-nums;
	}

	.time.skeleton {
		opacity: 0.25;
	}

	.colon {
		animation: blink 2s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0.25;
		}
	}

	.secs {
		font-size: 0.7rem;
		color: var(--lab-accent);
		letter-spacing: 0.05em;
	}

	.zone {
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.arc {
		grid-area: arc;
		display: grid;
		gap: 0.35rem;
	}

	// The 200×118 viewBox scales to its container, so without a cap the arc grows
	// as tall as the card is wide. Bound the width and centre it instead.
	.arc svg {
		display: block;
		width: 100%;
		max-width: 420px;
		height: auto;
		margin-inline: auto;
		overflow: visible;
	}

	.sun {
		fill: var(--lab-accent);
		transition:
			cx 800ms ease,
			cy 800ms ease;
	}

	.sun-halo {
		fill: var(--lab-accent);
		opacity: 0.16;
		transition:
			cx 800ms ease,
			cy 800ms ease;
	}

	.arc-labels {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		width: 100%;
		max-width: 440px;
		margin-inline: auto;
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.status {
		grid-area: status;
		position: relative;
		height: 2.4rem;
		border-top: 1px solid var(--lab-hairline);
		padding-top: 0.7rem;
	}

	.status-line {
		position: absolute;
		inset: 0.7rem 0 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 420ms ease,
			transform 420ms ease;
		pointer-events: none;
	}

	.status-line.on {
		opacity: 1;
		transform: none;
	}

	.status-line .material-symbols-rounded {
		font-size: 1.05rem;
		color: var(--lab-accent);
	}

	.status-label {
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.status-value {
		font-size: 0.92rem;
		font-weight: 550;
		color: var(--color-heading);
	}

	@media (max-width: 520px) {
		.orb-card {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'left'
				'clock'
				'arc'
				'status';
		}

		.clock {
			justify-items: start;
		}
	}
</style>
