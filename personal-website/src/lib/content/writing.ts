import type { Article } from './types';

/**
 * Articles are listed newest first. The oldest article is "#1"; numbering grows with each new
 * post, so the most recent entry takes the highest number.
 *
 * To add an article:
 *   1. Drop a markdown file in `static/writing/<slug>.md`.
 *   2. Add an entry below with `bodyPath: '/writing/<slug>.md'`.
 *
 * Template:
 *   {
 *     slug: 'on-something',
 *     title: 'On Something',
 *     published: 'May 2026',
 *     readingTime: '6 min read',
 *     description: 'One-line summary used for previews and SEO fallbacks.',
 *     bodyPath: '/writing/on-something.md',
 *     seo: {
 *       title: 'On Something',
 *       description: 'One-line summary used for previews and SEO fallbacks.'
 *     }
 *   }
 */
export const articles: Article[] = [
	{
		slug: 'my-minimal-writing-stack',
		title: 'My Minimal Writing Stack',
		published: 'May 2026',
		readingTime: '3 min read',
		description:
			'The tools I use to publish writing on this site, and the ones I deliberately do not.',
		bodyPath: '/writing/my-minimal-writing-stack.md',
		seo: {
			title: 'My Minimal Writing Stack',
			description:
				'The tools I use to publish writing on this site, and the ones I deliberately do not.'
		}
	},
	{
		slug: 'a-writing-ethos-i-can-stick-to',
		title: 'A Writing Ethos I Can Stick To',
		published: 'May 2026',
		readingTime: '4 min read',
		description:
			'A small set of rules about why and how I write here, light enough to actually follow.',
		bodyPath: '/writing/a-writing-ethos-i-can-stick-to.md',
		seo: {
			title: 'A Writing Ethos I Can Stick To',
			description:
				'A small set of rules about why and how I write here, light enough to actually follow.'
		}
	},
	{
		slug: 'why-im-writing-all-of-a-sudden',
		title: 'Why I\'m Writing All of a Sudden',
		published: 'May 2026',
		readingTime: '3 min read',
		description:
			'After years of telling myself I would start writing "soon," a short note on why I finally have.',
		bodyPath: '/writing/why-im-writing-all-of-a-sudden.md',
		seo: {
			title: 'Why I\'m Writing All of a Sudden',
			description:
				'After years of telling myself I would start writing "soon," a short note on why I finally have.'
		}
	}
];

export function getArticle(slug: string): Article | undefined {
	return articles.find((article) => article.slug === slug);
}

export function getArticleNumber(slug: string): number {
	const index = articles.findIndex((article) => article.slug === slug);
	if (index === -1) return 0;
	return articles.length - index;
}
