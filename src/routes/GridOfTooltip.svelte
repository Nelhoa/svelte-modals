<script lang="ts">
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	let tooltip = $state<ReturnType<typeof Tooltip>>();
	let indexHovered = $state();

	function onmouseenter({ currentTarget }: { currentTarget: HTMLElement }, index: number) {
		if (tooltip) {
			indexHovered = index;
			tooltip.tooltip.customAnchor = currentTarget;
			tooltip.tooltip.show();
		}
	}

	function onmouseleave() {
		tooltip?.tooltip.hide();
	}
</script>

<div class="mb-3">
	A tooltip can be used once for multiple elements with customAnchor property. Define it in
	onmouseenter of your custom anchor elements.
</div>

<div class="grid grid-cols-3 grid-rows-3 h-[200px] gap-3 mb-3">
	{#each { length: 9 } as item, index}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			aria-label="tooltip"
			class="bg-blue-100 font-semibold w-full h-full flex items-center justify-center rounded"
			onmouseenter={(e) => onmouseenter(e, index)}
			{onmouseleave}
		>
			{index}
		</div>
	{/each}
</div>

<Tooltip bind:this={tooltip} class="px-3" hideMS={150}>{indexHovered}</Tooltip>
