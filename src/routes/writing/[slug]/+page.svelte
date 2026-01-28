<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props();

	function actionWhenInViewport(e: Element) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
					}
				},
				{
					threshold: 1
				}
			);
		});

		observer.observe(e);
	}

	// Format date for display
	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}

	const article = data.article;
	const Component = data.Component;
	const relatedArticles = data.relatedArticles;
</script>

<svelte:head>
	<title>{article.title} | Matej Groombridge</title>
	<meta name="description" content={article.subtitle || article.title} />
</svelte:head>

<section>
	<div class="wrapper shown" style="min-height: 25vh;">
		<div class="article">
			<h1 class="no-margin">{article.title}</h1>
			{#if article.subtitle}
				<div class="subtitle">{article.subtitle}</div>
			{/if}
			{#if article.date}
				<p class="small-text">{formatDate(article.date)}</p>
			{/if}
		</div>
	</div>
</section>

<section style="padding-top: 0;">
	<div class="wrapper shown">
		<div class="article">
			<Component />
		</div>
	</div>
	<div class="two-margin"></div>
</section>

<section>
	{#if relatedArticles.length > 0}
		<div class="wrapper shown">
			<div class="article">
				<h2 style="padding: 0;">More Articles</h2>
				<div class="more-articles">
					{#each relatedArticles as related}
						<a href={`/writing/${related.slug}`}>{related.title}</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>
