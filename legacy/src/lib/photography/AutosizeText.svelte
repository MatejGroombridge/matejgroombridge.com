<!-- AutoSizeText.svelte -->
<script>
	let fontSize = 72; // Initial font size
	let content = 'Velika Planina, Slovenia'; // Initial content

	function adjustFontSize() {
		const container = document.querySelector('.container');
		const contentDiv = document.querySelector('.content');

		while (
			contentDiv.scrollHeight > container.clientHeight ||
			contentDiv.scrollWidth > container.clientWidth
		) {
			fontSize--;
			contentDiv.style.fontSize = fontSize + 'px';
		}
	}
</script>

<div class="container">
	<div class="content" contenteditable="true" bind:innerHTML={content} on:input={adjustFontSize} />
</div>

<style>
	.container {
		width: 300px; /* Set your desired container width */
		height: 200px; /* Set your desired container height */
		overflow: hidden;
		position: relative;
	}

	.content {
		width: 100%;
		height: 100%;
		white-space: nowrap; /* Prevent text from wrapping */
		overflow: hidden;
		text-overflow: ellipsis; /* Display ellipsis for overflowed text */
		font-size: var(fontSize) px; /* Use curly braces for binding */
	}
</style>
