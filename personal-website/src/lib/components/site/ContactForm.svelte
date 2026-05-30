<script lang="ts">
	import type { FormDefinition } from '$lib/content/types';
	import Button from '$lib/components/ui/Button.svelte';

	type Props = {
		definition: FormDefinition;
	};

	let { definition }: Props = $props();
</script>

<form
	class="form"
	name={definition.name}
	method="POST"
	data-netlify="true"
	data-netlify-honeypot="bot-field"
>
	<input type="hidden" name="form-name" value={definition.name} />
	<input type="hidden" name="subject" value={definition.subject} />
	<p class="hidden">
		<label>Do not fill this out <input name="bot-field" /></label>
	</p>
	{#each definition.fields as field}
		<label>
			<span>{field.label}</span>
			{#if field.type === 'textarea'}
				<textarea
					name={field.name}
					required={field.required}
					placeholder={field.placeholder}
					rows="6"
				></textarea>
			{:else if field.type === 'select'}
				<select name={field.name} required={field.required}>
					{#each field.options ?? [] as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			{:else}
				<input
					name={field.name}
					type={field.type}
					required={field.required}
					placeholder={field.placeholder}
				/>
			{/if}
		</label>
	{/each}
	<Button type="submit">Send</Button>
</form>

<style lang="scss">
	.form {
		display: grid;
		gap: 0.875rem;
		max-width: 720px;
	}

	.form :global(.button) {
		justify-self: start;
	}

	label {
		display: grid;
		gap: 0.4rem;
		font-family: var(--font-heading);
		font-size: 0.92rem;
		font-weight: 600;
	}

	input,
	textarea,
	select {
		width: 100%;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-ink);
		padding: 0.75rem 0.85rem;
		font-family: var(--font-body);
		font-size: 16px;
		box-shadow: var(--shadow-subtle);
		transition:
			border-color var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease;
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
		border-color: var(--color-green-soft);
		box-shadow: 0 0 0 3px rgb(0 171 68 / 0.18);
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-subtle);
		opacity: 0.7;
	}

	textarea {
		resize: vertical;
	}

	.hidden {
		display: none;
	}
</style>
