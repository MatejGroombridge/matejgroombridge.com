<script lang="ts">
	type Props = {
		src: string;
		alt: string;
		loading?: 'lazy' | 'eager';
		class?: string;
	};

	let { src, alt, loading = 'lazy', class: className = '' }: Props = $props();
</script>

<img class="image-frame {className}" {src} {alt} {loading} />

<style lang="scss">
	.image-frame {
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-subtle);
		object-fit: cover;
	}
</style>
