<script lang="ts">
	import type { Project } from '$lib/content/year2026';

	type Props = {
		project: Project | undefined;
		onclose: () => void;
	};

	let { project, onclose }: Props = $props();

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if project}
	<div
		class="backdrop"
		role="presentation"
		onclick={onclose}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') onclose();
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
			<button class="close" type="button" aria-label="Close" onclick={onclose}>
				<span class="material-symbols-rounded" aria-hidden="true">close</span>
			</button>
			<div class="modal-head">
				<span class="modal-icon" aria-hidden="true">
					<span class="material-symbols-rounded">{project.icon ?? 'bolt'}</span>
				</span>
				<div class="modal-title">
					<h3 id="project-modal-title">{project.title}</h3>
					<span class="period">{project.period}</span>
				</div>
			</div>
			<p class="modal-desc">{project.description}</p>
			{#if project.tech?.length}
				<div class="modal-block">
					<span class="modal-label">Tech</span>
					<ul class="tech">
						{#each project.tech as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if project.href || project.repo}
				<div class="modal-actions">
					{#if project.href}
						<a class="action primary" href={project.href}>
							<span class="material-symbols-rounded" aria-hidden="true">north_east</span>
							Visit
						</a>
					{/if}
					{#if project.repo}
						<a class="action" href={project.repo} target="_blank" rel="noreferrer noopener">
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
</style>
