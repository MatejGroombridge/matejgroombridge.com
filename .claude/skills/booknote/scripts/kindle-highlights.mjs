#!/usr/bin/env node
/**
 * Read a Kindle "Notebook" export (.html) and print its highlights, tidied and
 * grouped under the export's own section headings, ready to turn into a note.
 *
 *   node kindle-highlights.mjs "C:/Users/matej/Downloads/Some Book - Notebook.html"
 *
 * Each line is prefixed with where it sits in the book ([loc 221] / [p 18]) so
 * you can order and group it. Matej's own typed notes are marked [NOTE] - they
 * are his thoughts, not quotes. Nothing is reworded: only the mechanical
 * clean-up listed in tidy() is applied, so still read the output once.
 */
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
	console.error('usage: node kindle-highlights.mjs <notebook.html>');
	process.exit(1);
}

const html = readFileSync(file, 'utf8');
const decode = (s) =>
	s
		.replace(/<[^>]+>/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&rsquo;/g, '’')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

function tidy(t) {
	t = t
		.replace(/(\w)- (\w)/g, '$1-$2') // "self- propelling" (Kindle line-break hyphen)
		.replace(/\s*(—|–|--)\s*/g, ' - ') // dashes as " - ", the site's convention
		.replace(/([.!?’”"]) \d{1,3}$/, '$1') // trailing footnote number
		.replace(/\s+/g, ' ')
		.trim();
	// Drop a quote mark whose partner fell outside the highlight.
	const opens = (t.match(/‘/g) || []).length;
	const closes = (t.match(/’(?![a-z])/gi) || []).length;
	if (t.startsWith('‘') && opens > closes) t = t.slice(1);
	else if (t.endsWith('’') && closes > opens) t = t.slice(0, -1);
	if ((t.match(/"/g) || []).length % 2) t = t.replace(/^"|"$/g, '');
	if ((t.match(/“/g) || []).length !== (t.match(/”/g) || []).length) t = t.replace(/^“|”$/g, '');
	t = t.trim().replace(/^([‘“"]?)([a-z])/, (_, q, c) => q + c.toUpperCase());
	t = t.replace(/[,;:]$/, '.');
	if (!/[.!?’”"]$/.test(t)) t += '.';
	return t;
}

// Kindle has shipped at least two markups (div/double-quote and h2/h3/
// single-quote, the latter with mismatched closing tags), so match on the class
// name alone and take everything up to the next marked element.
const marker = /class=['"](bookTitle|authors|sectionHeading|noteHeading|noteText)['"][^>]*>/g;
const marks = [...html.matchAll(marker)];
let title = '';
let author = '';
let section = null;
let where = '';
let isNote = false;
const seen = new Set();
const out = [];
let highlights = 0;
let notes = 0;

for (const [i, mk] of marks.entries()) {
	const kind = mk[1];
	const end = i + 1 < marks.length ? marks[i + 1].index : html.length;
	// Drop the opening "<div " / "<h3 " of the next element that the slice ends on.
	const raw = html.slice(mk.index + mk[0].length, end).replace(/<[a-z0-9]+\s*$/i, '');
	const text = decode(raw);
	if (kind === 'bookTitle')
		// "Title _ subtitle -- Author -- 2023 -- Publisher …" and "Title (Author) (z-library…)"
		title = text
			.split(' -- ')[0]
			.replace(/ _ /, ': ')
			.replace(/(\s*\([^)]*\)?)+$/, '');
	else if (kind === 'authors') author = text;
	else if (kind === 'sectionHeading') {
		section = text;
		out.push('', `## SECTION: ${text}`);
	} else if (kind === 'noteHeading') {
		isNote = /^Note\b/i.test(text);
		const loc = text.match(/Location (\d+)/i);
		const page = text.match(/Page (\d+)/i);
		const sub = text.match(/-\s*(.+?)\s*>\s*Page/); // e.g. "DEFINITIONS. > Page 45"
		where = loc ? `loc ${loc[1]}` : page ? `p ${page[1]}` : '?';
		if (sub) where += ` · ${sub[1]}`;
	} else if (kind === 'noteText') {
		const t = isNote ? text : tidy(text);
		const key = t.toLowerCase().replace(/[^a-z]/g, '');
		if (seen.has(key)) continue; // the same passage highlighted twice
		seen.add(key);
		if (isNote) notes++;
		else highlights++;
		out.push(`[${isNote ? 'NOTE ' : ''}${where}] ${t}`);
	}
}

console.log(`# ${title} — ${author}`);
console.log(`${highlights} highlights, ${notes} notes${section === null ? ', no section headings' : ''}`);
console.log(out.join('\n'));
