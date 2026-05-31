<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
	import type { IconProp } from '@fortawesome/fontawesome-svg-core';
	import type { SocialLink } from '$lib/content/types';

	type Props = {
		name: SocialLink['icon'];
	};

	let { name }: Props = $props();

	function getBrandIcon(iconName: SocialLink['icon']): IconProp | undefined {
		if (iconName === 'instagram') return faInstagram;
		if (iconName === 'linkedin') return faLinkedin;
		if (iconName === 'github') return faGithub;
		return undefined;
	}

	function getMaterialIcon(iconName: SocialLink['icon']) {
		if (iconName === 'camera') return 'photo_camera';
		if (iconName === 'mail') return 'mail';
		return '';
	}

	const brandIcon = $derived(getBrandIcon(name));
</script>

<span class="icon" aria-hidden="true">
	{#if brandIcon}
		<FontAwesomeIcon icon={brandIcon} />
	{:else}
		<span class="material-symbols-rounded">{getMaterialIcon(name)}</span>
	{/if}
</span>

<style lang="scss">
	.icon,
	:global(svg) {
		display: inline-block;
		width: 1.15rem;
		height: 1.15rem;
	}
</style>
