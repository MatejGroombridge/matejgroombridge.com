<script lang="ts">
	import { photoTrips } from '$lib/content';

	// One frame per trip, newest first — the footer doubles as a way back into
	// the galleries rather than being a dead end.
	const frames = photoTrips.slice(0, 7).map((trip) => ({
		slug: trip.slug,
		title: trip.title,
		year: trip.year,
		image: trip.coverImage
	}));

	let hovered = $state<number | null>(null);
</script>

<footer class="foot">
	<ul class="strip" onmouseleave={() => (hovered = null)}>
		{#each frames as frame, i (frame.slug)}
			<li>
				<a
					class="frame"
					class:on={hovered === i}
					href="/"
					style={`--i:${i}`}
					onmouseenter={() => (hovered = i)}
					onfocus={() => (hovered = i)}
					aria-label={`${frame.title}, ${frame.year}`}
				>
					<img src={frame.image} alt="" loading="lazy" />
					<span class="cap lab-mono">
						<b data-preserve-case>{frame.title}</b>
						<i>{frame.year}</i>
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="under">
		<div class="say">
			<span class="label lab-mono">seven trips, one lens</span>
			<a class="cta" href="/">
				See all the photographs
				<span aria-hidden="true">→</span>
			</a>
		</div>

		<nav aria-label="Footer">
			<ul>
				<li><a href="/">Book notes</a></li>
				<li><a href="/">Writing</a></li>
				<li><a href="/">2026</a></li>
				<li><a href="/">Contact</a></li>
			</ul>
		</nav>
	</div>

	<div class="base lab-mono">
		<span>© 2026 matej groombridge</span>
		<span>all photographs my own</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		background: var(--color-heading);
		color: var(--color-cream);
	}

	// Flex with a grown basis on hover: the hovered frame takes the space and
	// its neighbours give it up, so the strip stays exactly full width.
	.strip {
		display: flex;
		height: clamp(110px, 20cqw, 180px);
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: hidden;
	}

	.strip li {
		display: flex;
		flex: 1 1 0;
		min-width: 0;
		border-right: 1px solid rgb(0 0 0 / 0.35);
		transition: flex-grow 480ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.strip li:last-child {
		border-right: none;
	}

	.strip li:has(.frame.on) {
		flex-grow: 2.4;
	}

	.frame {
		position: relative;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
	}

	.frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(0.65) brightness(0.72);
		transform: scale(1.04);
		transition:
			filter 480ms ease,
			transform 700ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.frame.on img {
		filter: grayscale(0) brightness(0.92);
		transform: scale(1);
	}

	.cap {
		position: absolute;
		left: 0.55rem;
		bottom: 0.5rem;
		right: 0.55rem;
		display: flex;
		flex-direction: column;
		gap: 0.05rem;
		font-size: 0.5rem;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 320ms ease,
			transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.frame.on .cap {
		opacity: 1;
		transform: none;
	}

	.cap b {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.cap i {
		font-style: normal;
		color: var(--color-green);
	}

	.under {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 1.5rem;
		padding: clamp(1.1rem, 3cqw, 1.75rem) clamp(1rem, 4cqw, 2.5rem) 0.85rem;
	}

	.label {
		display: block;
		margin-bottom: 0.25rem;
		font-size: 0.5rem;
		color: color-mix(in srgb, var(--color-cream) 50%, transparent);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-display);
		font-size: clamp(1.15rem, 3cqw, 1.7rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-cream);
		text-decoration: none;
		font-variation-settings: 'SOFT' 45;
	}

	.cta span {
		transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1.3);
	}

	.cta:hover span {
		transform: translateX(6px);
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
		font-size: 0.82rem;
		font-weight: 500;
		color: color-mix(in srgb, var(--color-cream) 70%, transparent);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--color-green);
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.3rem 1.5rem;
		padding: 0 clamp(1rem, 4cqw, 2.5rem) 1rem;
		font-size: 0.5rem;
		color: color-mix(in srgb, var(--color-cream) 40%, transparent);
	}

	@container (max-width: 620px) {
		// Seven slivers are unreadable on a phone; drop to four wider frames.
		.strip li:nth-child(n + 5) {
			display: none;
		}
	}
</style>
