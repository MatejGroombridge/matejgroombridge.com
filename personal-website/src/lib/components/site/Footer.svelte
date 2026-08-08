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
		gap: 0.15rem;
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

	.about :global(.local) {
		margin-top: 0.85rem;
	}

	.socials {
		grid-area: socials;
		display: flex;
		gap: 1.1rem;
		justify-self: end;
		align-self: start;
	}

	.socials a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--color-ink);
		text-decoration: none;
		transition:
			color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.socials a:hover,
	.socials a:focus-visible {
		color: var(--color-green);
		transform: translateY(-1px);
		outline: none;
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
