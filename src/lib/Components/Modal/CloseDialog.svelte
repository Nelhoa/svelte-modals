<script lang="ts">
	import { wait } from '$lib/utils/wait.js';
	import type { ModalRemote } from './modal.svelte.js';
	import Modal from './Modal.svelte';

	let { modal }: { modal: ModalRemote } = $props();

	function focus(e: HTMLElement) {
		async function focusElement() {
			await wait(10);
			e.focus();
		}
		focusElement();
	}

	function close() {
		modal._closeDialogElement?.modal.close();
		modal.close();
	}

	function back() {
		modal._closeDialogElement?.modal.close();
	}
</script>

{#if modal.props.enableCloseDialog}
	<Modal
		lockBackground
		backdropStyles="bg-black/20"
		bind:this={modal._closeDialogElement}
		noAnchor
		centered
		_isCloseDialog
		_DEBUG={{ name: `${modal.props._DEBUG?.name} - Close Dialog` }}
	>
		{#if modal.props.closeDialog}
			{@render modal.props.closeDialog({ close, back })}
		{:else}
			<div class="flex justify-items flex-col text-center w-[200px] text-balance p-3 gap-3">
				<div>{modal.props.closeDialogContent?.content ?? 'Close dialog ?'}</div>
				<div class="flex justify-center items-center gap-3">
					<button
						class="px-2 py-0.5 bg-black/10 hover:bg-black/15 text-black rounded cursor-pointer focus:outline-1 outline-blue-900"
						onclick={back}>{modal.props.closeDialogContent?.backButton ?? 'Back'}</button
					>
					<button
						use:focus
						class="px-2 py-0.5 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold cursor-pointer focus:outline-1 outline-blue-900"
						onclick={close}>{modal.props.closeDialogContent?.confirmButton ?? 'Yes'}</button
					>
				</div>
			</div>
		{/if}
	</Modal>
{/if}
