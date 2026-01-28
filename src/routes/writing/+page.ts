export const load = async () => {
	// Import all markdown files with their metadata
	const allArticles = import.meta.glob('/src/lib/writing/*.md');

	const articles = await Promise.all(
		Object.entries(allArticles).map(async ([path, resolver]) => {
			const article = (await resolver()) as any;
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';

			return {
				slug,
				title: article.metadata?.title || slug,
				subtitle: article.metadata?.subtitle || '',
				date: article.metadata?.date || ''
			};
		})
	);

	// Sort articles by date (newest first)
	articles.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return { articles };
};
