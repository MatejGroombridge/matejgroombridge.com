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

/**
 * One row of an article's table of contents.
 *
 * `id` must match the heading's anchor in the body. Headings are slugged from
 * their own text, so `## I` becomes `id: 'i'` and `## Where the words live`
 * becomes `id: 'where-the-words-live'`.
 */
export type ArticleSection = {
	id: string;
	/** Short marker shown before the label, e.g. 'I'. */
	marker?: string;
	label: string;
};

/**
 * A superseded copy of an article, kept so readers can see what changed.
 *
 * Versions are identified by date alone — that is all the menu lists. Anything
 * that needs saying about a version goes in `note`, which appears in the banner
 * shown while it is open.
 */
export type ArticleVersion = {
	id: string;
	/** When this version was last modified. Its label everywhere it is listed. */
	modified: string;
	/** Markdown module name under `src/lib/content/writing/`, without `.md`. */
	body: string;
	/** One-line explanation of this version, shown in the banner. */
	note?: string;
};

export type Article = {
	slug: string;
	title: string;
	/** Standfirst shown under the title. Falls back to `description` when unset. */
	subtitle?: string;
	/**
	 * Material Symbols Rounded ligature name, drawn large beside the title as the
	 * article's mark — the writing equivalent of a book note's cover. Browse names
	 * at https://fonts.google.com/icons. Omit for no mark.
	 */
	icon?: string;
	/**
	 * Hand-drawn SVG marks (URLs under /static) drawn as a floating cluster beside
	 * the title instead of `icon`. Three read best: top, bottom-left, bottom-right.
	 */
	marks?: string[];
	published: string;
	readingTime?: string;
	description: string;
	/**
	 * Markdown module name under `src/lib/content/writing/`, without `.md`.
	 * Compiled by mdsvex, so the file may contain GFM footnotes and raw HTML.
	 */
	body?: string;
	/**
	 * Author-written short version of the body. Keep its headings identical to
	 * the full body so the table of contents still resolves in both modes.
	 */
	abridged?: string;
	abridgedReadingTime?: string;
	contents?: ArticleSection[];
	/** Earlier versions, newest first. The version menu hides when this is empty. */
	versions?: ArticleVersion[];
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
