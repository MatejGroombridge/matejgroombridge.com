<script lang="ts">
	import { photoTrips } from '$lib/content';

	const trip = photoTrips[0];
	const stamp = trip?.coverImage ?? '';
</script>

<footer class="foot">
	<div class="card">
		<div class="left">
			<img src={trip?.coverImage} alt="" loading="lazy" />
			<span class="caption lab-mono">{trip?.title} · {trip?.year}</span>
		</div>

		<div class="right">
			<div class="postmark" aria-hidden="true">
				<span class="stamp" style={`background-image:url(${stamp})`}></span>
				<span class="rings">
					<span class="ring-text lab-mono">melbourne · vic 3000</span>
				</span>
			</div>

			<p class="note">
				Thanks for reading all the way down here. If any of it was useful — or you just want to
				argue about a book — write back.
			</p>

			<div class="address">
				<span class="to lab-mono">reply to</span>
				<a class="mail" href="/" data-preserve-case>matejdpg@gmail.com</a>
				<div class="lines" aria-hidden="true"><i></i><i></i><i></i></div>
			</div>

			<ul class="socials lab-mono">
				<li><a href="/">instagram</a></li>
				<li><a href="/">github</a></li>
				<li><a href="/">linkedin</a></li>
			</ul>
		</div>
	</div>

	<div class="base lab-mono">
		<span>© 2026</span>
		<span>no newsletter, no popups</span>
	</div>
</footer>

<style lang="scss">
	.foot {
		container-type: inline-size;
		padding: clamp(1.5rem, 4cqw, 2.75rem) clamp(1rem, 4cqw, 2.5rem);
		background: var(--color-muted);
		border-top: 1px solid var(--lab-hairline);
	}

	.card {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
		gap: 0;
		border: 1px solid var(--lab-hairline);
		border-radius: 3px;
		background: var(--color-surface);
		box-shadow: 0 14px 34px -22px rgb(0 0 0 / 0.5);
		overflow: hidden;
	}

	.left {
		position: relative;
		min-height: 180px;
	}

	.left img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.caption {
		position: absolute;
		left: 0.6rem;
		bottom: 0.6rem;
		padding: 0.16rem 0.4rem;
		border-radius: 2px;
		background: rgb(0 0 0 / 0.55);
		font-size: 0.5rem;
		color: #fff;
	}

	.right {
		position: relative;
		display: grid;
		align-content: start;
		gap: 0.85rem;
		padding: clamp(1rem, 3cqw, 1.6rem);
		// The vertical rule down the middle of a real postcard.
		border-left: 1px dashed var(--lab-hairline);
	}

	.postmark {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.6rem;
	}

	.stamp {
		width: 46px;
		height: 56px;
		background-size: cover;
		background-position: center 40%;
		// Perforated stamp edge, cut with a repeating radial mask. The tile is
		// deliberately coarse — at 6px the teeth turned the whole stamp to lace.
		-webkit-mask-image: radial-gradient(circle at 4.5px 4.5px, transparent 2.6px, #000 2.9px);
		mask-image: radial-gradient(circle at 4.5px 4.5px, transparent 2.6px, #000 2.9px);
		-webkit-mask-size: 9px 9px;
		mask-size: 9px 9px;
		border: 2px solid var(--color-surface);
		outline: 1px solid var(--lab-hairline);
	}

	.rings {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border: 1.5px solid color-mix(in srgb, var(--lab-accent) 60%, transparent);
		border-radius: 999px;
		transform: rotate(-12deg);
		opacity: 0.75;
	}

	.ring-text {
		width: 42px;
		font-size: 0.36rem;
		line-height: 1.25;
		text-align: center;
		color: var(--lab-accent);
	}

	.note {
		margin: 0;
		max-width: 34ch;
		font-family: 'Caveat', var(--font-body), cursive;
		font-size: clamp(1.05rem, 2.6cqw, 1.35rem);
		line-height: 1.35;
		color: var(--color-heading);
		text-transform: none;
	}

	.address {
		display: grid;
		gap: 0.25rem;
	}

	.to {
		font-size: 0.48rem;
		color: var(--color-subtle);
	}

	.mail {
		font-family: var(--font-ui);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-heading);
		text-decoration: none;
		justify-self: start;
		border-bottom: 1.5px solid var(--lab-accent);
	}

	.lines {
		display: grid;
		gap: 0.42rem;
		margin-top: 0.5rem;
	}

	.lines i {
		display: block;
		height: 1px;
		background: var(--lab-hairline);
	}

	.lines i:nth-child(2) {
		width: 82%;
	}

	.lines i:nth-child(3) {
		width: 60%;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.5rem;
	}

	.socials a {
		color: var(--color-subtle);
		text-decoration: none;
	}

	.socials a:hover {
		color: var(--lab-accent);
	}

	.base {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.85rem;
		font-size: 0.5rem;
		color: var(--color-subtle);
	}

	@container (max-width: 600px) {
		.card {
			grid-template-columns: 1fr;
		}

		.left {
			min-height: 130px;
		}

		.right {
			border-left: none;
			border-top: 1px dashed var(--lab-hairline);
		}
	}
</style>
