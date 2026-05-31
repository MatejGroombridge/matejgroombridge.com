import { error } from '@sveltejs/kit';
import { getBookNote, getRelatedBookNotes, bookNotes } from '$lib/content/booknotes';

export const entries = () => bookNotes.map((book) => ({ slug: book.slug }));

export const load = async ({ fetch, params }) => {
	const book = getBookNote(params.slug);

	if (!book) {
		error(404, 'Book note not found');
	}

	let markdown = '';
	if (book.bodyPath) {
		const response = await fetch(book.bodyPath);
		if (response.ok) {
			markdown = await response.text();
		}
	}

	return {
		book,
		markdown,
		related: getRelatedBookNotes(book.slug)
	};
};
