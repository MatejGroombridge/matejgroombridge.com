<script lang="ts">
	import type { Snippet } from 'svelte';
	import LongForm from '$lib/components/ui/LongForm.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<!-- Reading styles live in LongForm so book notes share them. -->
<LongForm>
	{@render children?.()}
</LongForm>
