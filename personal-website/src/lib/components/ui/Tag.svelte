<script lang="ts">
	type Props = {
		label: string;
		variant?: 'muted' | 'surface';
	};

	let { label, variant = 'muted' }: Props = $props();
</script>

<span class="tag {variant}">{label}</span>

<style lang="scss">
	.tag {
		display: inline-flex;
		align-items: center;
		width: max-content;
		border-radius: 999px;
		background: var(--color-muted);
		color: var(--color-green);
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.075em;
		padding: 0.28rem 0.55rem;
		text-transform: uppercase;
	}

	.surface {
		background: var(--color-surface);
	}

	@media (max-width: 640px) {
		.tag {
			margin-inline: auto;
		}
	}
</style>
