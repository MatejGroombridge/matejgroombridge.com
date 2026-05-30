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
	<div class="title-block">
		{#if eyebrow}
			<Tag label={eyebrow} />
		{/if}
		<h1>{title}</h1>
		{#if body}
			<p class="subtitle">{body}</p>
		{/if}
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

	.title-block {
		display: grid;
		gap: 0.85rem;
		max-width: 640px;
	}

	.title-block h1 {
		font-size: clamp(2.4rem, 5vw, 3.4rem);
	}

	.subtitle {
		color: var(--color-subtle);
		font-size: clamp(1rem, 1.2vw, 1.08rem);
		line-height: 1.6;
		max-width: 580px;
	}

	.helper {
		font-size: 0.82rem;
		color: var(--color-subtle);
		margin-top: 0.25rem;
	}

	@media (max-width: 640px) {
		.title-block {
			justify-items: center;
			text-align: center;
		}

		.subtitle,
		.helper {
			margin-inline: auto;
		}
	}
</style>
