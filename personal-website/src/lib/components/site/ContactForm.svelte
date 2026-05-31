<script lang="ts">
	import emailjs from '@emailjs/browser';
	import type { FormDefinition } from '$lib/content/types';
	import Button from '$lib/components/ui/Button.svelte';
	import { siteSettings } from '$lib/content';

	type Props = {
		definition: FormDefinition;
	};

	let { definition }: Props = $props();

	type FieldValues = Record<string, string>;

	const initialValues: FieldValues = Object.fromEntries(
		definition.fields.map((field) => [field.name, ''])
	);

	let values = $state<FieldValues>({ ...initialValues });
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;

		status = 'sending';
		errorMessage = '';

		try {
			await emailjs.send(
				siteSettings.emailjs.serviceId,
				siteSettings.emailjs.templateId,
				{
					form_name: definition.name,
					default_subject: definition.subject,
					...values
				},
				{ publicKey: siteSettings.emailjs.publicKey }
			);
			values = { ...initialValues };
			status = 'success';
		} catch (err) {
			status = 'error';
			errorMessage =
				err instanceof Error
					? err.message
					: 'Something went wrong sending your message. Please try again.';
		}
	}
</script>

<form class="form" name={definition.name} onsubmit={handleSubmit} novalidate>
	{#each definition.fields as field}
		<label>
			<span>{field.label}</span>
			{#if field.type === 'textarea'}
				<textarea
					name={field.name}
					required={field.required}
					placeholder={field.placeholder}
					rows="6"
					bind:value={values[field.name]}
					disabled={status === 'sending'}
				></textarea>
			{:else if field.type === 'select'}
				<select
					name={field.name}
					required={field.required}
					bind:value={values[field.name]}
					disabled={status === 'sending'}
				>
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
					bind:value={values[field.name]}
					disabled={status === 'sending'}
				/>
			{/if}
		</label>
	{/each}
	<Button type="submit" disabled={status === 'sending'}>
		{status === 'sending' ? 'Sending…' : 'Send'}
	</Button>

	{#if status === 'success'}
		<p class="status success" role="status">{definition.successMessage}</p>
	{:else if status === 'error'}
		<p class="status error" role="alert">{errorMessage}</p>
	{/if}
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

	.status {
		font-family: var(--font-body);
		font-size: 0.92rem;
		margin: 0;
	}

	.status.success {
		color: var(--color-green);
	}

	.status.error {
		color: var(--color-warn, #c0392b);
	}
</style>
