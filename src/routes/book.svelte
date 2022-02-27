<script>
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

<section class="head">
	<div class="wrapper shown">
		<div class="content">
			<div class="abovetitle">Summary, Review, and Notes</div>
			<h1>Atomic Habits</h1>
		</div>
	</div>
</section>

<style>
	.wrapper {
		width: 55%;
	}
</style>
