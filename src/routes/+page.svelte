<script lang="ts">
	import type { TooltipRemote } from '$lib/Layout/Modal/Tooltip/tooltip-remote.svelte.js';
	import Tooltip from '$lib/Layout/Modal/Tooltip/Tooltip.svelte';
	let remote: { tooltip: TooltipRemote } = $state()!;
	let show = $state(true);
</script>

<div class="bg-gray-100 h-screen pt-10">
	<div class="bg-white w-[90%] max-w-[1000px] mx-auto p-5 rounded">
		<h1 class="text-[20px] font-semibold">Welcome to @nelhoa/svelte-modals</h1>
		<div>Here is your button to open a modal</div>

		<button class="mt-5 px-3 py-1 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-400">
			Open modal
			<Tooltip
				bind:this={remote}
				class="p-2 text-sm"
				enableOnMobile
				placement={'bottom'}
				tweenDuration={200}
				modalOffset={5}>Open the modal please !</Tooltip
			>
		</button>
	</div>
</div>
