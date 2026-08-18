<script lang="ts">
	import { onMount } from 'svelte';
	import { photoTrips } from '$lib/content';

	const steps = [
		{
			title: 'Walk',
			body: 'Most of a trip is walking. The camera stays off until something is actually worth stopping for.',
			icon: 'directions_walk'
		},
		{
			title: 'Shoot',
			body: 'One body, one lens. Constraints do more for a set of photographs than any amount of gear.',
			icon: 'photo_camera'
		},
		{
			title: 'Cull',
			body: 'A few hundred frames become twenty. The hardest edit is the one that removes a photo you like.',
			icon: 'filter_alt'
		},
		{
			title: 'Develop',
			body: 'Warm shadows, restrained contrast, colour left roughly where the day put it.',
			icon: 'tune'
		},
		{
			title: 'Publish',
			body: 'Written up as a trip, dated, and put somewhere I can find it again in ten years.',
			icon: 'ios_share'
		}
	].map((step, i) => ({ ...step, image: photoTrips[i]?.coverImage ?? photoTrips[0].coverImage }));

	let outer = $state<HTMLDivElement>();
	let sticky = $state<HTMLDivElement>();
	let track = $state<HTMLDivElement>();
	let progress = $state(0);

	onMount(() => {
		if (!outer || !track) return;

		let raf = 0;
		let distance = 0;

		function measure() {
			// How far the track has to travel for its right edge to reach the right
			// edge of the pinned viewport. Measured against the sticky container
			// rather than the window, so the section stays inside the page column.
			distance = Math.max(0, (track?.scrollWidth ?? 0) - (sticky?.clientWidth ?? 0));
		}

		function update() {
			raf = 0;
			const rect = outer!.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			if (total <= 0) {
				progress = 0;
				return;
			}
			const p = Math.min(1, Math.max(0, -rect.top / total));
			progress = p;
			if (track) track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
		}

		function onScroll() {
			if (!raf) raf = requestAnimationFrame(update);
		}

		measure();
		update();

		window.addEventListener('scroll', onScroll, { passive: true });
		const ro = new ResizeObserver(() => {
			measure();
			update();
		});
		ro.observe(track);

		return () => {
			window.removeEventListener('scroll', onScroll);
			ro.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="outer" bind:this={outer}>
	<div class="sticky" bind:this={sticky}>
		<div class="head">
			<span class="lab-mono label">how a photograph gets here</span>
			<div class="progress" aria-hidden="true">
				<span class="progress-fill" style={`transform:scaleX(${progress})`}></span>
			</div>
			<span class="lab-mono count">
				{String(Math.min(steps.length, Math.floor(progress * steps.length) + 1)).padStart(2, '0')}
				/ {String(steps.length).padStart(2, '0')}
			</span>
		</div>

		<div class="track" bind:this={track}>
			{#each steps as step, i (step.title)}
				<article class="panel">
					<div class="panel-media">
						<img src={step.image} alt="" loading="lazy" />
						<span class="panel-index lab-mono">{String(i + 1).padStart(2, '0')}</span>
					</div>
					<div class="panel-copy">
						<span class="material-symbols-rounded" aria-hidden="true">{step.icon}</span>
						<h4 data-preserve-case>{step.title}</h4>
						<p>{step.body}</p>
					</div>
				</article>
			{/each}
			<article class="panel end">
				<div class="panel-copy">
					<h4 data-preserve-case>That&rsquo;s the whole process.</h4>
					<p>No presets for sale, no newsletter, no course.</p>
					<a class="end-link" href="/photography">
						Go to the galleries
						<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
					</a>
				</div>
			</article>
		</div>
	</div>
</div>

<style lang="scss">
	// The outer block's height is what the horizontal travel is spent against;
	// 300vh gives roughly one screen of scroll per two panels.
	.outer {
		height: 320vh;
	}

	.sticky {
		position: sticky;
		top: 0;
		display: grid;
		grid-template-rows: auto 1fr;
		align-content: center;
		gap: 1.25rem;
		height: 100vh;
		padding-block: clamp(1.5rem, 5vh, 3rem);
		overflow: hidden;
	}

	.head {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		width: 100%;
	}

	.label,
	.count {
		flex: 0 0 auto;
		font-size: 0.56rem;
		color: var(--color-subtle);
	}

	.progress {
		flex: 1;
		height: 2px;
		border-radius: 999px;
		background: var(--lab-hairline);
		overflow: hidden;
	}

	.progress-fill {
		display: block;
		height: 100%;
		background: var(--lab-accent);
		transform-origin: left center;
		transform: scaleX(0);
	}

	.track {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 3vw, 2.5rem);
		width: max-content;
		padding-right: clamp(1rem, 4vw, 3rem);
		will-change: transform;
	}

	.panel {
		display: grid;
		grid-template-columns: minmax(0, 260px) minmax(0, 300px);
		gap: 1.5rem;
		align-items: center;
		width: clamp(290px, 52vw, 580px);
	}

	.panel-media {
		position: relative;
		aspect-ratio: 3 / 4;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-muted);
		box-shadow: 0 20px 50px -28px rgb(0 0 0 / 0.6);
	}

	.panel-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.panel-index {
		position: absolute;
		left: 0.7rem;
		top: 0.6rem;
		padding: 0.15rem 0.45rem;
		border-radius: var(--radius-sm);
		background: rgb(0 0 0 / 0.5);
		font-size: 0.55rem;
		color: #fff;
	}

	.panel-copy {
		display: grid;
		gap: 0.5rem;
		align-content: center;
	}

	.panel-copy .material-symbols-rounded {
		font-size: 1.4rem;
		color: var(--lab-accent);
	}

	.panel-copy h4 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 3.4vw, 2.4rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.05;
		font-variation-settings: 'SOFT' 40;
	}

	.panel-copy p {
		margin: 0;
		max-width: 34ch;
		color: var(--color-subtle);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.end {
		grid-template-columns: minmax(0, 1fr);
		width: clamp(260px, 34vw, 420px);
	}

	.end-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.4rem;
		font-family: var(--font-ui);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--lab-accent);
		text-decoration: none;
	}

	.end-link:hover .material-symbols-rounded {
		transform: translateX(4px);
	}

	.end-link .material-symbols-rounded {
		font-size: 1.05rem;
		transition: transform var(--duration-fast) ease;
	}

	@media (max-width: 720px) {
		.panel {
			grid-template-columns: minmax(0, 1fr);
			width: clamp(240px, 68vw, 340px);
			gap: 1rem;
		}

		.panel-media {
			aspect-ratio: 16 / 10;
		}
	}
</style>
