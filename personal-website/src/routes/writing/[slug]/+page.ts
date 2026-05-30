import { error } from '@sveltejs/kit';
import { articles, getArticle, getArticleNumber } from '$lib/content/writing';

export const entries = () => articles.map((article) => ({ slug: article.slug }));

export const load = async ({ fetch, params }) => {
	const article = getArticle(params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	let markdown = '';
	if (article.bodyPath) {
		const response = await fetch(article.bodyPath);
		if (response.ok) {
			markdown = await response.text();
		}
	}

	return {
		article,
		markdown,
		number: getArticleNumber(article.slug)
	};
};
