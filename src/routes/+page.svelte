<script lang="ts">
	import type { ModalComponent } from '$lib/Components/Modal/modal-remote.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import type { TooltipRemote } from '$lib/Components/Tooltip/tooltip-remote.svelte.js';
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	import { cn } from '$lib/utils/cn.js';

	let remote: { tooltip: TooltipRemote } = $state()!;
	let modal: ModalComponent = $state();

	const propertiesTable: { title: string; description: string }[] = [
		{
			title: 'this',
			description:
				'If you want to open the modal on mouse events, use bind:this with the ModalComponent type. Inside, there is a function called openOnMouse dedicated to this purpose.'
		},
		{
			title: 'children',
			description: 'Default snippet, content to display inside the modal.'
		},
		{
			title: 'tooltip',
			description: 'Snippet for the tooltip, which appears only when the modal is closed.'
		},
		{
			title: 'backdropStyles',
			description: 'Styles applied to the backdrop (the background behind the modal).'
		},
		{
			title: 'class',
			description: 'Styles applied to the modal itself.'
		},
		{
			title: 'ModalOffset',
			description: 'Pixel offset of the modal from the anchor.'
		},
		{
			title: 'ModalShift',
			description: 'Pixel shift of the modal from the window borders.'
		},
		{
			title: 'centered',
			description: 'Determines whether the modal is centered or not.'
		},
		{
			title: 'noAutoUpdate',
			description: 'Disables automatic updates for the modal.'
		},
		{
			title: 'noCloseOnHide',
			description: 'Prevents the modal from closing when the anchor is hidden.'
		},
		{
			title: 'noOpenOnAnchorClick',
			description: 'Prevents the modal from opening when the anchor is clicked.'
		},
		{
			title: 'noCloseOnOutsideClick',
			description:
				'Prevents the modal from closing when clicking outside of it. Use the `getModal` context function to retrieve the current modal and create your own button to close it.'
		},
		{
			title: 'middleware',
			description:
				'Array of `floatingui/dom` middlewares to manage complex behaviors for the modal.'
		},
		{
			title: 'placement',
			description:
				'Positioning of the modal relative to the anchor or mouse, based on enums from `floatingui/dom`.'
		},
		{
			title: 'noAnchor',
			description: 'Removes all dependencies on the anchor.'
		},
		{
			title: 'lockBackground',
			description: 'Prevents mouse events from propagating below the backdrop.'
		},
		{
			title: 'callbacks',
			description: 'Callback functions for showing and hiding the modal (`show` and `hide`).'
		}
	];
</script>

<div class="bg-gray-100 min-h-screen pt-10 py-10">
	<div class="bg-white w-[90%] max-w-[1000px] mx-auto p-5 rounded">
		<h1 class="text-[20px] font-semibold">Welcome to @nelhoa/svelte-modals</h1>
		<div class="my-3">
			<div class="rounded bg-blue-100 py-1 px-3 inline">npm install @nelhoa/svelte-modals</div>
		</div>
		<div>Here is your button to open a modal</div>

		<button
			class={cn(
				'mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400',
				modal?.modal.isVisible && 'shadow-lg border-black/10'
			)}
		>
			Open modal
			<Modal
				bind:this={modal}
				class="p-2 text-sm max-w-[200px] text-balance border"
				placement="bottom-start"
			>
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
		<div class="mt-5">You can have a button that open a centered modal</div>
		<button
			class={cn(
				'mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400'
			)}
		>
			Open centered modal
			<Modal
				class="p-2 text-sm max-w-[500px] w-[50vw] text-balance border min-h-[30vh] flex items-center justify-center flex-col"
				centered
				lockBackground
				backdropStyles="bg-black/10"
				placement="bottom-start"
			>
				<div class="max-w-[300px] text-balance text-lg font-semibold text-center">
					Modal is openned, and now no tooltip is shown !
				</div>
				<button
					class="bg-orange-500 mt-3 rounded font-semibold text-balance text-white px-3 py-1 hover:bg-orange-400"
				>
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

		<div
			class="bg-blue-50 overflow-y-scroll h-[200px] rounded mt-5"
			style="--scroll-bar-color: rgba(34, 211, 238, 0); --scroll-bar-color-hover: rgba(34, 211, 238, 0.5)"
		>
			<div class="h-[500px] flex justify-center p-10 items-start">
				<button
					class={cn(
						'mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400'
					)}
				>
					Test the scrolling modal
					<Modal class="p-5">It scrolls youhou !</Modal>
				</button>
			</div>
		</div>
		<div class="font-semibold text-lg mt-5">Properties</div>
		<div class="grid sm:grid-cols-[auto_1fr] grid-cols-1 gap-3 mt-5">
			{#each propertiesTable as property}
				<div class="text-[13px] font-semibold text-black/80 bg-black/5 rounded px-2 py-1">
					{property.title}
				</div>
				<div class="text-[15px] text-black/80">
					{property.description}
				</div>
			{/each}
		</div>
	</div>
</div>
