---
name: booknote
description: Create or fill in a book notes page on matejgroombridge.com - library entry, cover, the 3-sentence summary, Overview & Impressions written in Matej's voice, Top Quotes, and a body built from his Kindle highlights (or a verified public-domain text when he has few). Use this whenever Matej wants to add a book, write up a book he's read, turn a Kindle "Notebook" export or pasted highlights into notes, or finish or flesh out an existing book note - even if he just names a book with a rating and a few impressions.
---

# Book notes

Each book note is one entry in `personal-website/src/lib/content/booknotes.ts`, a cover in `personal-website/static/booknotes/book-cover/<slug>.webp` and a markdown file in `personal-website/static/booknotes/book-markdown/<slug>.md`. The page itself (`src/routes/booknotes/[slug]/+page.svelte`) already handles the styling: Lora body text, lowercase headings, numeral headings, the end-of-notes rule. So the work here is content, done in his voice and his structure.

He edits every note after you draft it. The aim is a draft close enough that his edits are small. That means writing less and plainer rather than more, and never adding opinions he didn't give you.

## 1. Gather what you need

Ask only for what's missing:

- **Title, author, rating** (`N/10`), **when he read it** (`Early|Mid|Late YYYY`).
- **Impressions:** his rough bullet points. These are the raw material for the Overview & Impressions section; don't write that section without them.
- **Highlights:** usually a Kindle Notebook export (`… - Notebook.html`, often in Downloads or `AppData/Local/Temp`), sometimes pasted text, sometimes none.
- **Fiction or not:** fiction gets a different layout (see step 4).
- **Where it goes in the library:** the array order is the "Default" sort. Don't put new books at the top by default; mix them in, and ask if he has a position in mind.

Publication year, edition and description you can work out yourself.

## 2. Library entry

Add an object to `bookNotes` in `booknotes.ts`, matching the others (tabs, single quotes; the file uses CRLF line endings):

```ts
{
	id: <highest existing id + 1>, // drives the "Recently read" sort
	slug: 'warofart', // lowercase, no spaces or hyphens
	title: 'The War of Art',
	author: 'Steven Pressfield',
	published: '2002',
	readingTime: 'Early 2026',
	rating: '9/10',
	bookstore: 'Amazon',
	description: 'The War of Art is Steven Pressfield’s guide to …', // one sentence: what it is, by whom, about what
	cover: '/booknotes/book-cover/warofart.webp',
	bodyPath: '/booknotes/book-markdown/warofart.md',
	seo: {
		title: 'The War of Art | Summary, Notes & Quotes',
		description: 'The book in three sentences: <description>' // fiction: just the description
	}
},
```

There's no `link` field; it was removed. Titles and authors are exempt from the site's lowercase mode automatically. Add `coverFit: 'contain'` only for a square cover.

## 3. Cover

Covers come from Open Library by ISBN through the repo's script. He prefers **Penguin editions** where one exists (Penguin Classics, Little Black Classics, Modern Classics).

```bash
cd personal-website
pnpm covers --lookup "White Nights" "Dostoevsky"   # candidate ISBNs (Open Library)
# add  "whitenights": { "isbn": "9780241252086" }  to scripts/covers.json
pnpm covers whitenights                            # fetch → trim scan frame → 1000px-max WebP
pnpm covers whitenights --from ~/Downloads/x.jpg   # use a local image instead (marks it manual)
```

Many ISBNs have no scan. If you get "no cover found", try other ISBNs of the same edition or a different edition. Look at the result before moving on: open the WebP or view it on the page. Check it's the right edition and that it isn't faded, barcoded or a photo of a physical book.

## 4. The markdown file

**Non-fiction:**

```markdown
## The Book in 3 Sentences

1. …
2. …
3. …

## Overview & Impressions

…

## Top Quotes

> …

> …

# Summary, Quotes & Notes

## I

First passage.

Second passage.

## II

…
```

**Fiction** (he rarely adds it; *White Nights* is the model): only `## Overview & Impressions`, with a two-sentence plot summary inside it, then `## Quotes` with his highlights as `>` quotes in story order. There's no 3 Sentences and no separate body.

**Body headings: bare roman numerals only** (`## I`, `## II`, …), one per part or chapter, in book order.
- **No chapter names.** No "Part"/"Chapter"/"Book", no named sub-headings. He had all of these stripped.
- **Lead-ins:** a named "Introduction" or "Prologue" before the numbering may stay.
- **Short books:** if a book has no meaningful divisions, use no headings at all.
- **Casing:** write headings in Title Case. The page lowercases them in lowercase mode, while numerals keep their capitals.

## 5. Turning highlights into the body

For a Kindle export, run the bundled parser first:

```bash
node .claude/skills/booknote/scripts/kindle-highlights.mjs "<path>/<Book> - Notebook.html"
```

It handles both Kindle HTML formats. It prints every highlight, tidied (dashes as ` - `, line-break hyphens joined, unmatched quote marks dropped, footnote numbers removed, sentence case, closing full stop) and grouped under the export's own section headings, each tagged with its location. Lines marked `[NOTE …]` are his own typed notes, not quotes.

Then:

- **Group under numerals.** Use the export's sections: each chapter becomes `I`, `II`, …; things like Never Finished's "Evolution No. N" fold into their chapter. If the export has no sections (a single "Front Matter"), map locations to chapters from your knowledge of the book and tell him the boundaries are approximate. Use no headings if you can't place them reliably.
- **Pasted highlights** may be out of order. Put them in story/book order and tell him which placements you're unsure of.
- **Read every line.** Fix scan errors ("recogni2ed", "poisonous dies"). Trim highlights that end mid-word ("…it played 24/") back to the last clean clause. Drop "highlights" that are only a chapter title. Keep highlights of different translations of the same line both, but point out the pair.
- **Never reword a quote.** The clean-up above is the only change allowed.

### When he has few or no highlights

Fill in from a **public-domain translation**, ideally the same one his highlights came from, so the wording matches. Earlier picks: Elwes (Spinoza's Ethics), Giles (Sun Tzu), the 1895 Revell translation (Brother Lawrence). Project Gutenberg plain text is at `https://www.gutenberg.org/cache/epub/<id>/pg<id>.txt`.

- **Check the edition is free to quote.** Gutenberg also carries modern copyrighted editions, which say "This is a COPYRIGHTED Project Gutenberg eBook" at the top; don't quote those. If the book itself is still in copyright, don't fill the body yourself. Ask him for highlights instead.
- **Choose the substance:** the passages people actually cite, the definitions or premises the book rests on, and anything that matches what he said he liked. Spread them across every part, in book order, around his own highlights, which are never removed.
- **Verify before writing.** Put your added passages in a text file, one per paragraph, and run:
  ```bash
  node .claude/skills/booknote/scripts/verify-quotes.mjs source.txt passages.txt
  ```
  It must report every passage found. Light conventions are fine and allowed by the checker: dropping a reported-speech "That …" opening, dropping a "said he" speech tag, writing old "GOD"/"LORD" capitals as God/Lord.
- **Tell him** which translation you used and that those passages are yours, not his highlights.

## 6. Writing in his voice

This is what he edits most. Every rule below comes from changes he made to drafts.

**The Book in 3 Sentences:** three plain sentences, one idea each, stating the book's ideas directly.
- **No attribution or method.** Cut "he argues", "in his letters he shows that" and comments on method ("Spinoza builds the argument geometrically" belongs in impressions).
- **Keep it short.** Cut example lists and extra clauses. Prefer "and", "wherein" or a comma over semicolons and ` - ` dashes, and put an aside in brackets: "(you are never finished)".
- **Lowercase concept names:** "mental lab", "one second decision", not "Mental Lab".
- **Keep it general:** "every challenge", not "every workout and task".

**Overview & Impressions:** 4–6 sentences, built only from his bullet points.
- **Open by introducing the book, not yourself.** The book is the subject of the first sentence: what kind of book it is, the author with a short credential, and the premise. His favourites:
  - "*Excellent Advice for Living* is a collection of aphorisms from writer, editor and photographer Kevin Kelly."
  - "*The Surrender Experiment* is an autobiography that delves into the life of author, speaker and former tech CEO Michael Singer in order to illustrate…"
  - "Robin Sharma's The 5AM Club presents the revolutionary habit of an early-morning routine…"
  - "The War of Art presents a refreshing take on creativity."
- **Then his reaction, in first person and conversational,** with contractions (it's, I'm, I'd). Casual words are his: "spice", "somewhat random", "wishy-washy".
- **Say only what he said.** Don't add praise ("especially", "so", "well worth", "one of my favourite parts"), anecdotes ("had it finished not long after"), flourishes ("in the kitchen as much as in the chapel") or stacked adjectives. When unsure, leave it out.
- **No reviewer voice.** Never write "it is often described as…" or "many readers…". He rejected this outright.
- **Keep his hedges:** "probably worth reading, but go about it differently to how I did", "I'd say it shifted the standards I aspire to", "a fairly demanding read but insightful".
- **Personal context is good:** a first time reading the author, how many sittings, where he bought it.
- **Light punctuation:** no comma before "and"/"but" joining clauses or after short openers ("the end but overall"). Use Australian/British spelling (realise, behaviour).

Examples from his edits (draft → his version):
- "Holiness, he argues, does not depend on…" → "Holiness does not depend on…"
- "Worth reading, but perhaps not as your first Nietzsche." → "Probably worth reading, but go about it differently to how I did."
- "…add some dimensionality to the piece…" → "…added some spice to the piece…"
- "The prose is lovely, and much of the story is carried by the dialogue between the two, which is earnest, tender and at times painfully self-aware." → "The prose was lovely to read and much of the story is carried by the dialogue between the two."

**Top Quotes:** 3–5, chosen from the body. He cut every 7-quote draft down. He keeps the longer, reflective standouts and drops short punchy one-liners and repeats of the same theme. Strip lead-ins like "Rule of thumb:".

## 7. Check it

```bash
cd personal-website && pnpm validate:content     # entries, slugs and asset paths
cd .. && pnpm --filter personal-website check     # types (0 errors expected; a few old warnings exist)
```

Then open it in the browser pane with the `personal-website` launch config, at `/booknotes/<slug>`. Check:
- the cover shows with no outline;
- headings render as numerals;
- no `TODO` remains;
- the card sits where intended on `/booknotes`.

## 8. Hand back

In your reply, show him the 3 Sentences and the Impressions paragraph in full, and list which quotes you picked for Top Quotes. Flag anything you inferred or weren't sure of: chapter boundaries, quote order, the edition used, passages you added. Don't commit or push unless he asks. He usually edits first.
