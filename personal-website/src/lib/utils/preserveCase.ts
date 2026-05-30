import { properNouns } from '$lib/content/proper-nouns';

const SKIP_TAGS = new Set([
	'SCRIPT',
	'STYLE',
	'NOSCRIPT',
	'CODE',
	'PRE',
	'KBD',
	'SAMP',
	'TEXTAREA',
	'INPUT'
]);

function escapeRegex(value: string): string {
	return value.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

// Sort longest-first so multi-word entries win over their substrings.
const sortedNouns = [...properNouns].sort((a, b) => b.length - a.length);

// Build a single big alternation. Use lookbehind / lookahead instead of \b
// so that entries containing non-word chars (e.g. "C.S. Lewis", "Snowy Mtns.",
// "$100 Million Leads") still match cleanly at word edges.
const NOUN_REGEX = new RegExp(
	`(?<![A-Za-z])(?:${sortedNouns.map(escapeRegex).join('|')})(?![A-Za-z])`,
	'g'
);

function shouldSkipElement(el: Element): boolean {
	if (SKIP_TAGS.has(el.tagName)) return true;
	if (el.hasAttribute('data-preserve-case')) return true;
	if (el.classList.contains('material-symbols-rounded')) return true;
	return false;
}

function wrapTextNode(node: Text): void {
	const text = node.nodeValue;
	if (!text || !text.trim()) return;

	NOUN_REGEX.lastIndex = 0;
	if (!NOUN_REGEX.test(text)) return;

	NOUN_REGEX.lastIndex = 0;
	const fragment = document.createDocumentFragment();
	let cursor = 0;
	let match: RegExpExecArray | null;
	while ((match = NOUN_REGEX.exec(text)) !== null) {
		const start = match.index;
		const end = start + match[0].length;
		if (start > cursor) {
			fragment.appendChild(document.createTextNode(text.slice(cursor, start)));
		}
		const span = document.createElement('span');
		span.setAttribute('data-preserve-case', '');
		span.textContent = match[0];
		fragment.appendChild(span);
		cursor = end;
	}
	if (cursor < text.length) {
		fragment.appendChild(document.createTextNode(text.slice(cursor)));
	}
	node.parentNode?.replaceChild(fragment, node);
}

function walk(root: Node): void {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode(node) {
			const parent = node.parentElement;
			if (!parent) return NodeFilter.FILTER_REJECT;
			// Walk up checking for any ancestor that should be skipped.
			for (let el: Element | null = parent; el; el = el.parentElement) {
				if (shouldSkipElement(el)) return NodeFilter.FILTER_REJECT;
			}
			return NodeFilter.FILTER_ACCEPT;
		}
	});

	const textNodes: Text[] = [];
	let current: Node | null = walker.nextNode();
	while (current) {
		textNodes.push(current as Text);
		current = walker.nextNode();
	}
	for (const textNode of textNodes) {
		wrapTextNode(textNode);
	}
}

let observer: MutationObserver | null = null;
let scheduled = false;
let pendingTargets: Set<Node> = new Set();

function flush(): void {
	scheduled = false;
	const targets = pendingTargets;
	pendingTargets = new Set();
	for (const target of targets) {
		if (target.isConnected) walk(target);
	}
}

function schedule(target: Node): void {
	pendingTargets.add(target);
	if (scheduled) return;
	scheduled = true;
	if (typeof queueMicrotask === 'function') {
		queueMicrotask(flush);
	} else {
		Promise.resolve().then(flush);
	}
}

export function installPreserveCase(root: HTMLElement = document.body): void {
	if (typeof window === 'undefined') return;

	walk(root);

	observer?.disconnect();
	observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				for (const node of mutation.addedNodes) {
					if (node.nodeType === Node.TEXT_NODE) {
						const parent = (node as Text).parentElement;
						if (parent) schedule(parent);
					} else if (node.nodeType === Node.ELEMENT_NODE) {
						schedule(node);
					}
				}
			} else if (mutation.type === 'characterData') {
				const parent = (mutation.target as Text).parentElement;
				if (parent) schedule(parent);
			}
		}
	});
	observer.observe(root, {
		childList: true,
		characterData: true,
		subtree: true
	});
}

export function uninstallPreserveCase(): void {
	observer?.disconnect();
	observer = null;
}
