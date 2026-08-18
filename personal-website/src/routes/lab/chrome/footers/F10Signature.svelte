<script lang="ts">
	// The anti-footer: one line. Everything optional has been removed, so what
	// is left has to be worth the space it takes.
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText('matejdpg@gmail.com');
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<footer class="foot">
	<div class="line">
		<span class="sig" aria-hidden="true">
			<svg viewBox="0 0 120 46" fill="none">
				<path
					d="M6 36 C 12 10, 18 8, 21 22 S 26 40, 32 24 S 40 6, 44 26 C 47 40, 54 34, 58 24 C 63 12, 70 14, 72 26 C 74 36, 80 36, 86 28 C 92 20, 98 22, 100 30 C 102 37, 108 34, 114 24"
					stroke="currentColor"
					stroke-width="2.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>

		<button class="mail" type="button" onclick={copy}>
			<span class="mail-inner">
				<span class="mail-text" data-preserve-case>matejdpg@gmail.com</span>
				<span class="mail-state lab-mono">{copied ? 'copied' : 'click to copy'}</span>
			</span>
		</button>

		<nav aria-label="Footer">
			<ul class="lab-mono">
				<li><a href="/">photos</a></li>
				<li><a href="/">books</a></li>
				<li><a href="/">writing</a></li>
			</ul>
		</nav>

		<span class="year lab-mono">2026</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.75rem, 5cqw, 3rem) clamp(1rem, 4cqw, 2.5rem);
		background: var(--color-cream);
		border-top: 1px solid var(--lab-hairline);
	}

	.line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: clamp(0.85rem, 3cqw, 2rem);
	}

	.sig {
		flex: 0 0 auto;
		width: clamp(72px, 12cqw, 104px);
		color: var(--color-heading);
	}

	.sig svg {
		width: 100%;
		height: auto;
	}

	// The stroke draws itself the first time the footer is painted, which is
	// the entire ornament budget for this design.
	.sig path {
		stroke-dasharray: 420;
		stroke-dashoffset: 420;
		animation: sign 1.6s cubic-bezier(0.5, 0, 0.2, 1) 200ms forwards;
	}

	@keyframes sign {
		to {
			stroke-dashoffset: 0;
		}
	}

	.mail {
		flex: 0 1 auto;
		min-width: 0;
		padding: 0;
		border: none;
		background: none;
		text-align: left;
	}

	// Two lines stacked in a clipped box; the button slides between them on
	// hover so the label and its state never both take up room.
	.mail-inner {
		display: block;
		height: 1.35em;
		overflow: hidden;
	}

	.mail-text,
	.mail-state {
		display: block;
		height: 1.35em;
		line-height: 1.35em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.mail-text {
		font-family: var(--font-ui);
		font-size: clamp(0.85rem, 2.4cqw, 1.05rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--color-heading);
	}

	.mail-state {
		font-size: 0.55rem;
		color: var(--lab-accent);
	}

	.mail:hover .mail-text,
	.mail:hover .mail-state,
	.mail:focus-visible .mail-text,
	.mail:focus-visible .mail-state {
		transform: translateY(-1.35em);
	}

	ul {
		display: flex;
		gap: clamp(0.6rem, 2cqw, 1.25rem);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.55rem;
	}

	nav a {
		color: var(--color-subtle);
		text-decoration: none;
		transition: color 180ms ease;
	}

	nav a:hover {
		color: var(--color-heading);
	}

	.year {
		flex: 0 0 auto;
		font-size: 0.55rem;
		color: var(--color-subtle);
		opacity: 0.6;
	}

	@container (max-width: 600px) {
		.line {
			flex-wrap: wrap;
			justify-content: flex-start;
			gap: 0.85rem 1.25rem;
		}

		.sig {
			order: -1;
			flex-basis: 100%;
		}

		.year {
			margin-left: auto;
		}
	}
</style>
