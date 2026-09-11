<!--
	Reader controls for an article: contents on the left, version history on the
	right.

	The version menu carries reading mode too — Full article / Abridged sit above
	the dated versions, separated by a rule. They are independent choices, so the
	menu renders them as two `SortMenu` groups rather than one flat list: you can
	be reading the abridged current copy, or an archived one, and the menu shows
	both facts at once.

	Every control is optional and hides itself when the article has nothing to
	offer, so a plain article's toolbar shows only what it actually earns.
-->
<script lang="ts">
	import SortMenu from './SortMenu.svelte';
	import type { SortGroup, SortOption } from './SortMenu.svelte';
	import type { ArticleSection, ArticleVersion } from '$lib/content/types';

	type Props = {
		sections?: ArticleSection[];
		versions?: ArticleVersion[];
		hasAbridged: boolean;
		mode: 'full' | 'abridged';
		showContents: boolean;
		versionId: string | null;
		/** Date of the live article, listed alongside the archived ones. */
		currentDate: string;
		/** True while an archived version is open, which suppresses live-only controls. */
		archived?: boolean;
		onmode: (mode: 'full' | 'abridged') => void;
		oncontents: () => void;
		onversion: (id: string | null) => void;
	};

	let {
		sections = [],
		versions = [],
		hasAbridged,
		mode,
		showContents,
		versionId,
		currentDate,
		archived = false,
		onmode,
		oncontents,
		onversion
	}: Props = $props();

	// The contents list describes the live article. An archived copy is a
	// snapshot with its own headings, so the toggle goes rather than sit inert.
	const hasContents = $derived(sections.length > 0 && !archived);
	const hasMenu = $derived(hasAbridged || versions.length > 0);

	const modeOptions: SortOption[] = [
		{ value: 'full', label: 'full article' },
		{ value: 'abridged', label: 'abridged' }
	];

	const menuGroups = $derived.by(() => {
		const groups: SortGroup[] = [];

		if (hasAbridged) {
			groups.push({
				// Reading an archive means neither mode is current, so nothing is marked.
				value: archived ? '' : mode,
				options: modeOptions,
				onChange: (value) => onmode(value === 'abridged' ? 'abridged' : 'full')
			});
		}

		if (versions.length > 0) {
			groups.push({
				value: versionId ?? 'current',
				options: [
					{ value: 'current', label: currentDate },
					...versions.map((version) => ({ value: version.id, label: version.modified }))
				],
				onChange: (value) => onversion(value === 'current' ? null : value)
			});
		}

		return groups;
	});
</script>

<div class="toolbar">
	{#if hasContents}
		<button
			type="button"
			class="trigger"
			class:active={showContents}
			aria-expanded={showContents}
			aria-controls="article-contents"
			onclick={oncontents}
		>
			<span class="icon material-symbols-rounded" aria-hidden="true">segment</span>
			<span class="label">Contents</span>
		</button>
	{/if}

	<div class="spacer"></div>

	{#if hasMenu}
		<SortMenu label="Version" groups={menuGroups} />
	{/if}
</div>

<style lang="scss">
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.5rem;
	}

	.spacer {
		flex: 1 1 auto;
	}

	// Matches SortMenu's trigger, so the toggle sits level with the menu opposite.
	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: transparent;
		border: none;
		padding: 0.1rem 0.15rem;
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		// Body ink rather than SortMenu's grey: against the article these are
		// controls the reader is meant to reach for, not secondary chrome.
		color: var(--color-ink);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: color 0.15s ease;
	}

	.toolbar :global(.sort-menu .trigger) {
		color: var(--color-ink);
	}

	.toolbar :global(.sort-menu .trigger:hover),
	.toolbar :global(.sort-menu .trigger:focus-visible) {
		color: var(--color-heading);
	}

	.trigger:hover,
	.trigger:focus-visible {
		color: var(--color-heading);
		outline: none;
	}

	.trigger.active {
		color: var(--color-green);
	}

	// Sized against the small-caps label rather than the 1.1rem the chevron uses,
	// which left it looming over the word next to it.
	.icon {
		font-size: 0.95rem;
		line-height: 1;
		font-variation-settings: 'opsz' 20;
	}

	.label {
		line-height: 1;
	}

	@media (max-width: 640px) {
		.toolbar {
			justify-content: center;
			column-gap: 1.5rem;
			row-gap: 0.5rem;
		}

		.spacer {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.trigger {
			font-size: 0.72rem;
			letter-spacing: 0.16em;
			gap: 0.2rem;
		}

		.icon {
			font-size: 0.9rem;
		}
	}
</style>
