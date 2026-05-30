<script lang="ts">
	import type { Cta, HeroImage } from '$lib/content/types';
	import Button from '$lib/components/ui/Button.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	type Props = {
		eyebrow?: string;
		title: string;
		body: string;
		ctas?: Cta[];
		image?: HeroImage;
	};

	let { eyebrow, title, body, ctas = [], image }: Props = $props();
</script>

<Section class="hero-section" animate={false}>
	<div class:image-hero={image} class="hero">
		<div class="hero-copy">
			{#if eyebrow}
				<Tag label={eyebrow} />
			{/if}
			<h1>{title}</h1>
			<p>{body}</p>
			{#if ctas.length}
				<div class="ctas">
					{#each ctas as cta}
						<Button href={cta.href} variant={cta.variant}>{cta.label}</Button>
					{/each}
				</div>
			{/if}
		</div>
		{#if image}
			<div class="hero-image">
				<ImageFrame src={image.src} alt={image.alt} loading={image.loading ?? 'lazy'} />
			</div>
		{/if}
	</div>
</Section>

<style lang="scss">
	.hero {
		display: grid;
		gap: 1rem;
		max-width: 820px;
		padding-top: clamp(0.4rem, 1.6vw, 1rem);
	}

	.hero-copy {
		display: grid;
		gap: 1rem;
	}

	.hero-copy p {
		max-width: 660px;
		font-size: clamp(1.03rem, 1.35vw, 1.16rem);
		line-height: 1.65;
		color: var(--color-subtle);
	}

	.image-hero {
		grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
		align-items: center;
		gap: clamp(1.5rem, 5vw, 4rem);
		max-width: none;
	}

	.hero-image {
		justify-self: center;
		width: min(280px, 100%);
	}

	.hero-image :global(.image-frame) {
		width: 100%;
		aspect-ratio: 4 / 5;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 0.35rem;
	}

	@media (max-width: 740px) {
		.image-hero {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.hero-image {
			order: -1;
			justify-self: center;
			width: min(200px, 56vw);
		}

		.hero-image :global(.image-frame) {
			aspect-ratio: 1 / 1;
		}
	}

	@media (max-width: 640px) {
		.hero,
		.hero-copy {
			justify-items: center;
		}

		.hero-copy p {
			margin-inline: auto;
		}

		.ctas {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.ctas {
			width: 100%;
			justify-content: center;
		}

		.ctas :global(.button) {
			flex: 0 0 auto;
		}
	}
</style>
