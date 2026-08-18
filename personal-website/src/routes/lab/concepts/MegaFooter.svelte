<script lang="ts">
	import { onMount } from 'svelte';
	import { photoTrips, siteSettings } from '$lib/content';

	const fill = photoTrips[0]?.coverImage ?? '';
	const socials = siteSettings.socials.filter((social) => social.href.startsWith('http'));

	let host = $state<HTMLDivElement>();
	let mark = $state<HTMLDivElement>();
	let copied = $state(false);

	onMount(() => {
		if (!host || !mark) return;
		let raf = 0;

		function update() {
			raf = 0;
			const rect = host!.getBoundingClientRect();
			// 0 as the block enters the viewport, 1 once its top reaches the top.
			const p = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
			// The wordmark rises out of the clip as the footer is scrolled into view.
			mark!.style.setProperty('--rise', p.toFixed(3));
		}

		function onScroll() {
			if (!raf) raf = requestAnimationFrame(update);
		}

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	});

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(siteSettings.email);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			copied = false;
		}
	}
</script>

<div class="mega lab-grain" bind:this={host}>
	<div class="top">
		<div class="say">
			<span class="lab-mono eyebrow">still reading?</span>
			<h4>Say hello.</h4>
			<p>I answer everything that is not a recruiter template.</p>
		</div>

		<div class="actions">
			<button class="mail" class:copied type="button" onclick={copyEmail}>
				<span class="mail-text" data-preserve-case>{siteSettings.email}</span>
				<span class="mail-icon material-symbols-rounded" aria-hidden="true">
					{copied ? 'check' : 'content_copy'}
				</span>
			</button>

			<ul class="socials">
				{#each socials as social (social.href)}
					<li>
						<a href={social.href} rel="me noreferrer" target="_blank">
							<span class="social-label" data-preserve-case>{social.label}</span>
							<span class="material-symbols-rounded" aria-hidden="true">north_east</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="wordmark" bind:this={mark} aria-hidden="true">
		<span class="fill" style={`background-image:url(${fill})`}>MATEJ</span>
		<span class="outline">MATEJ</span>
	</div>

	<div class="baseline lab-mono">
		<span>© {new Date().getFullYear()}</span>
		<span>built in melbourne</span>
		<span>sveltekit · no trackers worth mentioning</span>
	</div>
</div>

<style lang="scss">
	.mega {
		position: relative;
		// The wordmark is sized in `cqw`, so the footer itself is the container it
		// measures against — sizing off `vw` overflowed whenever the page column
		// was narrower than the viewport.
		container-type: inline-size;
		display: grid;
		gap: clamp(1.5rem, 4vw, 2.5rem);
		padding: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem) 0;
		border-radius: var(--radius-lg);
		background: var(--color-ink);
		color: var(--color-cream);
		overflow: hidden;
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.eyebrow {
		font-size: 0.55rem;
		color: color-mix(in srgb, var(--color-cream) 55%, transparent);
	}

	.say h4 {
		margin: 0.35rem 0 0.3rem;
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 4vw, 2.6rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-cream);
		font-variation-settings: 'SOFT' 50;
	}

	.say p {
		margin: 0;
		font-size: 0.95rem;
		color: color-mix(in srgb, var(--color-cream) 65%, transparent);
	}

	.actions {
		display: grid;
		gap: 0.85rem;
		justify-items: start;
	}

	.mail {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.9rem;
		border: 1px solid color-mix(in srgb, var(--color-cream) 22%, transparent);
		border-radius: 999px;
		background: transparent;
		color: var(--color-cream);
		font-family: var(--lab-mono);
		font-size: 0.78rem;
		transition:
			border-color 220ms ease,
			background 220ms ease;
	}

	.mail:hover {
		border-color: var(--color-green);
		background: color-mix(in srgb, var(--color-green) 16%, transparent);
	}

	.mail.copied {
		border-color: var(--color-green);
		color: var(--color-green);
	}

	.mail-icon {
		font-size: 1rem;
		transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1.5);
	}

	.mail.copied .mail-icon {
		transform: scale(1.25);
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.socials a {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-family: var(--font-ui);
		font-size: 0.82rem;
		font-weight: 500;
		color: color-mix(in srgb, var(--color-cream) 72%, transparent);
		text-decoration: none;
	}

	.socials a:hover {
		color: var(--color-cream);
	}

	.socials .material-symbols-rounded {
		font-size: 0.85rem;
		transition: transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1.5);
	}

	.socials a:hover .material-symbols-rounded {
		transform: translate(2px, -2px);
	}

	// The wordmark is clipped by the footer's bottom edge and slides up into
	// view as the block is scrolled — the name arrives, it does not just sit there.
	.wordmark {
		--rise: 0;
		position: relative;
		margin: 0 -0.04em;
		line-height: 0.76;
		overflow: hidden;
		height: 0.62em;
		font-family: var(--font-ui);
		font-size: clamp(3rem, 25cqw, 15rem);
		font-weight: 900;
		letter-spacing: -0.045em;
		text-align: center;
	}

	.wordmark span {
		display: block;
		transform: translateY(calc((1 - var(--rise)) * 0.35em));
	}

	.fill {
		background-size: cover;
		background-position: center 40%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	// A faint outline sits behind the photo fill so the letterforms survive
	// against dark parts of the image.
	.outline {
		position: absolute;
		inset: 0;
		z-index: -1;
		color: transparent;
		-webkit-text-stroke: 1px color-mix(in srgb, var(--color-cream) 18%, transparent);
	}

	.baseline {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		padding: 0 0 1rem;
		font-size: 0.55rem;
		color: color-mix(in srgb, var(--color-cream) 45%, transparent);
	}

	@media (max-width: 640px) {
		.baseline {
			justify-content: flex-start;
		}
	}
</style>
