<script lang="ts">
	import { siteSettings } from '$lib/content/site';
	import Container from '$lib/components/ui/Container.svelte';
	import Garden from './Garden.svelte';
	import Icon from './Icon.svelte';
	import LocalTime from './LocalTime.svelte';
</script>

<footer class="footer">
	<Garden />
	<Container>
		<div class="inner">
			<div class="about">
				<p class="title">{siteSettings.name}</p>
				<p class="tagline">{siteSettings.tagline}</p>
				<LocalTime />
			</div>

			<div class="socials" aria-label="Social links">
				{#each siteSettings.socials as social}
					<a
						href={social.href}
						aria-label={social.label}
						target={social.href.startsWith('http') ? '_blank' : undefined}
						rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
					>
						<Icon name={social.icon} />
					</a>
				{/each}
			</div>
		</div>
	</Container>
</footer>

<style lang="scss">
	.footer {
		position: relative;
		padding: clamp(2rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2rem);
		background: color-mix(in srgb, var(--color-green) 2.5%, var(--color-cream));
		border-top: 1px solid var(--color-border);
		color: var(--color-subtle);
	}

	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas: 'about socials';
		row-gap: clamp(1.25rem, 2.5vw, 1.75rem);
		column-gap: 1.5rem;
		align-items: start;
	}

	.about {
		grid-area: about;
		display: grid;
		gap: 0.5rem;
		max-width: 30rem;
	}

	.title {
		color: var(--color-heading);
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1rem;
		letter-spacing: 0.02em;
	}

	.tagline {
		color: var(--color-subtle);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.socials {
		grid-area: socials;
		display: flex;
		gap: 0.65rem;
		justify-self: end;
		align-self: start;
	}

	.socials a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		color: var(--color-ink);
		text-decoration: none;
		transition:
			color var(--duration-fast) ease,
			border-color var(--duration-fast) ease,
			background var(--duration-fast) ease;
	}

	.socials a:hover,
	.socials a:focus-visible {
		color: var(--color-green);
		border-color: var(--color-green);
		background: var(--color-muted);
	}

	@media (max-width: 600px) {
		.inner {
			grid-template-columns: 1fr;
			grid-template-areas:
				'about'
				'socials';
			justify-items: center;
		}

		.about {
			margin-inline: auto;
			justify-items: center;
		}

		.socials {
			justify-self: center;
		}
	}
</style>
