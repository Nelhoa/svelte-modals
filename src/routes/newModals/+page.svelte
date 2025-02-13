<script lang="ts">
	import Modal from '$lib/Components/Modal/Modal.svelte';
	let startTest = $state(false);
	function onclick() {
		startTest = !startTest;
	}
</script>

<div class="px-5 pt-5">
	<button class="cursor-pointer" {onclick}>Start</button>
</div>

{#if startTest}
	<div class="grid grid-cols-20 gap-2 p-15">
		{#each { length: 10 } as i}
			<button class="bg-blue-400 text-white rounded"
				>new
				<!-- <span>Yooo</span> -->
				<Modal>Vive le vent d’hiver</Modal>
			</button>
		{/each}
	</div>
{/if}
