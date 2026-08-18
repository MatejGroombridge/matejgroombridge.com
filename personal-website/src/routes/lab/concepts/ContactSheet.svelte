<script lang="ts">
	import { photoTrips } from '$lib/content';

	const strips = photoTrips.slice(0, 6).map((trip) => ({
		slug: trip.slug,
		title: trip.title,
		subtitle: trip.subtitle,
		year: trip.year,
		images: trip.images.slice(0, 12)
	}));

	// One scrub index per strip, driven by pointer X across the frame.
	let cursor = $state<Record<string, number>>(
		Object.fromEntries(strips.map((strip) => [strip.slug, 0]))
	);
	let active = $state<string | null>(null);

	function scrub(slug: string, count: number, event: PointerEvent) {
		const frame = event.currentTarget as HTMLElement;
		const rect = frame.getBoundingClientRect();
		const ratio = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
		cursor = { ...cursor, [slug]: Math.floor(ratio * count) };
		active = slug;
	}
</script>

<div class="sheet">
	{#each strips as strip (strip.slug)}
		{@const index = cursor[strip.slug] ?? 0}
		{@const shot = strip.images[index] ?? strip.images[0]}
		<a
			class="frame"
			class:active={active === strip.slug}
			href={`/photography/${strip.slug}`}
			onpointermove={(event) => scrub(strip.slug, strip.images.length, event)}
			onpointerleave={() => (active = null)}
			aria-label={`${strip.title}, ${strip.subtitle} — ${strip.images.length} photographs`}
		>
			<span class="sprockets top" aria-hidden="true"></span>

			<span class="window">
				{#each strip.images as image, i (image.src)}
					<img
						src={image.src}
						alt={i === 0 ? image.alt : ''}
						class:showing={i === index}
						loading="lazy"
						decoding="async"
					/>
				{/each}
				<span class="crosshair" aria-hidden="true"></span>
				<span class="edge lab-mono" aria-hidden="true">
					{strip.slug.toUpperCase()} · {String(index + 1).padStart(2, '0')}/{String(
						strip.images.length
					).padStart(2, '0')}
				</span>
			</span>

			<span class="sprockets bottom" aria-hidden="true"></span>

			<span class="caption">
				<span class="where" data-preserve-case>{strip.title}</span>
				<span class="what">{shot?.location ?? strip.subtitle}</span>
				<span class="when lab-mono">{shot?.capturedAtLabel ?? strip.year}</span>
			</span>

			<span class="scrub" aria-hidden="true">
				{#each strip.images as image, i (image.src)}
					<span class="tick" class:on={i <= index}></span>
				{/each}
			</span>
		</a>
	{/each}
</div>

<p class="hint lab-mono">sweep across a frame to scrub the roll</p>

<style lang="scss">
	.sheet {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
		gap: clamp(0.75rem, 2vw, 1.25rem);
	}

	.frame {
		position: relative;
		display: grid;
		gap: 0;
		padding: 0.35rem 0;
		border-radius: 4px;
		background: #16181a;
		text-decoration: none;
		color: #e9e6df;
		overflow: hidden;
		transition:
			transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.1),
			box-shadow 300ms ease;
	}

	.frame.active {
		transform: translateY(-4px) scale(1.012);
		box-shadow: 0 18px 40px -18px rgb(0 0 0 / 0.65);
	}

	// 35mm perforations along the top and bottom of the strip.
	.sprockets {
		height: 12px;
		background-image: radial-gradient(circle at 8px 50%, #0b0c0d 0 3.2px, transparent 3.4px);
		background-size: 20px 12px;
		background-repeat: repeat-x;
		opacity: 0.9;
	}

	.window {
		position: relative;
		aspect-ratio: 3 / 2;
		overflow: hidden;
		background: #0b0c0d;
	}

	.window img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		// No cross-fade: scrubbing should feel like advancing frames, not
		// dissolving between them.
		transition: opacity 60ms linear;
	}

	.window img.showing {
		opacity: 1;
	}

	.crosshair {
		position: absolute;
		inset: 8px;
		border: 1px solid rgb(255 255 255 / 0.16);
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.frame.active .crosshair {
		opacity: 1;
	}

	.edge {
		position: absolute;
		right: 8px;
		bottom: 6px;
		padding: 0.12rem 0.35rem;
		border-radius: 2px;
		background: rgb(0 0 0 / 0.5);
		font-size: 0.52rem;
		letter-spacing: 0.16em;
		color: #ffb347;
	}

	.caption {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		gap: 0.15rem 0.6rem;
		padding: 0.55rem 0.7rem 0.4rem;
	}

	.where {
		grid-column: 1;
		font-family: var(--font-ui);
		font-size: 0.92rem;
		font-weight: 650;
		letter-spacing: -0.01em;
	}

	.what {
		grid-column: 1;
		grid-row: 2;
		font-size: 0.76rem;
		color: rgb(233 230 223 / 0.6);
	}

	.when {
		grid-column: 2;
		grid-row: 1 / span 2;
		font-size: 0.56rem;
		color: rgb(233 230 223 / 0.45);
	}

	.scrub {
		display: flex;
		gap: 2px;
		padding: 0 0.7rem 0.55rem;
	}

	.tick {
		flex: 1;
		height: 2px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.14);
		transition: background 120ms linear;
	}

	.tick.on {
		background: var(--lab-accent);
	}

	.hint {
		margin: 1rem 0 0;
		font-size: 0.58rem;
		color: var(--color-subtle);
		opacity: 0.7;
	}
</style>
