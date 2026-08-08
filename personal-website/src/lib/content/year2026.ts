import type { PageContent } from './types';

export type TimelineEvent = {
	date: string;
	title: string;
	href?: string;
};

export type Project = {
	title: string;
	period: string;
	description: string;
	tech?: string[];
	status?: 'shipped' | 'in-progress' | 'paused' | 'exploring';
	href?: string;
	repo?: string;
	icon?: string;
};

export type CurrentlyItem = {
	icon: 'menu_book' | 'headphones' | 'code' | 'place' | 'directions_run' | 'self_improvement';
	label: string;
	value: string;
};

export const year2026Page = {
	slug: '2026',
	seo: {
		title: '2026',
		description:
			'A living page tracking what I\'m working on, building, and thinking about in 2026.'
	},
	hero: {
		eyebrow: 'year in review',
		title: '2026',
		body:
			'a log of what I\'m up to this year.'
	},
	sections: []
} as const satisfies PageContent;

export const year2026Timeline: TimelineEvent[] = [
	{
		date: '2026-05-31',
		title: 'rebuilt matejgroombridge.com'
	},
	{
		date: '2026-02-02',
		title: 'Started 5 mo internship at Atlassian'
	},
	{
		date: '2026-05-05',
		title: 'entered my 20s'
	}
];

export const year2026Projects: Project[] = [
	{
		title: 'matejgroombridge.com',
		period: '2026 — ongoing',
		description: 'Rebuilding my personal site from scratch with SvelteKit 5.',
		tech: ['SvelteKit', 'TypeScript', 'SCSS'],
		status: 'in-progress',
		href: '/',
		repo: 'https://github.com/MatejGroombridge',
		icon: 'language'
	},
	{
		title: 'Book Notes',
		period: 'Ongoing',
		description: 'Structured notes from books on philosophy, lifestyle, and tech.',
		tech: ['SvelteKit', 'Markdown'],
		status: 'shipped',
		href: '/booknotes',
		icon: 'menu_book'
	},
	{
		title: 'Photography',
		period: 'Ongoing',
		description: 'Photo essays from cities and landscapes I keep returning to.',
		tech: ['SvelteKit', 'Image pipeline'],
		status: 'shipped',
		href: '/photography',
		icon: 'photo_camera'
	}
];

export const year2026Currently: CurrentlyItem[] = [
	{ icon: 'place', label: 'Based in', value: 'Sydney, Australia' },
	{ icon: 'code', label: 'Working on', value: 'this site' },
	{ icon: 'menu_book', label: 'Reading', value: 'See book notes' },
	// { icon: 'self_improvement', label: 'Focused on', value: 'Build more, scroll less' }
];

export const year2026Focus: string[] = [
	'Ship real software, not just side ideas.',
	'Read 20+ books and write proper notes for each.',
	'Take the camera out monthly, not just on trips.',
	'Stay consistent with training and recovery.'
];
