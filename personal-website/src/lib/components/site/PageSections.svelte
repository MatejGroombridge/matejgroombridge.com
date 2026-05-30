<script lang="ts">
	import type { PageSection } from '$lib/content/types';
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Section from '$lib/components/ui/Section.svelte';

	type Props = {
		sections: readonly PageSection[];
	};

	let { sections }: Props = $props();
</script>

{#each sections as section}
	<Section id={section.id} tone={section.tone}>
		<BlockHead title={section.eyebrow ?? section.title} />
		<div class="section-grid">
			<div class="copy">
				{#if section.eyebrow}
					<h2 class="section-title">{section.title}</h2>
				{/if}
				{#each section.body as paragraph}
					<p>{paragraph}</p>
				{/each}
				{#if section.cta}
					<Button href={section.cta.href} variant={section.cta.variant}>{section.cta.label}</Button>
				{/if}
			</div>
			{#if section.cards?.length}
				<div class="cards">
					{#each section.cards as card}
						<Card href={card.href}>
							{#if card.image}
								<img src={card.image} alt="" loading="lazy" />
							{/if}
							{#if card.meta}
								<p class="meta">{card.meta}</p>
							{/if}
							<h3>{card.title}</h3>
							<p>{card.body}</p>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</Section>
{/each}

<style lang="scss">
	.section-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(1.75rem, 4.5vw, 3.75rem);
		align-items: start;
	}

	.copy {
		display: grid;
		gap: 0.85rem;
		max-width: 640px;
	}

	.section-title {
		font-size: clamp(1.4rem, 2.2vw, 1.85rem);
		margin: 0;
	}

	.copy :global(p) {
		color: var(--color-subtle);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.875rem;
	}

	.cards :global(.card) {
		display: grid;
		gap: 0.7rem;
	}

	img {
		width: 100%;
		aspect-ratio: 16 / 10;
		border-radius: var(--radius-md);
		object-fit: cover;
	}

	.meta {
		color: var(--color-green);
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin: 0;
	}

	@media (max-width: 820px) {
		.section-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.copy {
			justify-items: center;
			margin-inline: auto;
		}
	}

	@media (max-width: 520px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
