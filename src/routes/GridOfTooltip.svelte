<script lang="ts">
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	let tool = $state<ReturnType<typeof Tooltip>>();
	let indexHovered = $state();
</script>

<div>
	A tooltip can be used once for multiple elements inside a thanks to the « setCustomAnchor »
	function.
</div>

<div class="grid grid-cols-3 grid-rows-3 h-[200px] gap-3">
	{#each { length: 9 } as item, index}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			aria-label="tooltip"
			class="bg-blue-100 font-semibold w-full h-full flex items-center justify-center"
			onmouseenter={(e) => {
				indexHovered = index;
				tool?.tooltip.setCustomAnchor(e.currentTarget);
			}}
		>
			{index}
		</div>
	{/each}
	<Tooltip bind:this={tool} class="px-3">{indexHovered}</Tooltip>
</div>
