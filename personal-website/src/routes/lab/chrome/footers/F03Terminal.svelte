<script lang="ts">
	import { onMount } from 'svelte';

	const lines = [
		{ cmd: 'whoami', out: 'matej groombridge — photographer, software engineer' },
		{ cmd: 'ls ~/site', out: 'photography/  booknotes/  writing/  2026/  contact/' },
		{ cmd: 'cat now.txt', out: 'reading Thinking, Fast and Slow · rebuilding this site' },
		{ cmd: 'echo $EMAIL', out: 'matejdpg@gmail.com' }
	];

	// Lines type themselves in on mount rather than being animated by CSS, so
	// the shell reads as a session replaying instead of a static screenshot.
	let revealed = $state(0);

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			revealed = lines.length;
			return;
		}
		const id = setInterval(() => {
			revealed += 1;
			if (revealed >= lines.length) clearInterval(id);
		}, 420);
		revealed = 1;
		return () => clearInterval(id);
	});
</script>

<footer class="foot">
	<div class="shell">
		<div class="chrome" aria-hidden="true">
			<span class="dots"><i></i><i></i><i></i></span>
			<span class="title lab-mono">matej@melbourne — ~/site</span>
		</div>

		<div class="body lab-mono">
			{#each lines as line, i (line.cmd)}
				{#if i < revealed}
					<p class="cmd"><span class="prompt">$</span> {line.cmd}</p>
					<p class="out">{line.out}</p>
				{/if}
			{/each}
			<p class="cmd"><span class="prompt">$</span><span class="caret" aria-hidden="true"></span></p>
		</div>
	</div>

	<div class="base lab-mono">
		<a href="/">instagram</a>
		<a href="/">github</a>
		<a href="/">linkedin</a>
		<span class="spacer"></span>
		<span>© 2026 · exit 0</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.5rem, 4cqw, 2.75rem) clamp(1rem, 4cqw, 2.5rem);
		background: #0e1110;
		color: #d7ded8;
	}

	.shell {
		border: 1px solid rgb(255 255 255 / 0.12);
		border-radius: var(--radius-md);
		background: #141917;
		overflow: hidden;
	}

	.chrome {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.45rem 0.7rem;
		background: rgb(255 255 255 / 0.05);
		border-bottom: 1px solid rgb(255 255 255 / 0.08);
	}

	.dots {
		display: flex;
		gap: 5px;
	}

	.dots i {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.18);
	}

	.dots i:first-child {
		background: var(--color-green);
	}

	.title {
		font-size: 0.5rem;
		color: rgb(215 222 216 / 0.5);
	}

	.body {
		display: grid;
		gap: 0.1rem;
		padding: clamp(0.85rem, 3cqw, 1.35rem);
		font-size: clamp(0.62rem, 1.6cqw, 0.75rem);
		letter-spacing: 0;
		text-transform: none;
	}

	.body p {
		margin: 0;
		font-size: inherit;
		line-height: 1.75;
		color: inherit;
		word-break: break-word;
	}

	.cmd {
		color: #eef2ec;
	}

	.prompt {
		margin-right: 0.5rem;
		color: var(--color-green);
	}

	.out {
		margin-bottom: 0.5rem !important;
		color: rgb(215 222 216 / 0.62);
	}

	.caret {
		display: inline-block;
		width: 7px;
		height: 1em;
		vertical-align: text-bottom;
		background: var(--color-green);
		animation: blink 1.1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.1rem;
		margin-top: 1rem;
		font-size: 0.52rem;
		color: rgb(215 222 216 / 0.45);
	}

	.base a {
		color: rgb(215 222 216 / 0.7);
		text-decoration: none;
	}

	.base a:hover {
		color: var(--color-green);
	}

	.spacer {
		flex: 1;
	}
</style>
