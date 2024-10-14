<script lang="ts">
	import Modal from '$lib/Layout/Modal/Modal/Modal.svelte';
	import type { TooltipRemote } from '$lib/Layout/Modal/Tooltip/tooltip-remote.svelte.js';
	import Tooltip from '$lib/Layout/Modal/Tooltip/Tooltip.svelte';
	let remote: { tooltip: TooltipRemote } = $state()!;
</script>

<div class="bg-gray-100 h-screen pt-10">
	<div class="bg-white w-[90%] max-w-[1000px] mx-auto p-5 rounded">
		<h1 class="text-[20px] font-semibold">Welcome to @nelhoa/svelte-modals</h1>
		<div>Here is your button to open a modal</div>

		<button class="mt-5 px-3 py-1 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-400">
			Open modal
			<Modal class="p-2 text-sm max-w-[200px] text-balance border" placement="bottom-start">
				Modal is openned, and now no tooltip is shown !
				<button class="bg-orange-500 mt-3 rounded font-semibold text-balance text-white">
					And now with a modal inside !
					<Modal class="p-2 text-sm max-w-[200px] text-balance border" placement="bottom-start"
						>You can close this new modal by clicking inside the previous one, witch will remove it
						only. On your can click outside every modal and it will close all of them</Modal
					>
				</button>
				{#snippet tooltip()}
					<Tooltip
						bind:this={remote}
						class="p-2 text-sm"
						enableOnMobile
						placement={'bottom'}
						tweenDuration={200}
						modalOffset={5}
					>
						Open the modal please !
					</Tooltip>
				{/snippet}
			</Modal>
		</button>
	</div>
</div>
