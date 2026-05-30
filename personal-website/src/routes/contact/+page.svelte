<script lang="ts">
	import BlockHead from '$lib/components/site/BlockHead.svelte';
	import ContactForm from '$lib/components/site/ContactForm.svelte';
	import PageSections from '$lib/components/site/PageSections.svelte';
	import PageTitle from '$lib/components/site/PageTitle.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { contactForm, contactPage, siteSettings } from '$lib/content';
</script>

<Seo {...contactPage.seo} canonical="/contact" />
<PageTitle {...contactPage.hero} />
<PageSections sections={contactPage.sections} />

<Section id="contact-form">
	<BlockHead title="Send a message" />
	<div class="contact-grid">
		<div class="details">
			<p>Email is still the simplest fallback if the form is not available.</p>
			<a class="email" href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
		</div>
		<ContactForm definition={contactForm} />
	</div>
</Section>

<style lang="scss">
	.contact-grid {
		display: grid;
		grid-template-columns: 0.75fr 1.25fr;
		gap: clamp(1.75rem, 4.5vw, 3.75rem);
		align-items: start;
	}

	.details {
		display: grid;
		gap: 0.6rem;
	}

	.details p {
		font-size: 0.92rem;
		color: var(--color-subtle);
		line-height: 1.55;
	}

	.email {
		font-family: var(--font-heading);
		font-weight: 600;
		color: var(--color-green);
		text-decoration: none;
		justify-self: start;
	}

	.email:hover {
		text-decoration: underline;
	}

	@media (max-width: 800px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.email {
			justify-self: center;
		}
	}
</style>
