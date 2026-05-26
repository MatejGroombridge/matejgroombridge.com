<!-- TODO: This code became depracated upon updating the website to Svelte 5 -->

<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ y: 20, duration: 250, delay: 100 }} out:fly={{ y: 20, duration: 100 }}>
		<slot />
	</div>
{/key}
