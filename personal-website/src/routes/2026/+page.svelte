<script lang="ts">
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { Project } from '$lib/content/year2026';
	import { year2026Focus, year2026Page, year2026Projects, year2026Timeline } from '$lib/content';

	let activeProject = $state<Project | undefined>();

	function openProject(project: Project) {
		activeProject = project;
	}

	function closeProject() {
		activeProject = undefined;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeProject();
	}

	const lastUpdated = year2026Timeline[0]?.date
		? new Date(year2026Timeline[0].date).toLocaleDateString('en-AU', {
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
	helper={lastUpdated ? `Last updated ${lastUpdated}.` : undefined}
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

<Section id="focus">
	<BlockHead title="What I'm focused on" />
	<ul class="focus">
		{#each year2026Focus as item, i}
			<li>
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<span>{item}</span>
			</li>
		{/each}
	</ul>
</Section>

<Section id="updates">
	<BlockHead title="Updates" />
	<ol class="updates">
		{#each year2026Timeline as event}
			<li>
				<span class="when">{formatUpdateDate(event.date)}</span>
				<div class="what">
					<div class="what-head">
						<h3>{event.title}</h3>
						{#if event.tag}
							<Tag label={event.tag} variant="surface" />
						{/if}
					</div>
					<p>{event.body}</p>
					{#if event.link}
						<a class="more" href={event.link.href}>
							{event.link.label}
							<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</Section>

<svelte:window onkeydown={onKeydown} />

{#if activeProject}
	<div
		class="backdrop"
		role="presentation"
		onclick={closeProject}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') closeProject();
		}}
	>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-modal-title"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<button class="close" type="button" aria-label="Close" onclick={closeProject}>
				<span class="material-symbols-rounded" aria-hidden="true">close</span>
			</button>
			<div class="modal-head">
				<span class="modal-icon" aria-hidden="true">
					<span class="material-symbols-rounded">{activeProject.icon ?? 'bolt'}</span>
				</span>
				<div class="modal-title">
					<h3 id="project-modal-title">{activeProject.title}</h3>
					<span class="period">{activeProject.period}</span>
				</div>
			</div>
			<p class="modal-desc">{activeProject.description}</p>
			{#if activeProject.tech?.length}
				<div class="modal-block">
					<span class="modal-label">Tech</span>
					<ul class="tech">
						{#each activeProject.tech as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if activeProject.href || activeProject.repo}
				<div class="modal-actions">
					{#if activeProject.href}
						<a class="action primary" href={activeProject.href}>
							<span class="material-symbols-rounded" aria-hidden="true">north_east</span>
							Visit
						</a>
					{/if}
					{#if activeProject.repo}
						<a
							class="action"
							href={activeProject.repo}
							target="_blank"
							rel="noreferrer noopener"
						>
							<span class="material-symbols-rounded" aria-hidden="true">code</span>
							Source
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

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
		padding: 0.95rem 0;
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
		padding-top: 0.25rem;
	}

	.what {
		display: grid;
		gap: 0.35rem;
		min-width: 0;
	}

	.what-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.what-head h3 {
		margin: 0;
		font-size: 1rem;
	}

	.what p {
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-subtle);
	}

	.more {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		justify-self: start;
		margin-top: 0.15rem;
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-green);
		text-decoration: none;
	}

	.more .material-symbols-rounded {
		font-size: 0.95rem;
		transition: transform var(--duration-fast) ease;
	}

	.more:hover .material-symbols-rounded {
		transform: translateX(3px);
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: rgb(12 16 14 / 0.6);
		backdrop-filter: blur(4px);
		animation: fade-in 160ms ease;
	}

	.modal {
		position: relative;
		display: grid;
		gap: 0.9rem;
		width: 100%;
		max-width: 28rem;
		padding: clamp(1.25rem, 2.5vw, 1.6rem);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-soft);
		text-align: left;
		animation: pop-in 200ms cubic-bezier(0.2, 0.9, 0.2, 1);
	}

	.close {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-cream);
		color: var(--color-ink);
		cursor: pointer;
	}

	.close:hover,
	.close:focus-visible {
		background: var(--color-muted);
		color: var(--color-green);
		outline: none;
	}

	.close .material-symbols-rounded {
		font-size: 1.05rem;
	}

	.modal-head {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: 0.75rem;
		padding-right: 2rem;
	}

	.modal-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-green) 14%, transparent);
		color: var(--color-green);
		border: 1px solid color-mix(in srgb, var(--color-green) 30%, transparent);
	}

	.modal-icon .material-symbols-rounded {
		font-size: 1.55rem;
	}

	.modal-title {
		display: grid;
		gap: 0.15rem;
		min-width: 0;
	}

	.modal-title h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.period {
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.modal-desc {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-ink);
		margin: 0;
	}

	.modal-block {
		display: grid;
		gap: 0.4rem;
	}

	.modal-label {
		font-family: var(--font-heading);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-subtle);
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.tech li {
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-ink);
		background: var(--color-muted);
		border-radius: 999px;
		padding: 0.22rem 0.6rem;
	}

	.modal-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.action {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		font-family: var(--font-heading);
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-ink);
		background: var(--color-cream);
		text-decoration: none;
		transition:
			background var(--duration-fast) ease,
			color var(--duration-fast) ease,
			border-color var(--duration-fast) ease;
	}

	.action .material-symbols-rounded {
		font-size: 1rem;
	}

	.action:hover,
	.action:focus-visible {
		border-color: var(--color-green);
		color: var(--color-green);
		background: var(--color-muted);
		outline: none;
	}

	.action.primary {
		background: var(--color-green);
		color: var(--color-cream);
		border-color: var(--color-green);
	}

	.action.primary:hover,
	.action.primary:focus-visible {
		background: var(--color-green-soft);
		border-color: var(--color-green-soft);
		color: var(--color-cream);
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 640px) {
		.project {
			text-align: left;
		}

		.focus li {
			text-align: left;
		}

		.updates li {
			grid-template-columns: 1fr;
			gap: 0.35rem;
			text-align: left;
		}

		.what-head {
			justify-content: flex-start;
		}
	}
</style>
