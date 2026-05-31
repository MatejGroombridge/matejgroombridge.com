<script lang="ts">
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import ProjectModal from '$lib/components/site/ProjectModal.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import type { Project } from '$lib/content/year2026';
	import { year2026Page, year2026Projects, year2026Timeline } from '$lib/content';

	let activeProject = $state<Project | undefined>();

	function openProject(project: Project) {
		activeProject = project;
	}

	function closeProject() {
		activeProject = undefined;
	}

	const sortedTimeline = [...year2026Timeline].sort((a, b) => b.date.localeCompare(a.date));

	const lastUpdated = sortedTimeline[0]?.date
		? new Date(sortedTimeline[0].date).toLocaleDateString('en-AU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		: '';

	function formatUpdateDate(date: string): string {
		const d = new Date(date);
		const month = d.toLocaleDateString('en-AU', { month: 'short' }).toLowerCase();
		const day = String(d.getUTCDate()).padStart(2, '0');
		return `${month} ${day}`;
	}
</script>

<Seo {...year2026Page.seo} canonical="/2026" />

<PageTitle
	eyebrow={year2026Page.hero.eyebrow ?? '2026'}
	title={year2026Page.hero.title}
	body={year2026Page.hero.body}
	helper={lastUpdated ? `Last updated ${lastUpdated}` : undefined}
/>

<Section id="projects">
	<BlockHead title="Projects" />
	<ul class="project-grid">
		{#each year2026Projects as project}
			<li>
				<button type="button" class="project" onclick={() => openProject(project)}>
					<span class="project-icon" aria-hidden="true">
						<span class="material-symbols-rounded">{project.icon ?? 'bolt'}</span>
					</span>
					<div class="project-body">
						<h3>{project.title}</h3>
						<p>{project.description}</p>
					</div>
				</button>
			</li>
		{/each}
	</ul>
</Section>

<!-- <Section id="focus">
	<BlockHead title="What I'm focused on" />
	<ul class="focus">
		{#each year2026Focus as item, i}
			<li>
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<span>{item}</span>
			</li>
		{/each}
	</ul>
</Section> -->

<Section id="updates">
	<BlockHead title="Updates" />
	<ol class="updates">
		{#each sortedTimeline as event}
			<li>
				<span class="when">{formatUpdateDate(event.date)}</span>
				{#if event.href}
					<a class="what" href={event.href}>{event.title}</a>
				{:else}
					<span class="what">{event.title}</span>
				{/if}
			</li>
		{/each}
	</ol>
</Section>

<ProjectModal project={activeProject} onclose={closeProject} />

<style lang="scss">
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 0.75rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.project {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.85rem;
		align-items: start;
		width: 100%;
		padding: 0.95rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		text-align: left;
		text-decoration: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		transition:
			background var(--duration-fast) ease,
			border-color var(--duration-fast) ease,
			transform var(--duration-fast) ease;
	}

	.project:hover,
	.project:focus-visible {
		background: var(--color-muted);
		border-color: var(--color-line);
		transform: translateY(-1px);
		outline: none;
	}

	.project-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.6rem;
		height: 2.6rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-green) 14%, transparent);
		color: var(--color-green);
		border: 1px solid color-mix(in srgb, var(--color-green) 30%, transparent);
	}

	.project-icon .material-symbols-rounded {
		font-size: 1.35rem;
	}

	.project-body {
		display: grid;
		gap: 0.3rem;
		min-width: 0;
	}

	.project-body h3 {
		margin: 0;
		font-size: 1rem;
	}

	.project-body p {
		font-size: 0.88rem;
		line-height: 1.5;
		color: var(--color-subtle);
	}

	.focus {
		display: grid;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.focus li {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.55rem 0;
		font-size: 0.95rem;
		color: var(--color-ink);
	}

	.focus li + li {
		border-top: 1px dashed var(--color-border);
	}

	.num {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		color: var(--color-green);
	}

	.updates {
		display: grid;
		gap: 0;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.updates li {
		display: grid;
		grid-template-columns: 4.25rem minmax(0, 1fr);
		gap: 1rem;
		align-items: baseline;
		padding: 0.75rem 0;
		border-bottom: 1px dashed var(--color-border);
	}

	.updates li:last-child {
		border-bottom: none;
	}

	.when {
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: lowercase;
		color: var(--color-subtle);
	}

	.what {
		min-width: 0;
		font-size: 1rem;
		color: var(--color-subtle);
	}

	a.what {
		color: var(--color-heading);
		text-decoration: none;
		transition: color var(--duration-fast) ease;
	}

	a.what:hover,
	a.what:focus-visible {
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.project {
			text-align: left;
		}

		.updates li {
			grid-template-columns: 1fr;
			gap: 0.25rem;
			text-align: left;
		}
	}
</style>
