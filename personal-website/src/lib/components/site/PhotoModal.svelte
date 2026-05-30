<script lang="ts">
	import type { PhotoImage } from '$lib/content/types';

	type Props = {
		image?: PhotoImage;
		onclose: () => void;
	};

	let { image, onclose }: Props = $props();
</script>

{#if image}
	<div class="backdrop" role="presentation">
		<div class="modal" role="dialog" aria-modal="true" aria-label={image.alt} tabindex="-1">
			<button type="button" aria-label="Close" onclick={onclose}>
				<svg
					class="close-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					focusable="false"
				>
					<line x1="6" y1="6" x2="18" y2="18" />
					<line x1="18" y1="6" x2="6" y2="18" />
				</svg>
			</button>
			<img src={image.src} alt={image.alt} />
			<div class="details">
				<p><strong>{image.location}</strong></p>
				<p>{image.capturedAtLabel}{image.camera ? ` · ${image.camera}` : ''}</p>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: rgb(12 12 14 / 0.92);
	}

	.modal {
		display: grid;
		gap: 1rem;
		max-width: min(100%, 1080px);
		max-height: 92vh;
		color: white;
	}

	button {
		justify-self: end;
		border: 1px solid rgb(255 255 255 / 0.45);
		border-radius: 999px;
		background: rgb(20 20 22 / 0.85);
		color: white;
		padding: 0.55rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-heading);
		cursor: pointer;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		box-shadow: 0 2px 10px rgb(0 0 0 / 0.45);
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	button:hover,
	button:focus-visible {
		background: rgb(40 40 44 / 0.95);
		border-color: rgb(255 255 255 / 0.7);
	}

	.close-icon {
		width: 1.15rem;
		height: 1.15rem;
		display: block;
	}

	img {
		max-height: 76vh;
		border-radius: var(--radius-md);
		object-fit: contain;
	}

	.details {
		display: grid;
		gap: 0.2rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-md);
		background: rgb(20 20 22 / 0.7);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		color: rgb(255 255 255 / 0.95);
		text-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
	}

	.details p {
		margin: 0;
	}
</style>
