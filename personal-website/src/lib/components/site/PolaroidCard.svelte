<script lang="ts">
	type Props = {
		href: string;
		image: string;
		alt: string;
		caption: string;
		subcaption?: string;
		meta?: string;
		ratio?: '4 / 3' | '1 / 1' | '2 / 3' | '3 / 4';
	};

	let {
		href,
		image,
		alt,
		caption,
		subcaption,
		meta,
		ratio = '4 / 3'
	}: Props = $props();
</script>

<a class="polaroid" {href} style="--ratio: {ratio};">
	<div class="frame">
		<img src={image} {alt} loading="lazy" />
	</div>
	<div class="caption">
		{#if meta}
			<span class="meta">{meta}</span>
		{/if}
		<span class="title">{caption}</span>
		{#if subcaption}
			<span class="sub">{subcaption}</span>
		{/if}
	</div>
</a>

<style lang="scss">
	.polaroid {
		--rotate: 0deg;
		--polaroid-bg: #fbf9f1;
		--polaroid-fg: #242525;
		--polaroid-sub: #6c7a6e;
		--polaroid-frame: #ececec;
		--polaroid-shadow:
			0 1px 1px rgb(36 37 37 / 0.08),
			0 6px 14px rgb(36 37 37 / 0.1),
			0 18px 28px rgb(36 37 37 / 0.08);
		display: flex;
		flex-direction: column;
		padding: 0.7rem 0.7rem 0;
		background: var(--polaroid-bg);
		background-image: linear-gradient(
			180deg,
			rgb(255 255 255 / 0.5),
			rgb(0 0 0 / 0.02) 50%,
			rgb(0 0 0 / 0.04)
		);
		border-radius: 2px;
		box-shadow: var(--polaroid-shadow);
		text-decoration: none;
		color: var(--polaroid-fg);
		transform: rotate(var(--rotate));
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease;
		will-change: transform;
	}

	:global([data-theme='dark']) .polaroid {
		--polaroid-bg: #2a2a28;
		--polaroid-fg: #ece8dc;
		--polaroid-sub: #9aa098;
		--polaroid-frame: #111;
		--polaroid-shadow:
			0 1px 1px rgb(0 0 0 / 0.4),
			0 6px 14px rgb(0 0 0 / 0.45),
			0 18px 28px rgb(0 0 0 / 0.4);
		background-image: linear-gradient(
			180deg,
			rgb(255 255 255 / 0.04),
			rgb(0 0 0 / 0.18) 60%,
			rgb(0 0 0 / 0.28)
		);
	}

	.polaroid:hover,
	.polaroid:focus-visible {
		transform: rotate(var(--rotate)) translateY(-3px);
		box-shadow:
			0 2px 2px rgb(36 37 37 / 0.1),
			0 14px 24px rgb(36 37 37 / 0.18),
			0 28px 40px rgb(36 37 37 / 0.12);
	}

	:global([data-theme='dark']) .polaroid:hover,
	:global([data-theme='dark']) .polaroid:focus-visible {
		box-shadow:
			0 2px 2px rgb(0 0 0 / 0.4),
			0 14px 24px rgb(0 0 0 / 0.5),
			0 28px 40px rgb(0 0 0 / 0.45);
	}

	.frame {
		width: 100%;
		aspect-ratio: var(--ratio);
		overflow: hidden;
		background: var(--polaroid-frame);
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
	}

	.frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.caption {
		padding: 0.75rem 0.4rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		text-align: center;
		font-family: var(--font-heading);
		line-height: 1.2;
	}

	.meta {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--polaroid-sub);
	}

	.title {
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--polaroid-fg);
		letter-spacing: -0.005em;
	}

	.sub {
		font-size: 0.78rem;
		font-weight: 500;
		color: var(--polaroid-sub);
	}

	@media (prefers-reduced-motion: reduce) {
		.polaroid,
		.polaroid:hover,
		.polaroid:focus-visible {
			transform: none;
			transition: none;
		}
	}
</style>
