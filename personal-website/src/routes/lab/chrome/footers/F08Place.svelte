<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state('--:--');

	onMount(() => {
		const tick = () =>
			(time = new Intl.DateTimeFormat('en-AU', {
				timeZone: 'Australia/Melbourne',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			}).format(new Date()));
		tick();
		const id = setInterval(tick, 20_000);
		return () => clearInterval(id);
	});
</script>

<footer class="foot">
	<div class="grid">
		<div class="place">
			<span class="label lab-mono">based in</span>
			<h4 data-preserve-case>Melbourne</h4>
			<div class="readout lab-mono">
				<span>37.8136° S</span>
				<span>144.9631° E</span>
				<span class="time"><i></i>{time} aedt</span>
			</div>
			<p>Available for work that involves a camera, a keyboard, or ideally both.</p>
		</div>

		<!-- A drawn location mark rather than a map tile: no third-party embed,
		     no tracking, and it retints with the theme. -->
		<div class="map" aria-hidden="true">
			<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
				<defs>
					<pattern id="place-grid" width="16" height="16" patternUnits="userSpaceOnUse">
						<path
							d="M16 0H0V16"
							fill="none"
							stroke="currentColor"
							stroke-width="0.5"
							opacity="0.4"
						/>
					</pattern>
				</defs>
				<rect width="200" height="140" fill="url(#place-grid)" />
				<path
					d="M-10 96 C 40 84, 62 104, 96 92 S 160 74, 212 88"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
					opacity="0.55"
				/>
				<path
					d="M-10 112 C 46 102, 70 118, 104 108 S 168 92, 212 104"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					opacity="0.3"
				/>
				<g class="pin">
					<circle cx="100" cy="62" r="22" class="halo" />
					<circle cx="100" cy="62" r="12" class="halo two" />
					<circle cx="100" cy="62" r="4.5" class="dot" />
				</g>
			</svg>
		</div>
	</div>

	<div class="base">
		<nav aria-label="Footer">
			<ul>
				<li><a href="/">Photography</a></li>
				<li><a href="/">Book notes</a></li>
				<li><a href="/">Writing</a></li>
				<li><a href="/">Contact</a></li>
			</ul>
		</nav>
		<span class="lab-mono copy">© 2026 matej groombridge</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.5rem, 4cqw, 2.5rem) clamp(1rem, 4cqw, 2.5rem) 1.1rem;
		background: var(--color-cream);
		border-top: 1px solid var(--lab-hairline);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
		gap: clamp(1.25rem, 4cqw, 3rem);
		align-items: center;
	}

	.label {
		display: block;
		margin-bottom: 0.3rem;
		font-size: 0.5rem;
		color: var(--lab-accent);
	}

	h4 {
		margin: 0 0 0.5rem;
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 5cqw, 2.6rem);
		font-weight: 500;
		letter-spacing: -0.035em;
		color: var(--color-heading);
		font-variation-settings: 'SOFT' 45;
	}

	.readout {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 1rem;
		padding-bottom: 0.7rem;
		border-bottom: 1px solid var(--lab-hairline);
		font-size: 0.52rem;
		color: var(--color-subtle);
	}

	.time {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--color-heading);
	}

	.time i {
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--lab-accent);
	}

	.place p {
		margin: 0.7rem 0 0;
		max-width: 34ch;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-subtle);
	}

	.map {
		height: clamp(120px, 22cqw, 170px);
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-muted);
		color: var(--color-subtle);
		overflow: hidden;
	}

	.map svg {
		width: 100%;
		height: 100%;
	}

	.halo {
		fill: var(--lab-accent);
		opacity: 0.12;
		transform-origin: 100px 62px;
		animation: pulse 3.4s ease-out infinite;
	}

	.halo.two {
		opacity: 0.22;
		animation-delay: 0.5s;
	}

	.dot {
		fill: var(--lab-accent);
	}

	@keyframes pulse {
		0% {
			transform: scale(0.6);
			opacity: 0.3;
		}
		100% {
			transform: scale(1.35);
			opacity: 0;
		}
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem 1.5rem;
		margin-top: clamp(1.1rem, 3cqw, 1.75rem);
		padding-top: 0.85rem;
		border-top: 1px solid var(--lab-hairline);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--lab-accent);
	}

	.copy {
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	@container (max-width: 620px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
