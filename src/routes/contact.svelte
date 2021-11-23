<script>
	import Contact from '$lib/contact/Contact.svelte';
</script>

<section>
	<div class="wrapper">
		<div>
			<h2>Get in Touch!</h2>
			<p>I'd love to hear from you.</p>
		</div>
		<div>
			<Contact />
		</div>
	</div>
</section>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: auto;
	}

	.wrapper div {
		margin-left: auto;
		margin-right: auto;
	}
</style>
