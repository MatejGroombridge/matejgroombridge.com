import type { Article } from './types';

/**
 * Articles are listed newest first. The oldest article is "#1"; numbering grows with each new
 * post, so the most recent entry takes the highest number.
 *
 * To add an article:
 *   1. Drop a markdown file in `src/lib/content/writing/<slug>.md`.
 *   2. Add an entry below with `body: '<slug>'`.
 *
 * Bodies are compiled by mdsvex, so a markdown file can use GFM footnotes and
 * raw HTML directly:
 *
 *   a claim worth sourcing.[^1]
 *
 *   <img src="/writing/media/chart.png" alt="Time horizon by model" />
 *
 *   [^1]: the supporting note, written at the bottom of the same file.
 *
 * The reader toolbar builds itself from the optional fields, so an article only
 * gets the controls it can actually use:
 *   - `abridged`  → Full / Abridged switch. Keep the abridged file's headings
 *                   identical to the full body so the contents list resolves
 *                   in both modes.
 *   - `contents`  → Contents toggle. Each `id` is the heading's anchor,
 *                   slugged from the heading text (`## I` → `'i'`).
 *   - `versions`  → Version menu, listing superseded copies newest first.
 *
 * Template:
 *   {
 *     slug: 'on-something',
 *     title: 'On Something',
 *     subtitle: 'Optional standfirst shown under the title.',
 *     icon: 'all_inclusive',
 *     published: 'May 2026',
 *     readingTime: '6 min read',
 *     description: 'One-line summary used for previews and SEO fallbacks.',
 *     body: 'on-something',
 *     abridged: 'on-something-abridged',
 *     abridgedReadingTime: '2 min read',
 *     contents: [{ id: 'i', marker: 'I', label: 'why I am writing this' }],
 *     versions: [
 *       {
 *         id: 'v1',
 *         modified: 'May 1, 2026',
 *         body: 'on-something-v1',
 *         note: 'Shown in the banner while this version is open.'
 *       }
 *     ],
 *     seo: {
 *       title: 'On Something',
 *       description: 'One-line summary used for previews and SEO fallbacks.'
 *     }
 *   }
 */
export const articles: Article[] = [
	{
		slug: 'singularity',
		title: 'on the singularity',
		subtitle: 'everything you need to know about the state of AI',
		icon: 'all_inclusive',
		published: 'Sep 2, 2026',
		readingTime: '39 min read',
		description: 'everything you need to know about the state of AI.',
		body: 'singularity',
		abridged: 'singularity-abridged',
		abridgedReadingTime: '5 min read',
		contents: [
			{ id: 'i', marker: 'I', label: "why I'm writing this" },
			{ id: 'ii', marker: 'II', label: 'the race to automate software' },
			{ id: 'iii', marker: 'III', label: "what's driving the gains" },
			{ id: 'iv', marker: 'IV', label: 'the first signs of genuine novelty' },
			{ id: 'v', marker: 'V', label: 'beyond the event horizon' },
			{ id: 'vi', marker: 'VI', label: 'the arms race and its regulation' },
			{ id: 'vii', marker: 'VII', label: 'the alignment problem' },
			{ id: 'viii', marker: 'VIII', label: 'what could actually slow it down' },
			{ id: 'ix', marker: 'IX', label: 'how to hold all of this' }
		],
		versions: [
			{
				id: 'v1',
				modified: 'Aug 18, 2026',
				body: 'singularity-v1',
				note: 'Published before the METR time-horizon figures were updated.'
			}
		],
		seo: {
			title: 'On the Singularity',
			description:
				'Where AI development actually stands in 2026, the trends that will define the coming decade, and what recursive self-improvement means for human civilisation.'
		}
	},
	{
		slug: 'my-minimal-writing-stack',
		title: 'My Minimal Writing Stack',
		icon: 'layers',
		published: 'May 2026',
		readingTime: '3 min read',
		description:
			'The tools I use to publish writing on this site, and the ones I deliberately do not.',
		body: 'my-minimal-writing-stack',
		seo: {
			title: 'My Minimal Writing Stack',
			description:
				'The tools I use to publish writing on this site, and the ones I deliberately do not.'
		}
	},
	{
		slug: 'a-writing-ethos-i-can-stick-to',
		title: 'A Writing Ethos I Can Stick To',
		icon: 'rule',
		published: 'May 2026',
		readingTime: '4 min read',
		description:
			'A small set of rules about why and how I write here, light enough to actually follow.',
		body: 'a-writing-ethos-i-can-stick-to',
		seo: {
			title: 'A Writing Ethos I Can Stick To',
			description:
				'A small set of rules about why and how I write here, light enough to actually follow.'
		}
	},
	{
		slug: 'why-im-writing-all-of-a-sudden',
		title: "Why I'm Writing All of a Sudden",
		icon: 'bolt',
		published: 'May 2026',
		readingTime: '3 min read',
		description:
			'After years of telling myself I would start writing "soon," a short note on why I finally have.',
		body: 'why-im-writing-all-of-a-sudden',
		seo: {
			title: "Why I'm Writing All of a Sudden",
			description:
				'After years of telling myself I would start writing "soon," a short note on why I finally have.'
		}
	}
];

export function getArticle(slug: string): Article | undefined {
	return articles.find((article) => article.slug === slug);
}

/** Other articles, starting from the one after `slug` and wrapping around. */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
	const currentIndex = articles.findIndex((article) => article.slug === slug);
	const ordered =
		currentIndex === -1
			? articles
			: [...articles.slice(currentIndex + 1), ...articles.slice(0, currentIndex)];
	return ordered.filter((article) => article.slug !== slug).slice(0, limit);
}

export function getArticleNumber(slug: string): number {
	const index = articles.findIndex((article) => article.slug === slug);
	if (index === -1) return 0;
	return articles.length - index;
}
