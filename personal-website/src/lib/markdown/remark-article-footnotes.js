/**
 * GFM-style footnotes for mdsvex article bodies.
 *
 * mdsvex bundles remark 8, so `remark-gfm` cannot run against it — every
 * published version of that plugin targets remark 13 or newer and silently
 * leaves `[^1]` as literal text. This implements just the footnote subset we
 * need, against the AST mdsvex actually gives us.
 *
 * Authoring stays standard:
 *
 *   a claim worth sourcing.[^1]
 *
 *   [^1]: the supporting note, at the bottom of the same file.
 *
 * remark parses `[^1]` as a shortcut `linkReference` with the identifier
 * `^1` — it never reaches us as text — so both halves are matched on that node
 * rather than by scanning strings. A reference is only converted when a
 * matching definition exists, so a typo shows up as a visible `[^2]` in the
 * page rather than a dangling link.
 */

/**
 * The slice of mdast this plugin touches.
 *
 * @typedef {object} MdastNode
 * @property {string} type
 * @property {string} [value]
 * @property {string} [url]
 * @property {string} [identifier]
 * @property {MdastNode[]} [children]
 */

/**
 * @typedef {object} FootnoteDefinition
 * @property {string} id
 * @property {MdastNode[]} children
 */

/**
 * Escapes for HTML, plus the braces Svelte would otherwise read as an
 * expression once mdsvex hands the markup to the compiler.
 *
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml(value) {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;');
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function escapeAttribute(value) {
	return escapeHtml(value).replace(/"/g, '&quot;');
}

/**
 * The id of a `[^id]` reference, which remark hands us as a shortcut link
 * reference, or `null` for any other node.
 *
 * @param {MdastNode | undefined} node
 * @returns {string | null}
 */
function footnoteId(node) {
	if (!node || node.type !== 'linkReference') return null;
	const identifier = node.identifier ?? '';
	return identifier.startsWith('^') ? identifier.slice(1) : null;
}

/**
 * Serialises the inline nodes of a footnote definition back to HTML.
 *
 * @param {MdastNode[]} [nodes]
 * @returns {string}
 */
function inlineToHtml(nodes = []) {
	/** @type {string[]} */
	const out = [];

	for (const node of nodes) {
		switch (node.type) {
			case 'text':
				out.push(escapeHtml(node.value));
				break;
			case 'emphasis':
				out.push(`<em>${inlineToHtml(node.children)}</em>`);
				break;
			case 'strong':
				out.push(`<strong>${inlineToHtml(node.children)}</strong>`);
				break;
			case 'delete':
				out.push(`<del>${inlineToHtml(node.children)}</del>`);
				break;
			case 'inlineCode':
				out.push(`<code>${escapeHtml(node.value)}</code>`);
				break;
			case 'break':
				out.push('<br />');
				break;
			case 'link':
				out.push(`<a href="${escapeAttribute(node.url)}">${inlineToHtml(node.children)}</a>`);
				break;
			case 'html':
				out.push(node.value ?? '');
				break;
			default:
				out.push(node.children ? inlineToHtml(node.children) : escapeHtml(node.value));
		}
	}

	return out.join('');
}

/**
 * Depth-first walk that hands each node to `visitor` along with its parent.
 *
 * @param {MdastNode} node
 * @param {(node: MdastNode, parent: MdastNode | null) => void} visitor
 * @param {MdastNode | null} [parent]
 * @returns {void}
 */
function walk(node, visitor, parent = null) {
	visitor(node, parent);
	if (!node.children) return;
	for (const child of [...node.children]) walk(child, visitor, node);
}

/** @returns {(tree: MdastNode) => void} */
export function remarkArticleFootnotes() {
	return function transformer(tree) {
		/** @type {FootnoteDefinition[]} */
		const definitions = [];
		/** @type {Map<MdastNode, Set<MdastNode>>} */
		const removals = new Map();

		// 1. Pull `[^id]: …` paragraphs out of the body. They arrive as a
		//    reference node followed by text that opens with the colon.
		walk(tree, (node, parent) => {
			if (node.type !== 'paragraph' || !parent || !node.children) return;

			const [reference, next, ...rest] = node.children;
			const id = footnoteId(reference);
			if (!id || next?.type !== 'text' || !next.value?.startsWith(':')) return;

			definitions.push({
				id,
				children: [{ ...next, value: next.value.replace(/^:[ \t]*/, '') }, ...rest]
			});

			const existing = removals.get(parent);
			if (existing) existing.add(node);
			else removals.set(parent, new Set([node]));
		});

		if (definitions.length === 0) return;

		for (const [parent, nodes] of removals) {
			if (!parent.children) continue;
			parent.children = parent.children.filter((child) => !nodes.has(child));
		}

		const known = new Set(definitions.map((definition) => definition.id));

		// 2. Turn each surviving `[^id]` into a superscript link.
		walk(tree, (node, parent) => {
			if (!parent?.children) return;
			const id = footnoteId(node);
			if (!id || !known.has(id)) return;

			const index = parent.children.indexOf(node);
			if (index === -1) return;

			parent.children.splice(index, 1, {
				type: 'html',
				value:
					`<sup class="fn-ref" id="fnref-${escapeAttribute(id)}">` +
					`<a href="#fn-${escapeAttribute(id)}" aria-label="Footnote ${escapeAttribute(id)}">` +
					`${escapeHtml(id)}</a></sup>`
			});
		});

		// 3. Append the notes list.
		const items = definitions
			.map(
				({ id, children }) =>
					`<li class="fn-item" id="fn-${escapeAttribute(id)}">` +
					`<div class="fn-body">${inlineToHtml(children)}` +
					`<a class="fn-back" href="#fnref-${escapeAttribute(id)}" ` +
					`aria-label="Back to reference ${escapeAttribute(id)}">&#8617;</a>` +
					`</div></li>`
			)
			.join('');

		tree.children ??= [];
		tree.children.push({
			type: 'html',
			value: `<section class="footnotes" aria-label="Notes"><ol>${items}</ol></section>`
		});
	};
}

export default remarkArticleFootnotes;
