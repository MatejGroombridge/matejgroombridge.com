<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/site/Seo.svelte';

	let status = $derived($page.status);
	let isNotFound = $derived(status === 404);
	let title = $derived(isNotFound ? "this page doesn't exist" : 'something went wrong');
	let body = $derived(
		isNotFound
			? 'check the address, or head back and try one of the links below.'
			: 'an unexpected error came up. try again, or head back to the homepage.'
	);
</script>

<Seo title={isNotFound ? 'Page not found' : 'Error'} description={body} />

<PageTitle eyebrow={String(status)} {title} {body} />

<Section>
	<div class="actions">
		<Button href="/">Back home</Button>
		<Button href="/photography" variant="ghost">Photography</Button>
		<Button href="/booknotes" variant="ghost">Book notes</Button>
		<Button href="/contact" variant="ghost">Contact</Button>
	</div>
</Section>

<style lang="scss">
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	@media (max-width: 640px) {
		.actions {
			justify-content: center;
		}
	}
</style>
