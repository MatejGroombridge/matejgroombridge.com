import type { PageContent } from './types';

export type TimelineEvent = {
	date: string;
	month: string;
	title: string;
	body: string;
	tag?: string;
	link?: { label: string; href: string };
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
		title: '2026 | Matej Groombridge',
		description:
			'A living page tracking what I\'m working on, building, and thinking about in 2026.'
	},
	hero: {
		eyebrow: '2026',
		title: 'A year in motion.',
		body:
			'This is my open notebook for 2026 — a running timeline of milestones, the projects ' +
			'I\'m building, and a snapshot of what I\'m into right now. I\'ll keep updating it as ' +
			'the year unfolds.'
	},
	sections: []
} as const satisfies PageContent;

export const year2026Timeline: TimelineEvent[] = [
	{
		date: '2026-05-28',
		month: 'May',
		title: 'Launched the 2026 page',
		body:
			'Built a living timeline on the new site so I can keep a running log of the year ' +
			'without spinning up yet another tool.',
		tag: 'Site',
		link: { label: 'See projects below', href: '#projects' }
	},
	{
		date: '2026-03-01',
		month: 'Mar',
		title: 'Back at Atlassian',
		body:
			'Returned for another rotation with the team. Heads-down on shipping something ' +
			'real this cycle.',
		tag: 'Work'
	},
	{
		date: '2026-02-10',
		month: 'Feb',
		title: 'Second year, semester one',
		body: 'Kicked off the new semester at UNSW. Picking electives that actually stretch me.',
		tag: 'Study'
	},
	{
		date: '2026-01-01',
		month: 'Jan',
		title: 'New year, fresh page',
		body:
			'Set the tone for the year: build more, write more, photograph more, and waste ' +
			'less time on noise.',
		tag: 'Life'
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
	{ icon: 'code', label: 'Working on', value: 'Atlassian + this site' },
	{ icon: 'menu_book', label: 'Reading', value: 'See book notes' },
	{ icon: 'self_improvement', label: 'Focused on', value: 'Build more, scroll less' }
];

export const year2026Focus: string[] = [
	'Ship real software, not just side ideas.',
	'Read 20+ books and write proper notes for each.',
	'Take the camera out monthly, not just on trips.',
	'Stay consistent with training and recovery.'
];
