<script lang="ts">
	import type { ModalProps } from '$lib/Components/Modal/modal-props.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import CustomInput from '$lib/Presentation/PresentationAtoms/CustomInput.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';

	let modalProps = $state<ModalProps>({
		class: 'px-2 py-0.5',
		modalOffset: 10,
		placement: 'bottom',
		enableCloseDialog: true,
		centered: false,
		noAutoUpdate: false,
		noCloseOnOutsideClick: false,
		noCloseOnHide: false,
		noOpenOnAnchorClick: false,
		lockBackground: false,
		noAnchor: false
	});
</script>

<p>
	You can secure the closing of a modal by requesting confirmation from your user. All you need to
	do is set the <InlineCode code="enableCloseDialog" /> property.
</p>

<div class="flex mt-6 gap-3 mb-7 flex-wrap">
	<button class="">
		Open modal
		<Modal {...modalProps}>Modal content</Modal>
	</button>
</div>

<CustomInput type="boolean" bind:value={modalProps.enableCloseDialog} title="enableCloseDialog">
	<p>Prevent closing modal on outside clicks by requesting confirmation.</p>
</CustomInput>

<h2>Customise content</h2>
<p>
	<InlineCode code="closeDialogContent" /> Enables you to customise text content inside close dialog.
</p>

<CodeSnippet
	lang="typescript"
	code={`{ content?: string; backButton?: string; confirmButton?: string };`}
/>

<h2>Control appearance</h2>
<p><InlineCode code="closeDialog" /> Snippet.</p>
<p>
	If you need to customise closeDialog appareance, just set your own closeDialog Snippet. Snippet
	takes an object as parameter with a function close that enables you to confirm the choice to close
	the modal. And a function back that just close the closeDialog.
</p>

<CodeSnippet lang="typescript" code={`Snippet<[{ close: () => unknown; back: () => unknown }]>;`} />

<p>For instance :</p>

<button class="mt-2">
	My modal
	<Modal enableCloseDialog>
		Hey
		{#snippet closeDialog(func)}
			<div class="flex flex-col gap-3 p-3">
				<div>Are you sure ????</div>
				<button onclick={func.close}>Yes !!!</button>
				<button class="bg-black/10 text-black/50" onclick={func.back}>No....</button>
			</div>
		{/snippet}
	</Modal>
</button>

<CodeSnippet
	class="mt-6"
	lang="svelte"
	code={`<button >
	My modal
	<Modal enableCloseDialog>
		Hey
		{#snippet closeDialog(func)}
            <div>Are you sure ????</div>
            <button onclick={func.close}>Yes !!!</button>
            <button onclick={func.back}>No....</button>
		{/snippet}
	</Modal>
</button>`}
/>

<h2>Stackable</h2>

<p>
	You can stack as much protected modals as you need. When clicking outside all of them, you will be
	asked to confirm the closing of the deepest modal.
</p>

<button class="mt-5">
	Open modal
	<Modal class="p-3" enableCloseDialog
		>My protected modal
		<button class="block mt-2">
			Open modal
			<Modal enableCloseDialog>My second modal</Modal>
		</button>
	</Modal>
</button>
