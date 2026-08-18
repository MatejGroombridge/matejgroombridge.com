/**
 * Chrome on this page is previewed inside a scrolling box, not the page itself,
 * so anything that reacts to scrolling has to listen to whichever ancestor is
 * actually doing the scrolling. Falls back to the window when the component is
 * dropped into a real page, which is where it would eventually live.
 */
export function scrollHost(node: HTMLElement): HTMLElement | Window {
	let parent = node.parentElement;
	while (parent) {
		const overflowY = getComputedStyle(parent).overflowY;
		if (overflowY === 'auto' || overflowY === 'scroll') return parent;
		parent = parent.parentElement;
	}
	return window;
}

/** Current scroll offset of either a scrolling element or the window. */
export function scrollTopOf(host: HTMLElement | Window): number {
	return host instanceof Window ? host.scrollY : host.scrollTop;
}

/**
 * Subscribes to scroll on `host` and calls `onScroll` at most once per frame
 * with the current offset and the delta since the previous frame.
 */
export function onFrameScroll(
	host: HTMLElement | Window,
	onScroll: (top: number, delta: number) => void
) {
	let raf = 0;
	let last = scrollTopOf(host);

	const tick = () => {
		raf = 0;
		const top = scrollTopOf(host);
		onScroll(top, top - last);
		last = top;
	};

	const handler = () => {
		if (!raf) raf = requestAnimationFrame(tick);
	};

	host.addEventListener('scroll', handler, { passive: true });
	onScroll(last, 0);

	return () => {
		host.removeEventListener('scroll', handler);
		if (raf) cancelAnimationFrame(raf);
	};
}
