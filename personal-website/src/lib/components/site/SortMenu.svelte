<script lang="ts">
	export type SortOption = {
		value: string;
		label: string;
	};

	type Props = {
		options: SortOption[];
		value: string;
		onChange: (value: string) => void;
	};

	let { options, value, onChange }: Props = $props();

	let open = $state(false);
	let menuEl = $state<HTMLDivElement | null>(null);
	let buttonEl = $state<HTMLButtonElement | null>(null);

	function toggle() {
		open = !open;
	}

	function select(next: string) {
		onChange(next);
		open = false;
		buttonEl?.focus();
	}

	function onDocumentClick(event: MouseEvent) {
		if (!open) return;
		const target = event.target as Node;
		if (menuEl?.contains(target) || buttonEl?.contains(target)) return;
		open = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
			buttonEl?.focus();
		}
	}
</script>

<svelte:window onclick={onDocumentClick} onkeydown={onKeydown} />

<div class="sort-menu">
	<button
		bind:this={buttonEl}
		type="button"
		class="trigger"
		aria-haspopup="listbox"
		aria-expanded={open}
		onclick={toggle}
	>
		<span class="chevron material-symbols-rounded" class:open aria-hidden="true">
			expand_more
		</span>
		<span class="label">Sort</span>
	</button>
	{#if open}
		<div bind:this={menuEl} class="menu" role="listbox" tabindex="-1">
			{#each options as option (option.value)}
				<button
					type="button"
					class="option"
					class:selected={option.value === value}
					role="option"
					aria-selected={option.value === value}
					onclick={() => select(option.value)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.sort-menu {
		position: relative;
		display: inline-flex;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: transparent;
		border: none;
		padding: 0.1rem 0.15rem;
		margin: 0;
		font-family: var(--font-heading);
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

	.chevron {
		font-size: 1.1rem;
		line-height: 1;
		transition: transform 0.2s ease;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.label {
		line-height: 1;
	}

	.menu {
		position: absolute;
		top: calc(100% + 0.4rem);
		right: 0;
		z-index: 20;
		min-width: 11rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-soft);
		padding: 0.35rem;
		display: flex;
		flex-direction: column;
	}

	.option {
		background: transparent;
		border: none;
		text-align: left;
		padding: 0.5rem 0.65rem;
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--color-ink);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background-color 0.12s ease;
	}

	.option:hover,
	.option:focus-visible {
		background: var(--color-muted);
		outline: none;
	}

	.option.selected {
		color: var(--color-green);
		font-weight: 600;
	}

	@media (max-width: 480px) {
		.trigger {
			font-size: 0.72rem;
			letter-spacing: 0.16em;
			gap: 0.2rem;
		}

		.chevron {
			font-size: 1rem;
		}

		.menu {
			min-width: 10rem;
		}
	}
</style>
