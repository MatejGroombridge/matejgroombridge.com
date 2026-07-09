import type { FormDefinition, PageContent } from './types';

export const homePage = {
	slug: '/',
	seo: {
		title: 'Matej Groombridge',
		description:
			'Hi, my name is Matej Groombridge. I\'m a second year undergraduate student, UNSW ' +
			'Co-op Scholar and Sydney-based Software Engineer, currently interning at Atlassian. ' +
			'Thanks for stopping by!'
	},
	hero: {
		title: 'Hi, I\'m\nMatej.',
		body:
			'I\'m a second year undergraduate student, UNSW Co-op Scholar and Sydney-based ' +
			'Software Engineer, currently interning at Atlassian.',
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
	{ icon: 'work', label: 'Interning at', value: 'Atlassian' },
	{ icon: 'school', label: 'Studying', value: 'Software Engineering · UNSW Co-op' },
	// { icon: 'self_improvement', label: 'Focused on', value: 'Build more, scroll less' }
];

export const homeIntro = {
	eyebrow: 'About this site',
	title: 'what this actually is',
	body:
		'some software I\'m building, books I\'m reading, photos I\'m taking, and ideas I can\'t ' +
		'stop turning over. no schedule, no algorithm — just the stuff I actually care about.'
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
	more: HomeBlockMeta;
} = {
	currently: { title: 'Right now' },
	about: {
		title: 'About',
		asideLabel: 'See the 2026 page',
		asideHref: '/2026'
	},
	writing: {
		title: 'Writing',
		asideLabel: 'Read all',
		asideHref: '/writing',
		intro: 'Short essays on software, learning, and the things I keep thinking about.'
	},
	photography: {
		title: 'Photography',
		asideLabel: 'See all',
		asideHref: '/photography',
		intro: 'an archive of cool places I\'ve photographed over the years — a few recent favourites below.'
	},
	booknotes: {
		title: 'Book Notes',
		asideLabel: 'Read all',
		asideHref: '/booknotes',
		intro: 'key takeaways etc. from books I\'ve read — lifestyle, philosophy, tech, whatever\'s interesting.'
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
	},
	{
		title: 'Get in touch',
		meta: 'Say hi',
		body: 'got a question, a project, or just want to chat? send me a note.',
		cta: 'Contact me',
		href: '/contact'
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
		body: 'key takeaways etc. from books I\'ve read'
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
		body: 'an archive — cool places I\'ve photographed over the years'
	},
	sections: []
} as const satisfies PageContent;

export const writingPage = {
	slug: 'writing',
	seo: {
		title: 'Writing | Matej Groombridge',
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
		title: 'Contact | Matej Groombridge',
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
	successMessage: 'Thanks for getting in touch. I\'ll reply asap.',
	fields: [
		{ name: 'name', label: 'Name', type: 'text', required: true },
		{ name: 'email', label: 'Email', type: 'email', required: true },
		{ name: 'subject', label: 'Subject', type: 'text' },
		{ name: 'message', label: 'Message', type: 'textarea', required: true }
	]
} as const satisfies FormDefinition;
