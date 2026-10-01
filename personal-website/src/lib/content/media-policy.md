This page sets out how I approach the writing, book notes, photography and code on this website, and the part AI plays in each of them.

Over the last couple of years AI has crept into almost every corner of my creative and professional life, and I've found myself having to make more and more conscious decisions about where I want it and where I don't. I put this together for two reasons. The first is a little selfish — I wanted to pin down an ethos of sorts that I can hold myself to as I write more in the future. The second is that people ask me about my process fairly often, and it's nice to have somewhere to point them. Underlying both is that I'm a big proponent of radical transparency — I think you should be able to tell exactly how much of what you're reading or looking at came from me.

The short version:

- **Essays** — every paragraph is written by me. AI helps with research, proofreading and feedback, but not the words themselves.
- **Book notes** — drafted with heavy AI assistance from my own Kindle highlights and impressions, then edited by me.
- **Photography and videography** — no AI whatsoever.
- **Code** — this site was rebuilt with AI in 2026, and AI now writes nearly all of its code.
- **This page** — drafted with AI and edited by me. More on why below.

This is a living document. The tools are changing fast and I expect my thinking to change with them, so I'll keep it updated as I go.

## I

I want to start by saying that I think AI is incredibly valuable. I use it every day, both at work and in my own projects, and as I argued at length in [on the singularity](/writing/singularity), I believe it's on track to become the most consequential technology humanity has ever built.

It would be dishonest to pretend AI isn't already better than me at a lot of things. It writes cleaner code than I do, at a speed I could never match. It can produce an image, a melody or a perfectly passable essay in seconds — work that would take me hours, if I could produce it at all. On raw output alone, there isn't really a contest any more.

But I don't think output is the whole point. For me, the value of creative work lives as much in the making as in the thing that gets made — the hours spent wrestling with a sentence until it finally says what I mean, or waiting for the light to hit a street just right. Hand that process over to a model and you get the finished product without any of the growth that's supposed to come with it. AI-generated writing can be polished, even good, but I don't think it's creative in any meaningful sense, and it strips out the effort that I've come to see as the whole point. Developing a craft takes time, frustration and a lot of bad first attempts, and I think there's real value in that which I'm not willing to outsource.

This is why there is zero AI in my photography and videography. Every photo on this site was taken by me and edited by me, and nothing appears in a frame that wasn't in front of the lens. No generated imagery, no generative fill, no synthetic skies. The same goes for any video work I share.

That said, there's a distinction I think matters a lot here, and it's between creative writing and writing that serves a particular purpose. An essay is something I make for its own sake — the process is the point, and the words are the work. A README, an email, a set of instructions, an about page — these exist to get a job done, and the job is the point. For that second kind of writing, AI speeds up the process enormously without any significant drop in quality, and I'm happy to lean on it.

This page sits firmly in that second category. It's a practical document rather than a creative one, so I've made heavy use of AI to produce it — I gave it my rough notes, a sample of my writing and an outline, then workshopped what came back until it said what I wanted it to. The thinking is mine, but a lot of the sentences aren't. I'm comfortable with that trade here, because every hour I'm not spending on a policy page is an hour I can spend on the work I actually care about making myself.

## II

When it comes to my own writing — the essays and articles I publish on this site — my commitment is simple. **I will never publish a paragraph that wasn't written by me.**

That doesn't mean AI plays no part, and I'd be kidding myself if I claimed my writing isn't influenced by it. I spend a lot of time talking with LLMs, and the ideas, phrasings and arguments I come across in those conversations inevitably filter into how I think, the same way books, podcasts and conversations with friends do. I find them a genuinely great tool for research and for refining ideas — pressure-testing an argument, tracking down sources, poking holes in my reasoning or helping me untangle a thought I can't quite get down on the page.

Once a draft exists, I'll also use AI throughout the editing process. That means catching grammar, punctuation and spelling mistakes, flagging sentences that are clunky or unclear, and giving stylistic feedback on things like structure and pacing. The line I try to hold is that AI can point out a problem, but I'm the one who fixes it. Small mechanical corrections — a missing comma, a misspelt name — I'll accept as they are. Anything bigger than that, I rewrite myself rather than taking a suggested replacement. And wherever I cite a source, I check the claim against the source itself rather than trusting a model's summary of it.

I'm very committed to developing my own voice and to investing in writing as a craft that I get better at over time. I'm still early in that process and I know my writing has rough edges, but I'd much rather it be imperfect and mine than polished and someone else's. So I try to stay vigilant about the ways AI can both aid and disrupt creativity. It's surprisingly easy to let a model's suggestions slowly sand your voice down into something smoother and more generic, and the line between feedback and ghostwriting is one you can drift across without really noticing. Holding myself to the paragraph rule is how I keep that line clear.

## III

Book notes fall into the second category from above — they're there to serve a purpose, and so they're produced with a lot of AI assistance.

The process starts with reading. I read almost everything on my Kindle and highlight heavily as I go, and those highlights form the basis of every note — the quotes, the key ideas and much of the structure all come from the passages I marked while reading. Once I've finished a book I'll jot down my rough impressions — what I made of it, what stuck with me, who I'd recommend it to — along with a rating out of ten.

The impressions are always my own. Whatever AI does with them, it doesn't add opinions I didn't give it.

From there, I hand my highlights and impressions to a [Claude skill](https://github.com/MatejGroombridge/matejgroombridge.com/blob/main/.claude/skills/booknote/SKILL.md) that I've built specifically for this. I wrote my earlier book notes entirely by hand, and the skill is essentially a distillation of that process — the structure I use, how I group and trim highlights, the tone of the overview, the way I format quotes. It learnt from the notes I'd already made, so that it can repeatedly reproduce my style of writing and the output I want. It also takes care of the busywork, like pulling highlights out of my Kindle export, fetching the cover and checking that every quote matches the book word for word. I then read through and edit every note before it goes up.

What I'm hoping this does is shrink the gap between reading a book and getting the notes up. I used to spend something like a week every summer catching up on a whole year's worth of books, by which point half of what I'd wanted to say had already faded. Now the notes can go up while the book is still fresh.

## IV

I first built this website over several months in 2022, writing every line of it by hand. It was built on a pre-release version of SvelteKit, and it was as much a way of teaching myself web development as it was a home for my work. In the years that followed I kept chipping away at it — adding pages, book notes and photo galleries, tweaking the design, and eventually refactoring the whole thing from that SvelteKit pre-release over to Svelte 5.

In 2026 I rebuilt it from the ground up using AI. Almost all of the code behind the current site was written by Claude Code, and my role shifted from writing code to directing it — deciding what the site should be, how it should look and feel, reviewing what came back and pushing on it until it was right. The current site is built with:

- [SvelteKit](https://svelte.dev/docs/kit) and Svelte 5, written in TypeScript and styled with SCSS
- [mdsvex](https://mdsvex.pngwn.io) for essays, which lets me write in markdown with footnotes and inline media
- Vite and pnpm for building and managing the project
- [Netlify](https://www.netlify.com) for hosting and deployment
- EmailJS for the contact form
- Fraunces, Poppins, Figtree and Lora for type, and Material Symbols and Font Awesome for icons
- sharp for image processing, and Open Library for book covers

The source is all [on GitHub](https://github.com/MatejGroombridge/matejgroombridge.com) if you'd like to poke around.

I've reached a point where I'm comfortable using AI for everything code-related, and I think the reason is the same distinction from earlier. Code serves a purpose — it either works or it doesn't, and whether it works is something I can check. I still care a great deal about how this site looks and behaves, but I don't feel I'm losing anything by not typing out every line myself. If anything, the years I spent building the old site by hand are what let me judge whether what AI writes now is actually any good.

If you've got questions about any of this, or think I've drawn a line in the wrong place, I'd genuinely love to hear from you — feel free to [get in touch](/contact).
