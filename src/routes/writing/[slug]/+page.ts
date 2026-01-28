import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.slug;
	
	try {
		// Dynamically import the markdown file
		const article = await import(`../../../lib/writing/${slug}.md`);
		
		// Get all articles for related articles section
		const allArticles = import.meta.glob('/src/lib/writing/*.md');
		
		const relatedArticles = await Promise.all(
			Object.entries(allArticles)
				.filter(([path]) => !path.includes(`/${slug}.md`))
				.slice(0, 5)
				.map(async ([path, resolver]) => {
					const related = await resolver() as any;
					const relatedSlug = path.split('/').pop()?.replace('.md', '') ?? '';
					
					return {
						slug: relatedSlug,
						title: related.metadata?.title || relatedSlug
					};
				})
		);
		
		return {
			article: {
				title: article.metadata?.title || slug,
				subtitle: article.metadata?.subtitle || '',
				date: article.metadata?.date || ''
			},
			Component: article.default,
			relatedArticles
		};
	} catch (e) {
		throw error(404, `Article "${slug}" not found`);
	}
};
