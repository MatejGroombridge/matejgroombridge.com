<script lang="ts">
	import ArticleContents from '$lib/components/site/ArticleContents.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import LongForm from '$lib/components/ui/LongForm.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { mediaPolicyPage } from '$lib/content/pages';
	import Body from '$lib/content/media-policy.md';
</script>

<Seo {...mediaPolicyPage.seo} canonical="/media-policy" />

<PageTitle
	eyebrow={mediaPolicyPage.hero.eyebrow}
	title={mediaPolicyPage.hero.title}
	body={mediaPolicyPage.hero.body}
	helper={`Last updated ${mediaPolicyPage.updated}`}
/>

<!-- Same reading column and type as an essay, minus the article chrome. The
     body is authored with its casing in mind, so it opts out of lowercase mode. -->
<LongForm>
	<Section animate={false} class="policy-body">
		<div class="contents">
			<ArticleContents sections={[...mediaPolicyPage.contents]} />
		</div>
		<article class="body" data-preserve-case>
			<Prose>
				<Body />
			</Prose>
		</article>
	</Section>
</LongForm>

<style lang="scss">
	:global(.section.policy-body) {
		padding-top: clamp(1.5rem, 3vw, 2.25rem);
		padding-bottom: clamp(3.5rem, 7vw, 5.5rem);
	}

	.contents,
	.body {
		max-width: var(--size-prose);
		margin-inline: auto;
	}

	.contents {
		margin-bottom: clamp(2rem, 4vw, 2.75rem);
		padding-top: clamp(1.5rem, 3vw, 2rem);
		border-top: 1px solid var(--color-border);
		text-align: left;
	}
</style>
