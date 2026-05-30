import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { bookNotes, photoTrips, siteSettings } from '../src/lib/content';

type Issue = {
	area: string;
	message: string;
};

const issues: Issue[] = [];
const staticRoot = join(process.cwd(), 'static');

function addIssue(area: string, message: string) {
	issues.push({ area, message });
}

function assertUnique(area: string, values: readonly string[]) {
	const seen = new Set<string>();
	for (const value of values) {
		if (seen.has(value)) {
			addIssue(area, `Duplicate value: ${value}`);
		}
		seen.add(value);
	}
}

function assertPublicAsset(area: string, assetPath: string | undefined) {
	if (!assetPath || assetPath.startsWith('http')) return;
	if (!assetPath.startsWith('/')) {
		addIssue(area, `Asset path must be public-root relative: ${assetPath}`);
		return;
	}
	if (!existsSync(join(staticRoot, assetPath.slice(1)))) {
		addIssue(area, `Missing asset: ${assetPath}`);
	}
}

function assertSeo(area: string, seo: { title: string; description: string }) {
	if (!seo.title.trim()) addIssue(area, 'SEO title is required');
	if (!seo.description.trim()) addIssue(area, 'SEO description is required');
}

assertSeo('site', siteSettings.seo);
assertUnique(
	'site.nav',
	siteSettings.nav.map((link) => link.href)
);
assertUnique(
	'site.socials',
	siteSettings.socials.map((link) => link.label)
);

assertUnique(
	'booknotes',
	bookNotes.map((book) => book.slug)
);
for (const book of bookNotes) {
	const area = `booknotes/${book.slug}`;
	assertSeo(area, book.seo);
	assertPublicAsset(area, book.cover);
	assertPublicAsset(area, book.bodyPath);
	if (!book.title.trim()) addIssue(area, 'Title is required');
	if (!book.author.trim()) addIssue(area, 'Author is required');
}

assertUnique(
	'photography',
	photoTrips.map((trip) => trip.slug)
);
for (const trip of photoTrips) {
	const area = `photography/${trip.slug}`;
	assertSeo(area, trip.seo);
	assertPublicAsset(area, trip.coverImage);
	assertUnique(
		`${area}.images`,
		trip.images.map((image) => image.src)
	);
	if (trip.images.length === 0) addIssue(area, 'Trip must include at least one image');
	for (const image of trip.images) {
		assertPublicAsset(area, image.src);
		if (!image.alt.trim()) addIssue(area, `Image alt text is required: ${image.src}`);
		if (!image.location.trim()) addIssue(area, `Image location is required: ${image.src}`);
	}
}

if (issues.length) {
	console.error('Content validation failed:');
	for (const issue of issues) {
		console.error(`- [${issue.area}] ${issue.message}`);
	}
	process.exit(1);
}

console.log(
	`Content validation passed for ${bookNotes.length} book notes and ${photoTrips.length} photo trips.`
);
