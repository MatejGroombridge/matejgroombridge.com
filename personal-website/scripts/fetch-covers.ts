/**
 * Download book covers into static/booknotes/book-cover as 1000px-tall WebP.
 *
 * Editions are pinned by ISBN in scripts/covers.json so a re-run is
 * reproducible. Open Library is tried first (free, no key); Google Books is
 * the fallback. Existing covers are left alone unless --force is passed, and
 * covers marked `manual` in the manifest are only replaced when named.
 *
 *   pnpm covers                      # fetch every book missing a cover
 *   pnpm covers siddhartha ethics    # fetch these slugs (still skips existing)
 *   pnpm covers --force siddhartha   # overwrite
 *   pnpm covers artofwar --from ~/Downloads/cover.jpg   # use a local image, marks it manual
 *   pnpm covers --lookup "Ethics" "Spinoza"   # list candidate ISBNs
 *   pnpm covers --verify             # print the title behind every pinned ISBN
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { bookNotes } from '../src/lib/content/booknotes';

const manifestPath = join(process.cwd(), 'scripts', 'covers.json');
const coverDir = join(process.cwd(), 'static', 'booknotes', 'book-cover');
const TARGET_HEIGHT = 1000;

/** `manual: true` marks a hand-picked cover that bulk --force must not replace. */
type Manifest = Record<string, { isbn: string; manual?: boolean }>;
type Fetched = { buffer: Buffer; source: string };

const manifest: Manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

function coverPath(slug: string) {
	return join(coverDir, `${slug}.webp`);
}

async function fromOpenLibrary(isbn: string): Promise<Fetched | null> {
	// default=false turns the placeholder image into a 404
	const res = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`);
	if (!res.ok) return null;
	const buffer = Buffer.from(await res.arrayBuffer());
	// Open Library occasionally serves a 1x1 pixel for records with no scan
	const meta = await sharp(buffer).metadata();
	if (!meta.height || meta.height < 200) return null;
	return { buffer, source: 'Open Library' };
}

async function fromGoogleBooks(isbn: string): Promise<Fetched | null> {
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
	if (!res.ok) return null;
	const data = (await res.json()) as { items?: { id: string }[] };
	const id = data.items?.[0]?.id;
	if (!id) return null;
	// zoom=3 is the largest size the content endpoint reliably returns
	const img = await fetch(
		`https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=3`
	);
	if (!img.ok) return null;
	const buffer = Buffer.from(await img.arrayBuffer());
	const meta = await sharp(buffer).metadata();
	if (!meta.height || meta.height < 200) return null;
	return { buffer, source: 'Google Books' };
}

/**
 * Scans often carry a 1-3px frame (a grey scanner edge or a dark line) that
 * reads as an outline once the cover sits on the page. A line counts as frame
 * when it is even along its length and clearly unlike the artwork just inside.
 */
async function trimFrame(buffer: Buffer): Promise<Buffer> {
	const { data, info } = await sharp(buffer)
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width, height } = info;
	const lum = (x: number, y: number) => {
		const i = (y * width + x) * 3;
		return (data[i] + data[i + 1] + data[i + 2]) / 3;
	};
	const stats = (values: number[]) => {
		const mean = values.reduce((a, b) => a + b, 0) / values.length;
		const sd = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
		return { mean, sd };
	};
	const row = (y: number) => Array.from({ length: width }, (_, x) => lum(x, y));
	const col = (x: number) => Array.from({ length: height }, (_, y) => lum(x, y));
	const MAX = 3;
	const depth = (line: (k: number) => number[]) => {
		const inner = stats(line(MAX + 2)).mean;
		let k = 0;
		while (k < MAX) {
			const { mean, sd } = stats(line(k));
			if (sd > 25 || Math.abs(mean - inner) < 20) break;
			k++;
		}
		return k;
	};
	const top = depth(row);
	const bottom = depth((k) => row(height - 1 - k));
	const left = depth(col);
	const right = depth((k) => col(width - 1 - k));
	if (!top && !bottom && !left && !right) return buffer;
	return sharp(buffer)
		.extract({ left, top, width: width - left - right, height: height - top - bottom })
		.toBuffer();
}

async function writeCover(slug: string, buffer: Buffer, source: string) {
	const image = sharp(await trimFrame(buffer)).resize({
		height: TARGET_HEIGHT,
		withoutEnlargement: true
	});
	const { width, height } = await image.clone().metadata();
	await image.webp({ quality: 82 }).toFile(coverPath(slug));
	console.log(`✓ ${slug}: ${source} (${width}x${height})`);
}

async function importCover(slug: string, file: string) {
	await writeCover(slug, readFileSync(file), file);
	manifest[slug] = { ...manifest[slug], manual: true };
}

async function fetchCover(slug: string, force: boolean, explicit: boolean) {
	const entry = manifest[slug];
	if (!entry) {
		console.log(`✗ ${slug}: no ISBN in scripts/covers.json`);
		return;
	}
	const out = coverPath(slug);
	if (existsSync(out) && !force) {
		console.log(`· ${slug}: cover exists, skipping (use --force to replace)`);
		return;
	}
	if (entry.manual && !explicit) {
		console.log(`· ${slug}: hand-picked cover, skipping (name the slug to replace)`);
		return;
	}
	const fetched = (await fromOpenLibrary(entry.isbn)) ?? (await fromGoogleBooks(entry.isbn));
	if (!fetched) {
		console.log(`✗ ${slug}: no cover found for ISBN ${entry.isbn}`);
		return;
	}
	await writeCover(slug, fetched.buffer, fetched.source);
}

async function lookup(title: string, author: string) {
	const q = new URLSearchParams({
		title,
		author,
		fields: 'title,author_name,isbn,cover_i,publisher,first_publish_year',
		limit: '8'
	});
	const res = await fetch(`https://openlibrary.org/search.json?${q}`);
	const data = (await res.json()) as {
		docs: {
			title: string;
			author_name?: string[];
			isbn?: string[];
			cover_i?: number;
			publisher?: string[];
			first_publish_year?: number;
		}[];
	};
	for (const d of data.docs) {
		const isbns = (d.isbn ?? []).filter((i) => i.length === 13).slice(0, 4);
		if (!isbns.length) continue;
		console.log(
			`${d.title} — ${d.author_name?.join(', ')} (${d.first_publish_year ?? '?'})${d.cover_i ? '' : '  [no cover]'}
    ${isbns.join(' ')}`
		);
	}
}

/** Print the title Open Library has for each pinned ISBN, to catch typos. */
async function verify() {
	for (const [slug, { isbn }] of Object.entries(manifest)) {
		const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
		const title = res.ok ? ((await res.json()) as { title: string }).title : 'NOT FOUND';
		console.log(`${slug.padEnd(22)} ${isbn}  ${title}`);
	}
}

async function main() {
	const args = process.argv.slice(2);
	if (args[0] === '--verify') {
		await verify();
		return;
	}
	if (args[0] === '--lookup') {
		await lookup(args[1] ?? '', args[2] ?? '');
		return;
	}
	const known = new Set(bookNotes.map((b) => b.slug));
	const fromIndex = args.indexOf('--from');
	if (fromIndex !== -1) {
		const [slug, file] = [args[0], args[fromIndex + 1]];
		if (!known.has(slug) || !file) {
			console.log('usage: pnpm covers <slug> --from <image>');
			return;
		}
		await importCover(slug, file);
		writeFileSync(manifestPath, JSON.stringify(manifest, null, '\t') + '\n');
		return;
	}
	const force = args.includes('--force');
	const requested = args.filter((a) => !a.startsWith('--'));
	const slugs = requested.length ? requested : [...known];
	for (const slug of slugs) {
		if (!known.has(slug)) {
			console.log(`✗ ${slug}: not a book note slug`);
			continue;
		}
		await fetchCover(slug, force, requested.length > 0);
	}
	// keep the manifest tidy for the next person to edit it
	writeFileSync(manifestPath, JSON.stringify(manifest, null, '\t') + '\n');
}

main();
