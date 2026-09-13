<!--
	Single-field signup for new essays, sent through the same EmailJS service the
	contact form uses.

	That means each signup arrives as an email rather than joining a managed list:
	there is no double opt-in, no unsubscribe link and no stored list to send
	from. Fine while the list is small and collected by hand; swap `handleSubmit`
	for a provider call (Buttondown, ConvertKit, Netlify Forms) before this is
	used to actually send a bulk email.
-->
<script lang="ts">
	import emailjs from '@emailjs/browser';
	import Button from '$lib/components/ui/Button.svelte';
	import { siteSettings } from '$lib/content';
	import type { FormDefinition } from '$lib/content/types';
	import type { FullAutoFill } from 'svelte/elements';

	type Props = {
		definition: FormDefinition;
	};

	let { definition }: Props = $props();

	const emptyValues = () => Object.fromEntries(definition.fields.map((field) => [field.name, '']));

	let values = $state<Record<string, string>>(emptyValues());
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	// Browser autofill keys off these, so the field fills in one tap.
	const autocomplete: Record<string, FullAutoFill> = { name: 'name', email: 'email' };

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
					// The contact form supplies `subject` from a field; the template reads
					// that for the subject line, so fill it in here where there is none.
					subject: definition.subject,
					...values
				},
				{ publicKey: siteSettings.emailjs.publicKey }
			);
			values = emptyValues();
			status = 'success';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}
</script>

<form class="subscribe" name={definition.name} onsubmit={handleSubmit}>
	<div class="row">
		{#each definition.fields as field (field.name)}
			<label class="visually-hidden" for={`subscribe-${field.name}`}>{field.label}</label>
			<input
				id={`subscribe-${field.name}`}
				name={field.name}
				type={field.type === 'email' ? 'email' : 'text'}
				required={field.required}
				autocomplete={autocomplete[field.name] ?? 'off'}
				placeholder={field.placeholder}
				bind:value={values[field.name]}
				disabled={status === 'sending'}
			/>
		{/each}
		<Button type="submit" disabled={status === 'sending'}>
			{status === 'sending' ? 'Signing up…' : 'Subscribe'}
		</Button>
	</div>

	{#if status === 'success'}
		<p class="status success" role="status">{definition.successMessage}</p>
	{:else if status === 'error'}
		<p class="status error" role="alert">{errorMessage}</p>
	{/if}
</form>

<style lang="scss">
	.subscribe {
		display: grid;
		gap: 0.7rem;
	}

	// One line at every width: the field gives way, the button keeps its size.
	.row {
		display: flex;
		gap: 0.6rem;
	}

	input {
		flex: 1 1 10rem;
		min-width: 0;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-ink);
		padding: 0.7rem 0.85rem;
		font-family: var(--font-body);
		// 16px keeps iOS from zooming the page when the field takes focus.
		font-size: 16px;
		box-shadow: var(--shadow-subtle);
		transition:
			border-color var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease;
	}

	input:focus {
		outline: none;
		border-color: var(--color-green-soft);
		box-shadow: 0 0 0 3px rgb(0 171 68 / 0.15);
	}

	input:disabled {
		opacity: 0.6;
	}

	.status {
		margin: 0;
		font-family: var(--font-body);
		font-size: 0.85rem;
	}

	.status.success {
		color: var(--color-green);
	}

	.status.error {
		color: #c0392b;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

</style>
