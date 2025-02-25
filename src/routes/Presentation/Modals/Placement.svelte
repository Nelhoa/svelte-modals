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

<CustomInput type="boolean" bind:value={modalProps.centered} title="centered">
	<p>Whether wodal should pop anchored or in the center of the screen</p>
</CustomInput>
<CustomInput type="number" bind:value={modalProps.modalOffset} title="modalOffset">
	<p>Gap (px unit) between tooltip and its anchor or mouse</p>
</CustomInput>
<CustomInput type="number" bind:value={modalProps.modalShift} title="modalShift">
	<p>Min gap (px unit) between tooltip borders of the window.</p>
</CustomInput>

<CustomInput type={placements} bind:value={modalProps.placement} title="placement"
	><p>
		Floating ui placement preference. But will flip by default if no space is available. You can
		remove this behavior by giving your own middleware as explained further.
	</p></CustomInput
>
<CustomInput type="boolean" bind:value={modalProps.noAutoUpdate} title="noAutoUpdate">
	<p>
		By default modal auto-update when elements moves. Try with and without to scroll on page with
		the modal openned.
	</p>
</CustomInput>

<p class="mt-6">
	<InlineCode code="middleware" /> Array of Floating-ui middlewares. You can configure your own by following
	<a href="https://floating-ui.com/docs/middleware">@floating-ui/dom</a> documentation.
</p>

<h2>Default middlewares</h2>

<CodeSnippet
	lang="typescript"
	code={`import { flip, offset, shift } from '@floating-ui/dom';

middleware = [offset(props.modalOffset), flip(), shift({ padding: props.modalShift })]`}
/>
