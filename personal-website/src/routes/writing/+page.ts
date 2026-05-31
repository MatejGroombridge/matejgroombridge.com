import { error } from '@sveltejs/kit';
import { articles } from '$lib/content/writing';

export const load = () => {
	error(404, 'Not found');
	return {
		articles: articles.map((article, index) => ({
			slug: article.slug,
			title: article.title,
			number: articles.length - index
		}))
	};
};
