<script lang="ts">
	// A one-field footer form: the ask is small enough that a full contact form
	// would be the reason nobody fills it in.
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
	let expanded = $state(false);

	const valid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));

	function submit(event: SubmitEvent) {
		event.preventDefault();
		if (!valid) return;
		sent = true;
	}
</script>

<footer class="foot">
	<div class="grid">
		<div class="pitch">
			<h4>Want to talk?</h4>
			<p>
				Commissions, corrections, or a book you think I would like. One field to start — the rest
				only if you need it.
			</p>
		</div>

		{#if sent}
			<div class="done" role="status">
				<span class="tick" aria-hidden="true">✓</span>
				<div>
					<strong data-preserve-case>Got it.</strong>
					<span>I&rsquo;ll reply to {email} shortly.</span>
				</div>
			</div>
		{:else}
			<form onsubmit={submit}>
				<div class="field">
					<input
						type="email"
						bind:value={email}
						onfocus={() => (expanded = true)}
						placeholder="you@example.com"
						aria-label="Your email"
						autocomplete="email"
						required
					/>
					<button type="submit" disabled={!valid} aria-label="Send">
						<span class="arrow" aria-hidden="true">→</span>
					</button>
				</div>

				<!-- The message box only appears once the visitor has committed to
				     the first field, so the footer starts as one small ask. -->
				{#if expanded}
					<textarea
						bind:value={message}
						rows="2"
						placeholder="Anything else? (optional)"
						aria-label="Message"
					></textarea>
				{/if}

				<span class="hint lab-mono">
					{valid ? 'looks good — hit enter' : 'no list, no newsletter, no follow-up sequence'}
				</span>
			</form>
		{/if}
	</div>

	<div class="base">
		<nav aria-label="Footer">
			<ul>
				<li><a href="/">Photography</a></li>
				<li><a href="/">Book notes</a></li>
				<li><a href="/">Writing</a></li>
				<li><a href="/">2026</a></li>
			</ul>
		</nav>
		<span class="lab-mono copy">© 2026 · melbourne</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.75rem, 5cqw, 3rem) clamp(1rem, 4cqw, 2.5rem) 1.1rem;
		background: var(--color-cream);
		border-top: 1px solid var(--lab-hairline);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
		gap: clamp(1.25rem, 4cqw, 3rem);
		align-items: center;
	}

	h4 {
		margin: 0 0 0.4rem;
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 4cqw, 2.1rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-heading);
		font-variation-settings: 'SOFT' 45;
	}

	.pitch p {
		margin: 0;
		max-width: 38ch;
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-subtle);
	}

	form {
		display: grid;
		gap: 0.5rem;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.3rem 0.3rem 0.9rem;
		border: 1px solid var(--lab-hairline);
		border-radius: 999px;
		background: var(--color-surface);
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease;
	}

	.field:focus-within {
		border-color: var(--lab-accent);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--lab-accent) 12%, transparent);
	}

	input,
	textarea {
		flex: 1;
		min-width: 0;
		border: none;
		background: none;
		outline: none;
		font-size: 0.9rem;
		color: var(--color-heading);
	}

	input::placeholder,
	textarea::placeholder {
		color: color-mix(in srgb, var(--color-subtle) 70%, transparent);
	}

	textarea {
		padding: 0.7rem 0.9rem;
		border: 1px solid var(--lab-hairline);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		resize: vertical;
		font-family: inherit;
		line-height: 1.5;
		animation: grow 260ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	@keyframes grow {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	button {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border: none;
		border-radius: 999px;
		background: var(--color-heading);
		color: var(--color-cream);
		transition:
			background 200ms ease,
			transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1.4),
			opacity 200ms ease;
	}

	button:disabled {
		opacity: 0.32;
		cursor: not-allowed;
	}

	button:not(:disabled) {
		background: var(--lab-accent);
	}

	button:not(:disabled):hover {
		transform: translateX(2px) scale(1.05);
	}

	.arrow {
		font-size: 0.95rem;
		line-height: 1;
	}

	.hint {
		padding-left: 0.9rem;
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	.done {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.9rem 1.1rem;
		border: 1px solid color-mix(in srgb, var(--lab-accent) 45%, transparent);
		border-radius: var(--radius-lg);
		background: color-mix(in srgb, var(--lab-accent) 10%, transparent);
		animation: grow 300ms cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.tick {
		display: grid;
		place-items: center;
		width: 1.7rem;
		height: 1.7rem;
		flex: 0 0 auto;
		border-radius: 999px;
		background: var(--lab-accent);
		color: #fff;
		font-size: 0.85rem;
	}

	.done div {
		display: grid;
		gap: 0.1rem;
	}

	.done strong {
		font-family: var(--font-ui);
		font-size: 0.9rem;
		color: var(--color-heading);
	}

	.done span {
		font-size: 0.78rem;
		color: var(--color-subtle);
		word-break: break-word;
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem 1.5rem;
		margin-top: clamp(1.25rem, 4cqw, 2.25rem);
		padding-top: 0.85rem;
		border-top: 1px solid var(--lab-hairline);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-subtle);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--lab-accent);
	}

	.copy {
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	@container (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 1.1rem;
		}
	}
</style>
