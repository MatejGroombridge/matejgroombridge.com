#!/usr/bin/env node
/**
 * Check that passages you've added from a public-domain text appear in it word
 * for word, so nothing paraphrased or misremembered ends up quoted.
 *
 *   node verify-quotes.mjs <source.txt> <passages.txt>
 *
 * passages.txt holds one passage per paragraph (blank line between). Allowed
 * differences, because they are presentation not wording: case, whitespace,
 * quote-mark style, "--" vs " - ", _italic_ markers, [n] footnote marks,
 * dropped speech tags ("…," said he, "…"), a dropped leading "That " (reported
 * speech) and the final punctuation mark. Exits 1 and lists any misses.
 */
import { readFileSync } from 'node:fs';

const [sourcePath, passagesPath] = process.argv.slice(2);
if (!sourcePath || !passagesPath) {
	console.error('usage: node verify-quotes.mjs <source.txt> <passages.txt>');
	process.exit(1);
}

const norm = (s) =>
	s
		.replace(/_/g, '')
		.replace(/\[\d+\]/g, '')
		.replace(/--/g, ' - ')
		.replace(/[—–]/g, ' - ')
		.replace(/[’‘']/g, "'")
		.replace(/,["”] said (he|she), ["“]/gi, ' ')
		.replace(/[“”"]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();

const source = norm(readFileSync(sourcePath, 'utf8'));
const passages = readFileSync(passagesPath, 'utf8')
	.replace(/\r\n/g, '\n')
	.split(/\n\s*\n/)
	.map((p) => p.replace(/^>\s?/gm, '').trim())
	.filter(Boolean);

const missing = passages.filter((p) => {
	const n = norm(p).replace(/[.!?:;,]$/, '');
	return !source.includes(n) && !source.includes('that ' + n);
});

console.log(`${passages.length - missing.length}/${passages.length} passages found verbatim`);
if (missing.length) {
	console.log('\nNOT FOUND (check wording against the source):');
	for (const p of missing) console.log(' - ' + p.slice(0, 120));
	process.exit(1);
}
