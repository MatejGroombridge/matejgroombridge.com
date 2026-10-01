import { bookNotes } from './booknotes';

/**
 * Proper nouns that should keep their original capitalisation even when
 * lowercase mode is on. Add new names here as content grows.
 *
 * Matching rules:
 * - Case-sensitive, exact match.
 * - Word-boundary aware: non-letter characters either side are fine
 *   (so "Sydney" matches inside "Sydney-based" and is preserved as "Sydney",
 *   while "-based" is still lowercased).
 * - Longer entries are matched before shorter ones, so "South Coast" wins
 *   over "Coast" and "Snowy Mountains" wins over "Snowy".
 */
const manualNouns: string[] = [
	// Pronoun
	'I',

	// Personal / identity
	'Matej Groombridge',
	'Matej',
	'Groombridge',

	// Education / work
	'UNSW',
	'Atlassian',

	// Tech / brands
	'SvelteKit',
	'Svelte',
	'TypeScript',
	'JavaScript',
	'SCSS',
	'CSS',
	'HTML',
	'Markdown',
	'GitHub',
	'LinkedIn',
	'Instagram',
	'Netlify',
	'Google',
	'Sony',
	'Canon',
	'Samsung',
	'DJI',
	'Galaxy',
	'EOS',
	'SEO',

	// Places — Sydney area
	'Sydney Cricket Ground',
	'Sydney Coastal Walk',
	'Sydney',
	'Cockle Bay Wharf',
	'Darling Harbour',
	'Circular Quay',
	'Vaucluse',
	'La Perouse',
	'Wollongong',

	// Events / festivals
	'VIVID',

	// Places — NSW / AU regions
	'Snowy Mountains',
	'Snowy Mtns.',
	'Snowies',
	'Lake Tabourie',
	'Central West',
	'South Coast',
	'Gold Coast',
	'Mayfield Gardens',
	'Lost City',
	'Glen Davis',
	'Bathurst',
	'Lithgow',
	'Australia',
	'Australian',

	// Places — Europe
	'Slovenia',
	'Slovenian',
	'Velika Planina',
	'Smarna Gora',
	'Arboretum',
	'Piran',
	'Prague',
	'Czech Republic',
	'Czech',
	'Vienna',
	'Austria',
	'Austrian',
	'Salzburg',
	'Croatia',
	'Croatian',
	'Krk',

	// Months (proper nouns in English)
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Sept',
	'Oct',
	'Nov',
	'Dec',

	// Weekdays
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',

	// Short forms of book titles / names used in prose outside the book notes
	'Naval Ravikant',
	'5AM Club',
	'4-Hour Workweek'
];

export const properNouns: string[] = [
	...manualNouns,
	...bookNotes.flatMap((book) => [book.title, book.author])
];
