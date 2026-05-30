import type { SiteSettings } from './types';

export const siteSettings = {
	name: 'Matej Groombridge',
	tagline: 'thanks for stopping by',
	baseUrl: 'https://www.matejgroombridge.com',
	email: 'hello@matejgroombridge.com',
	analyticsId: 'G-LK1M7GLR61',
	seo: {
		title: 'Matej Groombridge',
		description:
			'A minimal personal website for software, photography, book notes, and personal writing.'
	},
	nav: [
		{ label: '2026', href: '/2026', icon: 'calendar_today' },
		{ label: 'Photos', href: '/photography', icon: 'photo_camera' },
		{ label: 'Book Notes', href: '/booknotes', icon: 'menu_book' },
		{ label: 'Writing', href: '/writing', icon: 'edit_note' },
		{ label: 'Contact', href: '/contact', icon: 'mail' }
	],
	socials: [
		{ label: 'Instagram', href: 'https://www.instagram.com/___matej/', icon: 'instagram' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/matej-groombridge-06157517b/',
			icon: 'linkedin'
		},
		{ label: 'GitHub', href: 'https://github.com/MatejGroombridge', icon: 'github' },
		{
			label: 'Photography Instagram',
			href: 'https://www.instagram.com/matejsphotography/',
			icon: 'camera'
		},
		{ label: 'Email', href: '/contact#contact-form', icon: 'mail' }
	]
} as const satisfies SiteSettings;
