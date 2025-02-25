<script lang="ts">
	import type { ModalProps } from '$lib/Components/Modal/modal-props.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import CustomInput from '../PresentationAtoms/CustomInput.svelte';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';
	import type { Placement } from '@floating-ui/dom';

	let modalProps = $state<ModalProps>({
		class: 'px-2 py-0.5',
		modalOffset: 10,
		placement: 'bottom',
		enableCloseDialog: false,
		centered: false,
		noAutoUpdate: false,
		noCloseOnOutsideClick: false,
		noCloseOnHide: false,
		noOpenOnAnchorClick: false,
		noCloseOnEscape: false,
		lockBackground: false,
		noAnchor: false
	});

	const placements: Placement[] = [
		'bottom',
		'bottom-end',
		'bottom-start',
		'left',
		'left-end',
		'left-start',
		'right',
		'right-end',
		'right-start',
		'top',
		'top-end',
		'top-start'
	];
</script>

<div class="flex mt-6 gap-3 mb-7 flex-wrap">
	<button class="">
		Button one
		<Modal {...modalProps}>Modal content</Modal>
	</button>

	<button class="">
		Button two
		<Modal {...modalProps}>Modal content</Modal>
	</button>
</div>

<CustomInput
	type="boolean"
	bind:value={modalProps.noCloseOnOutsideClick}
	title="noCloseOnOutsideClick"
></CustomInput>
<CustomInput type="boolean" bind:value={modalProps.noCloseOnEscape} title="noCloseOnEscape">
	<p>
		If the last modal openned has <InlineCode code="noCloseOnEscape" /> enabled, this will prevent every
		modal to close with escape.
	</p>
</CustomInput>
<CustomInput type="boolean" bind:value={modalProps.noCloseOnHide} title="noCloseOnHide"
	><p>
		If your anchor disapear from the window view (but stays mounted) your modal will close, except
		if you enable this property.
	</p></CustomInput
>
<CustomInput type="boolean" bind:value={modalProps.noOpenOnAnchorClick} title="noOpenOnAnchorClick"
	><p>If you need to disable your anchor click.</p></CustomInput
>
<CustomInput type="boolean" bind:value={modalProps.lockBackground} title="lockBackground"
	><p>
		Disable interaction with background elements. If you want to prevent close on background click,
		use <InlineCode code="noCloseOnOutsideClick" /> property.
	</p></CustomInput
>
<CustomInput type="boolean" bind:value={modalProps.noAnchor} title="noAnchor"
	><p>
		Remove default anchor (And the extra DOM Element inside Modal that find it). For more
		information about this behaviour, check <a href="/docs/how-anchor-works">How anchor works</a> section.
	</p></CustomInput
>
<p>
	<InlineCode code="anchor" /> HTMLElement. You can set your own anchor. Be sure to enable <InlineCode
		code="noAnchor"
	/> to increase performances.
</p>

<h2>Advanced</h2>

<p>
	<InlineCode code="callbacks" /> Takes optionnal functions <InlineCode code="show" /> and <InlineCode
		code="hide"
	/> that will run when modal opens and modal closes.
</p>

<CodeSnippet
	lang="typescript"
	code={`type callbacks = { 
	show?: (modal: ModalRemote) => unknown; 
	hide?: (modal: ModalRemote) => unknown;
};`}
/>
