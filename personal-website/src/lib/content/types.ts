export type Seo = {
	title: string;
	description: string;
	image?: string;
	canonical?: string;
};

export type Cta = {
	label: string;
	href: string;
	variant?: 'primary' | 'secondary' | 'ghost';
};

export type HeroImage = {
	src: string;
	alt: string;
	loading?: 'lazy' | 'eager';
};

export type NavLink = {
	label: string;
	href: string;
	icon: 'photo_camera' | 'menu_book' | 'person' | 'mail' | 'calendar_today' | 'edit_note';
	group?: 'primary' | 'more';
};

export type SocialLink = {
	label: string;
	href: string;
	icon: 'instagram' | 'linkedin' | 'github' | 'camera' | 'mail';
};

export type EmailJsConfig = {
	publicKey: string;
	serviceId: string;
	templateId: string;
};

export type SiteSettings = {
	name: string;
	tagline: string;
	baseUrl: string;
	email: string;
	analyticsId: string;
	emailjs: EmailJsConfig;
	seo: Seo;
	nav: Omit<NavLink, 'group'>[];
	socials: SocialLink[];
};

export type PageCard = {
	title: string;
	body: string;
	href?: string;
	image?: string;
	meta?: string;
};

export type PageSection = {
	id?: string;
	eyebrow?: string;
	title: string;
	body: string[];
	tone?: 'default' | 'muted' | 'dark';
	cta?: Cta;
	cards?: PageCard[];
};

export type PageContent = {
	slug: string;
	seo: Seo;
	hero: {
		eyebrow?: string;
		title: string;
		body: string;
		ctas?: Cta[];
		image?: HeroImage;
	};
	sections: PageSection[];
};

export type FormField = {
	name: string;
	label: string;
	type: 'text' | 'email' | 'textarea' | 'select';
	required?: boolean;
	placeholder?: string;
	options?: string[];
};

export type FormDefinition = {
	name: string;
	subject: string;
	successMessage: string;
	fields: FormField[];
};

export type BookNote = {
	id?: number | null;
	slug: string;
	title: string;
	author: string;
	published: string;
	readingTime: string;
	rating: string;
	bookstore?: string;
	link?: string;
	description: string;
	cover: string;
	bodyPath?: string;
	seo: Seo;
};

export type Article = {
	slug: string;
	title: string;
	published: string;
	readingTime?: string;
	description: string;
	bodyPath?: string;
	seo: Seo;
};

export type PhotoImage = {
	src: string;
	alt: string;
	location: string;
	capturedAtLabel: string;
	camera?: string;
	order: number;
	featured?: boolean;
};

export type PhotoTrip = {
	slug: string;
	title: string;
	subtitle: string;
	year: number;
	coverImage: string;
	seo: Seo;
	images: PhotoImage[];
};
