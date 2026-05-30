<script lang="ts">
	import type { TimelineEvent } from '$lib/content/year2026';
	import Tag from '$lib/components/ui/Tag.svelte';
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		events: TimelineEvent[];
	};

	let { events }: Props = $props();

	function formatDay(date: string): string {
		const day = new Date(date).getUTCDate();
		return String(day).padStart(2, '0');
	}
</script>

<ol class="timeline">
	{#each events as event, i (event.date + event.title)}
		<li class="entry" use:reveal={{ delay: Math.min(i * 80, 480) }}>
			<div class="marker" aria-hidden="true">
				<span class="month">{event.month}</span>
				<span class="day">{formatDay(event.date)}</span>
			</div>
			<div class="rail" aria-hidden="true">
				<span class="dot"></span>
			</div>
			<div class="content">
				<div class="head">
					<h3>{event.title}</h3>
					{#if event.tag}
						<Tag label={event.tag} variant="surface" />
					{/if}
				</div>
				<p>{event.body}</p>
				{#if event.link}
					<a class="link" href={event.link.href}>
						{event.link.label}
						<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
					</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style lang="scss">
	.timeline {
		display: grid;
		gap: clamp(1.25rem, 2.5vw, 1.75rem);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.entry {
		display: grid;
		grid-template-columns: 4.5rem 1.25rem minmax(0, 1fr);
		gap: clamp(0.75rem, 1.5vw, 1.1rem);
		align-items: stretch;
	}

	.marker {
		display: grid;
		justify-items: end;
		align-content: start;
		padding-top: 0.2rem;
		font-family: var(--font-heading);
		line-height: 1;
	}

	.month {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-green);
	}

	.day {
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-heading);
		margin-top: 0.25rem;
	}

	.rail {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.rail::before {
		content: '';
		position: absolute;
		inset: 0.6rem auto -0.5rem auto;
		width: 2px;
		background: var(--color-line);
		border-radius: 2px;
	}

	.entry:last-child .rail::before {
		display: none;
	}

	.dot {
		position: relative;
		z-index: 1;
		width: 0.85rem;
		height: 0.85rem;
		margin-top: 0.45rem;
		border-radius: 999px;
		background: var(--color-green);
		box-shadow: 0 0 0 4px var(--color-cream);
	}

	.content {
		display: grid;
		gap: 0.5rem;
		padding: clamp(0.85rem, 1.6vw, 1.15rem) clamp(1rem, 1.8vw, 1.3rem);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-subtle);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.head h3 {
		margin: 0;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		justify-self: start;
		margin-top: 0.1rem;
		font-family: var(--font-heading);
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-green);
		text-decoration: none;
	}

	.link .material-symbols-rounded {
		font-size: 1rem;
		transition: transform var(--duration-fast) ease;
	}

	.link:hover .material-symbols-rounded {
		transform: translateX(3px);
	}

	@media (max-width: 600px) {
		.entry {
			grid-template-columns: 3.25rem 1rem minmax(0, 1fr);
		}

		.day {
			font-size: 1.3rem;
		}

		.content {
			justify-items: center;
		}

		.head {
			justify-content: center;
		}

		.link {
			justify-self: center;
		}
	}
</style>
