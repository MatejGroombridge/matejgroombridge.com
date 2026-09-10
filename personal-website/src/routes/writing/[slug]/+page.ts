import { error } from '@sveltejs/kit';
import { loadArticleBody } from '$lib/content/articleBodies';
import { articles, getArticle, getRelatedArticles } from '$lib/content/writing';

export const entries = () => articles.map((article) => ({ slug: article.slug }));

export const load = async ({ params }) => {
	const article = getArticle(params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	// The current version renders server-side so the article is in the HTML for
	// crawlers and for readers who never touch the toolbar. The abridged copy
	// rides along because the switch should feel instant. Older versions are
	// fetched on demand — they are archival, and rarely opened.
	const [full, abridged] = await Promise.all([
		article.body ? loadArticleBody(article.body) : null,
		article.abridged ? loadArticleBody(article.abridged) : null
	]);

	return {
		article,
		full,
		abridged,
		related: getRelatedArticles(article.slug)
	};
};
