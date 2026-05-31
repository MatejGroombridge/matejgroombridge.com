I spent more time than I am proud of picking the "right" tools before writing a single sentence. Here is what I landed on, mostly so I stop fiddling and start writing.

## Where the words live

Plain markdown files in this repository, one per article, committed alongside the code. No database, no CMS, no draft purgatory in someone else's app. If GitHub disappears tomorrow, the words come with me in a folder.

## How they get to the page

SvelteKit reads the markdown at build time and renders it through the same `Prose` component the book notes use. The writing index is a tiny two-column list: number on the left, title on the right. That is the whole interface.

## What I draft in

A scratch markdown file in my editor, with spellcheck on and everything else off. When a draft feels close, I move it into `static/writing/` and add an entry to the articles list. The diff is the publish button.

## What I deliberately do not use

No newsletter platform. No comments. No reactions. No tracking beyond the site-wide analytics I already had. If someone wants to reply, the contact page is one click away, and that is enough friction to make sure the replies are worth reading.

## Why it matters

The point of a minimal stack is not minimalism for its own sake. It is that every piece of the system I do not have to maintain is a piece that cannot become an excuse for not writing.
