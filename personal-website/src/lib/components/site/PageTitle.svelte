<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	type Props = {
		eyebrow?: string;
		title: string;
		body?: string;
		helper?: string;
	};

	let { eyebrow, title, body, helper }: Props = $props();
</script>

<Section animate={false} class="page-title">
	<div class="hero-row">
		<div class="title-block">
			{#if eyebrow}
				<Tag label={eyebrow} />
			{/if}
			<h1>{title}</h1>
			{#if body}
				<p class="subtitle">{body}</p>
			{/if}
		</div>
		{#if helper}
			<p class="helper">{helper}</p>
		{/if}
	</div>
</Section>

<style lang="scss">
	:global(.section.page-title) {
		padding-top: clamp(2rem, 4.5vw, 3rem);
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
	}

	.hero-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		gap: 1.25rem;
	}

	.title-block {
		display: grid;
		gap: 0.85rem;
		max-width: 640px;
		min-width: 0;
	}

	.title-block h1 {
		font-size: clamp(2.4rem, 5vw, 3.4rem);
		font-family: var(--font-display);
		font-optical-sizing: auto;
		font-variation-settings: 'SOFT' 50;
		font-weight: 500;
		letter-spacing: -0.025em;
	}

	.subtitle {
		color: var(--color-subtle);
		font-size: clamp(1rem, 1.2vw, 1.08rem);
		line-height: 1.6;
		max-width: 580px;
	}

	.helper {
		justify-self: end;
		margin: 0;
		padding-top: 0.4rem;
		font-size: 0.72rem;
		font-weight: 400;
		letter-spacing: 0.02em;
		color: var(--color-subtle);
		opacity: 0.65;
		text-align: right;
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.hero-row {
			grid-template-columns: 1fr;
			justify-items: center;
		}

		.title-block {
			justify-items: center;
			text-align: center;
		}

		.subtitle {
			margin-inline: auto;
		}

		.helper {
			justify-self: center;
			text-align: center;
			padding-top: 0;
		}
	}
</style>
