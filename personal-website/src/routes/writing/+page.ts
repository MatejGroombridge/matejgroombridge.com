import { articles } from '$lib/content/writing';

export const load = () => ({
	articles: articles.map((article, index) => ({
		slug: article.slug,
		title: article.title,
		number: articles.length - index
	}))
});
