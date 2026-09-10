<!--
	Reader controls for an article: reading mode, contents, and version history.

	Reading mode and version reuse `SortMenu`, so they are literally the same
	control the book notes and photography pages sort with — same type, same
	menu, same behaviour. Contents is a plain toggle wearing the same trigger
	styling.

	Every control is optional and hides itself when the article has nothing to
	offer — an article with no abridged copy shows no mode menu, one with no
	earlier versions shows no version menu. That keeps a plain article's toolbar
	down to whatever it actually earns.
-->
<script lang="ts">
	import SortMenu from './SortMenu.svelte';
	import type { SortOption } from './SortMenu.svelte';
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

	// Reading mode and the contents list describe the live article. An archived
	// copy has neither, so those controls go away rather than sit there inert.
	const showModeSwitch = $derived(hasAbridged && !archived);
	const hasContents = $derived(sections.length > 0 && !archived);
	const hasVersions = $derived(versions.length > 0);

	const modeOptions: SortOption[] = [
		{ value: 'full', label: 'Full article' },
		{ value: 'abridged', label: 'Abridged' }
	];

	// The trigger carries the current mode, because unlike sorting there is no
	// other cue on the page telling you which copy you are reading.
	const modeLabel = $derived(mode === 'abridged' ? 'Abridged' : 'Full article');

	const versionOptions = $derived<SortOption[]>([
		{ value: 'current', label: currentDate },
		...versions.map((version) => ({ value: version.id, label: version.modified }))
	]);
</script>

<div class="toolbar">
	{#if showModeSwitch}
		<SortMenu
			label={modeLabel}
			align="start"
			options={modeOptions}
			value={mode}
			onChange={(value) => onmode(value === 'abridged' ? 'abridged' : 'full')}
		/>
	{/if}

	<div class="spacer"></div>

	{#if hasContents}
		<button
			type="button"
			class="trigger"
			class:active={showContents}
			aria-expanded={showContents}
			aria-controls="article-contents"
			onclick={oncontents}
		>
			Contents
		</button>
	{/if}

	{#if hasVersions}
		<SortMenu
			label="Version"
			options={versionOptions}
			value={versionId ?? 'current'}
			onChange={(value) => onversion(value === 'current' ? null : value)}
		/>
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

	// Matches SortMenu's trigger, so the toggle sits level with the two menus.
	.trigger {
		display: inline-flex;
		align-items: center;
		background: transparent;
		border: none;
		padding: 0.1rem 0.15rem;
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-subtle);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: color 0.15s ease;
	}

	.trigger:hover,
	.trigger:focus-visible {
		color: var(--color-heading);
		outline: none;
	}

	.trigger.active {
		color: var(--color-green);
	}

	@media (max-width: 640px) {
		// Two clean rows — reading mode, then the rest — rather than letting the
		// controls wrap mid-cluster.
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
		}
	}
</style>
