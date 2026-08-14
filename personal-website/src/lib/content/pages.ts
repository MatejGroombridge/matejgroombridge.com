import type { FormDefinition, PageContent } from './types';

export const homePage = {
	slug: '/',
	seo: {
		title: 'Matej Groombridge',
		description:
			'Hi, my name is Matej Groombridge. I\'m a second year undergraduate student, UNSW ' +
			'Co-op Scholar and Sydney-based Software Engineer, and ex-Atlassian intern. ' +
			'Thanks for stopping by!'
	},
	hero: {
		title: 'Hi, I\'m\nMatej.',
		// Non-breaking space between 'UNSW' and 'co-op' so the phrase never
		// splits across a line break on narrow screens.
		body: 'sydney-based software engineer — UNSW\u00A0co-op scholar, previously at Atlassian',
		image: {
			src: '/frontpage2.webp',
			alt: 'Matej Groombridge',
			loading: 'eager'
		},
		ctas: [
			{ label: 'Get in touch', href: '/contact' },
			{ label: '2026', href: '/2026', variant: 'ghost' },
			// { label: 'Read my writing', href: '/writing', variant: 'secondary' },
		]
	},
	sections: []
} as const satisfies PageContent;

export type HomeCurrentlyItem = {
	icon: 'work' | 'menu_book' | 'photo_camera' | 'self_improvement' | 'place' | 'school';
	label: string;
	value: string;
};

export const homeCurrently: HomeCurrentlyItem[] = [
	{ icon: 'place', label: 'Based in', value: 'Sydney, Australia' },
	{ icon: 'work', label: 'Interned at', value: 'Atlassian' },
	{ icon: 'school', label: 'Studying', value: 'Software Engineering · UNSW Co-op' },
	// { icon: 'self_improvement', label: 'Focused on', value: 'Build more, scroll less' }
];

// A paragraph is a run of plain text and inline links, so the copy can carry its
// own links without the markup living in the page component.
export type IntroPart = string | { text: string; href: string };

export const homeIntro: { body: IntroPart[][] } = {
	body: [
		['hey 👋 if we haven\'t met, my name is Matej.'],
		[
			'the purpose of this site has changed a bit over the years but in its current form ' +
				'I\'m using it mostly as a place to showcase my creative pursuits.'
		],
		[
			'you can expect to find my photography, notes on books I\'ve read, and soon some of ' +
				'my software development projects and writings as well.'
		],
		[
			'I\'m always keen to connect with people so feel free to ',
			{ text: 'reach out', href: '/contact' },
			'!'
		]
	]
};

type HomeBlockMeta = {
	title: string;
	asideLabel?: string;
	asideHref?: string;
	intro?: string;
};

export const homeSections: {
	currently: { title: string };
	about: HomeBlockMeta;
	writing: HomeBlockMeta;
	photography: HomeBlockMeta;
	booknotes: HomeBlockMeta;
	contact: HomeBlockMeta;
	more: HomeBlockMeta;
} = {
	currently: { title: 'Right now' },
	about: {
		title: 'About',
		asideLabel: 'What I\'m up to in 2026',
		asideHref: '/2026'
	},
	writing: {
		title: 'Writing',
		asideLabel: 'Read all',
		asideHref: '/writing',
		intro: 'I\'m picking up essay writing to refine my thoughts on topics that matter to me.'
	},
	photography: {
		title: 'Photography',
		asideLabel: 'See all',
		asideHref: '/photography',
		intro: 'an archive — cool places I\'ve photographed over the years.'
	},
	booknotes: {
		title: 'Book Notes',
		asideLabel: 'all books',
		asideHref: '/booknotes',
		intro: 'notes, quotes, reviews and key takeaways from books I\'ve read.'
	},
	contact: {
		title: 'Get in touch',
		intro: 'send a message and I\'ll get back to you when I can.'
	},
	more: { title: 'More' }
};

export type HomeMoreCard = {
	title: string;
	meta: string;
	body: string;
	cta: string;
	href: string;
};

export const homeMoreCards: HomeMoreCard[] = [
	{
		title: '2026',
		meta: 'Living page',
		body: 'a running log of what I\'m building, reading, and thinking about this year.',
		cta: 'See what I\'m up to',
		href: '/2026'
	}
];

export const bookNotesPage = {
	slug: 'booknotes',
	seo: {
		title: 'Book Notes',
		description: 'Book summaries, notes, and quotes by Matej Groombridge.'
	},
	hero: {
		eyebrow: 'Book Notes',
		title: 'notes, quotes and reviews',
		body: 'key takeaways and more from books I\'ve read.'
	},
	sections: []
} as const satisfies PageContent;

export const photographyPage = {
	slug: 'photography',
	seo: {
		title: 'Photography',
		description: 'Travel and everyday photography by Matej Groombridge.'
	},
	hero: {
		eyebrow: 'Photography',
		title: 'Travel photography',
		body: 'an archive — cool places I\'ve photographed over the years.'
	},
	sections: []
} as const satisfies PageContent;

export const writingPage = {
	slug: 'writing',
	seo: {
		title: 'Writing',
		description:
			'Essays, notes, and short pieces by Matej Groombridge on software, learning, and life.'
	},
	hero: {
		eyebrow: 'Writing',
		title: 'my writing',
		body: 'I\'m picking up essay writing to refine my thoughts on topics that matter to me.'
	},
	sections: []
} as const satisfies PageContent;

export const contactPage = {
	slug: 'contact',
	seo: {
		title: 'Contact',
		description: 'Get in touch with Matej Groombridge about photography, software, or the site.'
	},
	hero: {
		eyebrow: 'Contact',
		title: 'want to get in touch?',
		body: 'send a message and I\'ll get back to you when I can.'
	},
	sections: []
} as const satisfies PageContent;

export const contactForm = {
	name: 'contact',
	subject: 'New website enquiry',
	successMessage: 'thanks for getting in touch. I\'ll get back to you soon',
	fields: [
		{ name: 'name', label: 'Name', type: 'text', required: true },
		{ name: 'email', label: 'Email', type: 'email', required: true },
		{ name: 'subject', label: 'Subject', type: 'text' },
		{ name: 'message', label: 'Message', type: 'textarea', required: true }
	]
} as const satisfies FormDefinition;
