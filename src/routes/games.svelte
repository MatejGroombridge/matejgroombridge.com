<script>
	let games = [
		{
			name: 'Rise Up',
			html: '<iframe width="100%" height="100%" src="https://www.addictinggames.com/embed/html5-games/23866" scrolling="no"></iframe>'
		},
		{
			name: 'Ballz',
			html: '<iframe width="100%" height="100%" src="https://www.addictinggames.com/embed/html5-games/24642" scrolling="no"></iframe>'
		}
	];

	function openGame(name) {
		document.getElementById('games-wrapper').style.display = 'none';
		document.getElementById('videogame').style.display = 'flex';
		document.getElementById('reload-btn').style.display = 'flex';

		let videogame = document.getElementById('videogame');

		let wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		wrapper.classList.add('game-height');

		wrapper.innerHTML = name;

		videogame.appendChild(wrapper);
	}

	function reload() {
		window.location.reload();
	}

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
					}
				},
				{
					threshold: 1
				}
			);
		});

		observer.observe(e);
	}
</script>

<section>
	<div class="wrapper shown">
		<h1>Baulko Game Page 🍊</h1>
	</div>
	<div class="wrapper shown">
		<p>Guaranteed to work on school wifi.</p>
	</div>
	<div class="wrapper shown">
		<div class="wrapper shown">
			<p class="small-text" style="text-align: justify;">
				Games are legally embedded from various game websites (Not pirating). DM me any game
				requests you have through Instagram. This website only stays unblocked if the DOE doesn't
				know about it so please don't tell on the teacher on me :)
			</p>
		</div>
	</div>
	<div class="btn-wrapper" id="reload-btn">
		<div class="btn" on:click={reload}>Home</div>
	</div>
</section>

<section id="videogame" />

<section>
	<div class="wrapper" use:actionWhenInViewport>
		<div id="games-wrapper">
			{#each games as game}
				<div class="game" on:click={() => openGame(game.html)}>
					<h3>{game.name}</h3>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	#reload-btn {
		display: none;
	}
</style>
