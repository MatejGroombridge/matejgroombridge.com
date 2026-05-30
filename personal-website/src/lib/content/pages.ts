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
			{ label: '2026', href: '/2026' },
			// { label: 'Read my writing', href: '/writing', variant: 'secondary' },
			{ label: 'Get in touch', href: '/contact', variant: 'ghost' }
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
	{ icon: 'self_improvement', label: 'Focused on', value: 'Build more, scroll less' }
];

export const homeIntro = {
	eyebrow: 'About this site',
	title: 'A small, quiet corner of the internet.',
	body:
		'This is where I keep the parts of my life I want to think about more carefully — the ' +
		'software I\'m building, the books I\'m reading, the photos I\'m taking, and the ideas ' +
		'I\'m turning over. It\'s a slower place than the feeds, and that\'s the point.'
};

export const writingPage = {
	slug: 'writing',
	seo: {
		title: 'Writing | Matej Groombridge',
		description:
			'Essays, notes, and short pieces by Matej Groombridge on software, learning, and life.'
	},
	hero: {
		eyebrow: 'Writing',
		title: 'Notes from the workbench.',
		body: 'Short essays and longer pieces on software, learning, and the things I keep thinking about.'
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
		title: 'Have a question, project, or idea?',
		body: 'Send a message and I will get back to you when I can.'
	},
	sections: []
} as const satisfies PageContent;

export const contactForm = {
	name: 'contact',
	subject: 'New website enquiry',
	successMessage: 'Thanks for getting in touch. I will reply shortly.',
	fields: [
		{ name: 'name', label: 'Name', type: 'text', required: true },
		{ name: 'email', label: 'Email', type: 'email', required: true },
		{ name: 'subject', label: 'Subject', type: 'text' },
		{ name: 'message', label: 'Message', type: 'textarea', required: true }
	]
} as const satisfies FormDefinition;
