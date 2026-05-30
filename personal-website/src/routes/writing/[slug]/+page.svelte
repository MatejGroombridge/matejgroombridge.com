<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
	import Section from '$lib/components/ui/Section.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Seo {...data.article.seo} canonical={`/writing/${data.article.slug}`} />
<PageHero
	eyebrow={`Writing · #${data.number}`}
	title={data.article.title}
	body={data.article.description}
/>

<Section tone="muted">
	<dl class="article-meta">
		<div>
			<dt>Published</dt>
			<dd>{data.article.published}</dd>
		</div>
		{#if data.article.readingTime}
			<div>
				<dt>Reading time</dt>
				<dd>{data.article.readingTime}</dd>
			</div>
		{/if}
	</dl>
</Section>

<Section>
	<Prose dropCap>
		{#if data.markdown}
			<SvelteMarkdown source={data.markdown} />
		{:else}
			<p>{data.article.description}</p>
		{/if}
	</Prose>
</Section>

<Section tone="muted">
	<p class="back">
		<a href="/writing">← All writing</a>
	</p>
</Section>

<style lang="scss">
	.article-meta {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 0.875rem;
		margin: 0;
	}

	.article-meta div {
		display: grid;
		gap: 0.15rem;
	}

	.article-meta dt {
		font-weight: 600;
		color: var(--color-heading);
		font-size: 0.95rem;
	}

	.article-meta dd {
		margin: 0;
		color: var(--color-subtle);
	}

	.back {
		margin: 0;
	}

	.back a {
		color: var(--color-ink);
		text-decoration: none;
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 0.1rem;
	}

	.back a:hover {
		border-bottom-color: var(--color-green);
	}
</style>
