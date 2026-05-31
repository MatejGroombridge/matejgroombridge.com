type RevealOptions = {
	delay?: number;
	threshold?: number;
	distance?: number;
	once?: boolean;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const apply = (opts: RevealOptions) => {
		const { delay = 0, distance } = opts;
		node.dataset.reveal = '';
		if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);
		if (distance != null) node.style.setProperty('--reveal-distance', `${distance}px`);
	};

	apply(options);

	const prefersReducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		node.dataset.revealed = 'true';
		return {
			update(next: RevealOptions = {}) {
				apply(next);
				node.dataset.revealed = 'true';
			}
		};
	}

	const threshold = options.threshold ?? 0;
	const once = options.once ?? true;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dataset.revealed = 'true';
					if (once) observer.unobserve(node);
				} else if (!once) {
					delete node.dataset.revealed;
				}
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		update(next: RevealOptions = {}) {
			apply(next);
		},
		destroy() {
			observer.disconnect();
		}
	};
}
