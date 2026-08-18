<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { articles, bookNotes, photoTrips, siteSettings } from '$lib/content';

	type Item = {
		id: string;
		group: 'Pages' | 'Book notes' | 'Photography' | 'Writing' | 'Actions';
		label: string;
		hint?: string;
		icon: string;
		href?: string;
		run?: () => void;
		/** Extra text folded into the match, never shown. */
		keywords?: string;
	};

	type Scored = Item & { score: number; matched: number[] };

	let open = $state(false);
	let query = $state('');
	let active = $state(0);
	let input = $state<HTMLInputElement>();
	let listEl = $state<HTMLDivElement>();
	let announce = $state('');

	const items: Item[] = [
		...siteSettings.nav.map((link) => ({
			id: `nav:${link.href}`,
			group: 'Pages' as const,
			label: link.label,
			hint: link.href,
			icon: link.icon,
			href: link.href
		})),
		{
			id: 'nav:/',
			group: 'Pages',
			label: 'Home',
			hint: '/',
			icon: 'cottage',
			href: '/'
		},
		...bookNotes.map((book) => ({
			id: `book:${book.slug}`,
			group: 'Book notes' as const,
			label: book.title,
			hint: book.author,
			icon: 'menu_book',
			href: `/booknotes/${book.slug}`,
			keywords: `${book.author} ${book.rating} ${book.published}`
		})),
		...photoTrips.map((trip) => ({
			id: `trip:${trip.slug}`,
			group: 'Photography' as const,
			label: trip.title,
			hint: `${trip.subtitle} · ${trip.year}`,
			icon: 'photo_camera',
			href: `/photography/${trip.slug}`,
			keywords: `${trip.subtitle} ${trip.year}`
		})),
		...articles.map((article) => ({
			id: `article:${article.slug}`,
			group: 'Writing' as const,
			label: article.title,
			hint: article.published,
			icon: 'edit_note',
			href: `/writing/${article.slug}`,
			keywords: article.description
		})),
		{
			id: 'action:theme',
			group: 'Actions',
			label: 'Toggle dark mode',
			hint: 'appearance',
			icon: 'dark_mode',
			keywords: 'light theme night',
			run: () => {
				const root = document.documentElement;
				const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
				root.dataset.theme = next;
				localStorage.setItem('theme', next);
			}
		},
		{
			id: 'action:case',
			group: 'Actions',
			label: 'Toggle lowercase mode',
			hint: 'typography',
			icon: 'text_fields',
			keywords: 'caps casing',
			run: () => {
				const root = document.documentElement;
				root.dataset.case = root.dataset.case === 'lower' ? 'normal' : 'lower';
			}
		},
		{
			id: 'action:email',
			group: 'Actions',
			label: 'Copy email address',
			hint: siteSettings.email,
			icon: 'content_copy',
			keywords: 'contact mail reach out',
			run: () => {
				void navigator.clipboard?.writeText(siteSettings.email);
				announce = 'Email copied to clipboard';
			}
		},
		{
			id: 'action:random-book',
			group: 'Actions',
			label: 'Surprise me with a book note',
			hint: 'random',
			icon: 'casino',
			keywords: 'lucky shuffle',
			run: () => {
				const pick = bookNotes[Math.floor(Math.random() * bookNotes.length)];
				if (pick) window.location.assign(`/booknotes/${pick.slug}`);
			}
		}
	];

	/**
	 * Subsequence match with a bonus for hits at word starts and for runs of
	 * adjacent characters, so `bth` ranks "Born To Run" above "Breath".
	 * Returns the matched indices too, for highlighting.
	 */
	function score(text: string, needle: string): { score: number; matched: number[] } | null {
		const haystack = text.toLowerCase();
		let cursor = 0;
		let total = 0;
		let run = 0;
		const matched: number[] = [];

		for (const char of needle) {
			const at = haystack.indexOf(char, cursor);
			if (at === -1) return null;

			const startsWord = at === 0 || /[\s\-/·:]/.test(haystack[at - 1] ?? '');
			run = at === cursor ? run + 1 : 0;
			total += 1 + run * 2 + (startsWord ? 4 : 0);
			// Earlier matches are worth marginally more.
			total += Math.max(0, 6 - at) * 0.2;

			matched.push(at);
			cursor = at + 1;
		}

		return { score: total, matched };
	}

	const results = $derived.by((): Scored[] => {
		const needle = query.trim().toLowerCase();
		if (!needle) {
			return items
				.filter((item) => item.group === 'Pages' || item.group === 'Actions')
				.map((item) => ({ ...item, score: 0, matched: [] }));
		}

		const scored: Scored[] = [];
		for (const item of items) {
			const primary = score(item.label, needle);
			const secondary = primary
				? null
				: score(`${item.label} ${item.hint ?? ''} ${item.keywords ?? ''}`, needle);
			if (primary) scored.push({ ...item, score: primary.score, matched: primary.matched });
			else if (secondary) scored.push({ ...item, score: secondary.score * 0.4, matched: [] });
		}

		return scored.sort((a, b) => b.score - a.score).slice(0, 12);
	});

	const grouped = $derived.by(() => {
		const order: Item['group'][] = ['Pages', 'Writing', 'Book notes', 'Photography', 'Actions'];
		const map = new Map<Item['group'], Scored[]>();
		for (const item of results) {
			const bucket = map.get(item.group) ?? [];
			bucket.push(item);
			map.set(item.group, bucket);
		}
		return order.filter((key) => map.has(key)).map((key) => ({ key, items: map.get(key)! }));
	});

	/** Flat, in-render order — this is what the arrow keys walk. */
	const flat = $derived(grouped.flatMap((group) => group.items));

	function highlight(label: string, matched: number[]) {
		if (!matched.length) return [{ text: label, hit: false }];
		const set = new Set(matched);
		const parts: { text: string; hit: boolean }[] = [];
		for (let i = 0; i < label.length; i++) {
			const hit = set.has(i);
			const last = parts[parts.length - 1];
			if (last && last.hit === hit) last.text += label[i];
			else parts.push({ text: label[i], hit });
		}
		return parts;
	}

	async function show() {
		open = true;
		query = '';
		active = 0;
		await tick();
		input?.focus();
	}

	function hide() {
		open = false;
	}

	function choose(item: Scored | undefined) {
		if (!item) return;
		hide();
		if (item.run) item.run();
		else if (item.href) window.location.assign(item.href);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			hide();
			return;
		}
		if (event.key === 'ArrowDown' || (event.key === 'n' && event.ctrlKey)) {
			event.preventDefault();
			active = flat.length ? (active + 1) % flat.length : 0;
		} else if (event.key === 'ArrowUp' || (event.key === 'p' && event.ctrlKey)) {
			event.preventDefault();
			active = flat.length ? (active - 1 + flat.length) % flat.length : 0;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			choose(flat[active]);
		}
	}

	// Keep the highlighted row inside the scroll viewport.
	$effect(() => {
		if (!open) return;
		const id = flat[active]?.id;
		if (!id) return;
		listEl?.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({
			block: 'nearest'
		});
	});

	// Clamp the cursor whenever the result set shrinks under it.
	$effect(() => {
		if (active >= flat.length) active = 0;
	});

	onMount(() => {
		function global(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				if (open) hide();
				else void show();
			}
		}
		window.addEventListener('keydown', global);
		return () => window.removeEventListener('keydown', global);
	});
</script>

<div class="demo">
	<button class="trigger" type="button" onclick={show}>
		<span class="material-symbols-rounded" aria-hidden="true">search</span>
		<span class="trigger-label">Search everything…</span>
		<kbd data-preserve-case>⌘K</kbd>
	</button>
	<p class="caption">
		One index over pages, {bookNotes.length} book notes, {photoTrips.length} trips and site actions. Fuzzy
		matched — try <code>btr</code> or <code>dark</code>.
	</p>
</div>

<span class="sr-only" role="status" aria-live="polite">{announce}</span>

{#if open}
	<div class="scrim">
		<!-- A real button rather than a click handler on the backdrop: dismissing
		     by clicking outside is then reachable by keyboard and screen readers. -->
		<button class="scrim-close" type="button" aria-label="Close search" onclick={hide}></button>
		<div
			class="palette"
			role="dialog"
			aria-modal="true"
			aria-label="Site search"
			tabindex="-1"
			onkeydown={onKeydown}
		>
			<div class="field">
				<span class="material-symbols-rounded" aria-hidden="true">search</span>
				<input
					bind:this={input}
					bind:value={query}
					onkeydown={onKeydown}
					type="text"
					placeholder="Search pages, books, trips, actions"
					aria-label="Search"
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd data-preserve-case>esc</kbd>
			</div>

			<div class="list" bind:this={listEl}>
				{#if !flat.length}
					<p class="empty">No matches for &ldquo;{query}&rdquo;.</p>
				{/if}
				{#each grouped as group (group.key)}
					<p class="group lab-mono">{group.key}</p>
					{#each group.items as item (item.id)}
						{@const index = flat.indexOf(item)}
						<button
							class="row"
							class:active={index === active}
							type="button"
							data-id={item.id}
							onmouseenter={() => (active = index)}
							onclick={() => choose(item)}
						>
							<span class="material-symbols-rounded row-icon" aria-hidden="true">{item.icon}</span>
							<span class="row-label" data-preserve-case>
								{#each highlight(item.label, item.matched) as part, i (i)}
									{#if part.hit}<mark>{part.text}</mark>{:else}{part.text}{/if}
								{/each}
							</span>
							{#if item.hint}
								<span class="row-hint">{item.hint}</span>
							{/if}
							<span class="material-symbols-rounded row-go" aria-hidden="true">
								{item.run ? 'bolt' : 'subdirectory_arrow_left'}
							</span>
						</button>
					{/each}
				{/each}
			</div>

			<div class="foot lab-mono">
				<span><kbd data-preserve-case>↑↓</kbd> navigate</span>
				<span><kbd data-preserve-case>↵</kbd> open</span>
				<span><kbd data-preserve-case>esc</kbd> close</span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.demo {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		width: min(420px, 100%);
		padding: 0.7rem 0.75rem 0.7rem 0.85rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		color: var(--color-subtle);
		box-shadow: var(--shadow-subtle);
		transition:
			border-color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.trigger:hover {
		border-color: color-mix(in srgb, var(--lab-accent) 50%, transparent);
		transform: translateY(-1px);
	}

	.trigger .material-symbols-rounded {
		font-size: 1.15rem;
		color: var(--lab-accent);
	}

	.trigger-label {
		flex: 1;
		text-align: left;
		font-size: 0.92rem;
	}

	kbd {
		font-family: var(--lab-mono);
		font-size: 0.65rem;
		padding: 0.16rem 0.38rem;
		border: 1px solid var(--lab-hairline);
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		background: var(--color-muted);
		color: var(--color-subtle);
	}

	.caption {
		margin: 0;
		max-width: 56ch;
		font-size: 0.85rem;
		color: var(--color-subtle);
	}

	.caption code {
		font-family: var(--lab-mono);
		font-size: 0.85em;
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--color-ink) 8%, transparent);
	}

	.scrim-close {
		position: absolute;
		inset: 0;
		border: none;
		background: none;
		cursor: default;
	}

	.scrim {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		align-items: start;
		justify-items: center;
		padding: clamp(1rem, 12vh, 8rem) 1rem 1rem;
		background: color-mix(in srgb, var(--color-ink) 42%, transparent);
		backdrop-filter: blur(6px);
		animation: fade 160ms ease;
	}

	.palette {
		position: relative;
		display: grid;
		width: min(560px, 100%);
		max-height: min(60vh, 520px);
		grid-template-rows: auto 1fr auto;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: 0 30px 80px rgb(0 0 0 / 0.28);
		overflow: hidden;
		animation: pop 180ms cubic-bezier(0.2, 0.9, 0.3, 1.2);
	}

	.field {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.85rem 0.9rem;
		border-bottom: 1px solid var(--lab-hairline);
	}

	.field .material-symbols-rounded {
		color: var(--lab-accent);
	}

	.field input {
		flex: 1;
		min-width: 0;
		border: none;
		background: none;
		outline: none;
		font-size: 1rem;
	}

	.list {
		overflow-y: auto;
		padding: 0.4rem;
	}

	.group {
		margin: 0.6rem 0 0.3rem 0.6rem;
		font-size: 0.58rem;
		color: var(--color-subtle);
		opacity: 0.75;
	}

	.row {
		display: grid;
		grid-template-columns: 1.25rem minmax(0, auto) minmax(0, 1fr) 1rem;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		padding: 0.55rem 0.6rem;
		border: none;
		border-radius: var(--radius-md);
		background: none;
		text-align: left;
		color: var(--color-ink);
	}

	.row.active {
		background: color-mix(in srgb, var(--lab-accent) 13%, transparent);
	}

	.row-icon {
		font-size: 1.1rem;
		color: var(--color-subtle);
	}

	.row.active .row-icon {
		color: var(--lab-accent);
	}

	.row-label {
		font-size: 0.94rem;
		font-weight: 500;
		color: var(--color-heading);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row-label mark {
		background: none;
		color: var(--lab-accent);
		font-weight: 700;
	}

	.row-hint {
		font-size: 0.76rem;
		color: var(--color-subtle);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row-go {
		font-size: 0.9rem;
		color: var(--color-subtle);
		opacity: 0;
	}

	.row.active .row-go {
		opacity: 0.8;
	}

	.empty {
		margin: 1.5rem 0.6rem;
		font-size: 0.9rem;
		color: var(--color-subtle);
	}

	.foot {
		display: flex;
		gap: 1rem;
		padding: 0.6rem 0.85rem;
		border-top: 1px solid var(--lab-hairline);
		background: var(--color-muted);
		font-size: 0.58rem;
		color: var(--color-subtle);
	}

	.foot span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(-10px) scale(0.98);
		}
	}

	@media (max-width: 560px) {
		.row {
			grid-template-columns: 1.25rem minmax(0, 1fr) 1rem;
		}

		.row-hint {
			display: none;
		}
	}
</style>
