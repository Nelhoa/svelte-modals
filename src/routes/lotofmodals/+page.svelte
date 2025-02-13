<script lang="ts">
	import Modal from '$lib/Components/OldModal/Modal.svelte';
	let startTest = $state(false);
	function onclick() {
		startTest = !startTest;
	}
</script>

<div class="px-5 pt-5">
	<button class="cursor-pointer" {onclick}>Start {startTest}</button>
</div>

<button popovertarget="my-popover">Ouvrir le contenu "popover"</button>
<div popover="manual" id="my-popover">Bonjour tout le monde !</div>

{#if startTest}
	<div class="grid grid-cols-20 gap-2 p-15">
		{#each { length: 5000 } as i}
			<button class="bg-green-500 text-white rounded"
				>old
				<Modal>Vive le vent d’hiver</Modal>
			</button>
		{/each}
	</div>
{/if}
