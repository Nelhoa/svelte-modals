<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import type { TooltipRemote } from '$lib/Components/Tooltip/tooltip-remote.svelte.js';
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	import { cn } from '$lib/utils/cn.js';
	import GridOfTooltip from './GridOfTooltip.svelte';

	let remote: { tooltip: TooltipRemote } = $state()!;

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
		},
		{
			title: 'stopScrollElements',
			description: `an optionnal callback with the modal as parameter that returns (HTMLElement | undefined | null)[]. Make it returns any element you want to stop scroll on when modal opens`
		}
	];

	let stopScroll = $state(false);
</script>

<div class="bg-gray-100 min-h-screen pt-10 py-10">
	<div class="bg-white w-[90%] max-w-[1000px] mx-auto p-5 rounded text-balance">
		<h1 class="text-[20px] font-semibold">Welcome to @nelhoa/svelte-modals</h1>
		<GridOfTooltip />
		<a
			class="underline text-cyan-500 font-semibold pr-3"
			href="https://www.npmjs.com/package/@nelhoa/svelte-modals">NPM</a
		>
		<a
			class="underline text-cyan-500 font-semibold pr-3"
			href="https://github.com/Nelhoa/svelte-modals">Github</a
		>
		<div class="my-3">
			<div class="rounded bg-blue-100 py-1 px-3 inline">npm install @nelhoa/svelte-modals</div>
		</div>
		<div>Here is your button to open a modal</div>
		<div class="mt-3">
			Just put the {'<Modal></Modal> element'} inside your button and it will get that your button or
			any other direct HTMLElement parent is the anchor. If your don’t need an anchor, set noAnchor on
			the modal.
		</div>
		<div class="mt-3">
			You can style how the anchor looks when modal is closed or openned with Tailwindcss and
			classic CSS using data-modal=open or data-modal=close. For example with tailwindcss:
			data-[modal=open]:shadow-lg put a shadow on the button when the modal is open.
		</div>
		<div class="mt-3">
			You can add callback functions that take the modal remote as a parameter on the modal if your
			want side effects when the modal opens or close.
		</div>
		<div class="mt-3">
			You can pass a shallow property witch takes pushState from $app/environnement, a stateName for
			the modal open property in page state. And the page store itself subscribed in the markup.
			like page: $page
		</div>

		<div class="mt-3">
			The {'<Tooltip> </Tooltip> element act approximatly the same. If you want a Modal and a tooltip on the same anchor, put the Tooltip component in the tooltip snippet of your modal so the tooltip will only shows when the modal is closed.'}
		</div>

		<button
			class="mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400 data-[modal=open]:shadow-lg data-[modal=open]:border-cyan-600"
		>
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
		<div class="mt-5">
			You can have a button that open a centered modal, try to close it by going backward on your
			browser
		</div>
		<button
			class="mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400 data-[modal=open]:bg-cyan-600"
		>
			Open centered modal
			<Modal
				class="p-2 text-sm max-w-[500px] w-[50vw] text-balance border min-h-[30vh] flex items-center justify-center flex-col"
				stopScrollElements={() => [document.body]}
				centered
				lockBackground
				shallow={{ pushState, stateName: 'openModal', page: $page }}
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
				{#snippet portal()}
					{@render next('Back', 'left: 15px;')}
					{@render next('Next', 'right: 15px;')}
				{/snippet}
			</Modal>
		</button>

		{#snippet next(text: string, style: string)}
			<button
				class="fixed top-[50%] bg-white rounded-full py-1 px-3 -translate-y-1/2"
				{style}
				onclick={(e) => e.stopPropagation()}
			>
				{text}
			</button>
		{/snippet}

		<div
			class="bg-blue-50 overflow-y-scroll h-[300px] rounded mt-5 stopScroll"
			style="--scroll-bar-color: rgba(34, 211, 238, 0); --scroll-bar-color-hover: rgba(34, 211, 238, 0.5)"
		>
			<div
				class="h-[700px] flex justify-start gap-2 p-10 items-center flex-col text-center text-balance"
			>
				<div class="flex items-center justify-center gap-3">
					<input type="checkbox" bind:checked={stopScroll} />
					<div>Disable background scroll when modal is open</div>
				</div>
				<div class="text-black/60">
					This uses property stopScrollElements. stopScrollElements requires a callback function
					with the modal itself as a parameter (optional), and return an array of (HTMLElement,
					undefined, null)[].
				</div>
				<div class="text-black/60">
					In this exemple, we put a « stopScroll » class the scrollable div containing the anchor.
					And stopScrollElements is (m: modalRemote) {'=>'} [m?.anchor?.closest('.stopScroll'), document.body]
				</div>
				<button
					class={cn(
						'mt-5 px-3 py-1 bg-cyan-500 border border-black/0 text-white rounded font-semibold hover:bg-cyan-400'
					)}
				>
					Test the scrolling modal
					<Modal
						stopScrollElements={(m) =>
							stopScroll ? [m?.anchor?.closest('.stopScroll'), document.body] : []}
						class="p-5 h-[100px] overflow-auto"
					>
						<div class="h-[200px]">It scrolls youhou !</div></Modal
					>
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
