<script>
	// data provided by +page.ts
	let { data } = $props();

	/** @param {Element} e */
	function actionWhenInViewport(e) {
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

	const articles = $derived(data.articles ?? []);
</script>

<svelte:head>
	<title>Writing</title>
	<meta
		name="description"
		content="Articles on tech, lifestyle, productivity and success. Written by Matej Groombridge."
	/>
</svelte:head>

<section>
	<div class="wrapper shown">
		<div class="content">
			<h1>My Writing</h1>
		</div>
	</div>
	<div class="two-margin"></div>
	<div class="wrapper shown" use:actionWhenInViewport>
		<div class="article-list writing-page">
			<div class="article-column-wrapper">
				<div class="article-ids-column">
					{#each articles as article, i}
						<a href={`/writing/${article.slug}`} class="article-id-item" use:actionWhenInViewport>
							#{articles.length - i}
						</a>
					{/each}
				</div>
				<div class="article-divider"></div>
				<div class="article-titles-column">
					{#each articles as article}
						<a
							href={`/writing/${article.slug}`}
							class="article-title-item"
							use:actionWhenInViewport
						>
							{article.title}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
