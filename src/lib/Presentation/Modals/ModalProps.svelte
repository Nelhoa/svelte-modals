<script lang="ts">
	import type { ModalProps } from '$lib/Components/Modal/modal-props.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import CustomInput from '$lib/Presentation/PresentationAtoms/CustomInput.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
	import type { Placement } from '@floating-ui/dom';

	let modalProps = $state<ModalProps>({
		class: 'px-2 py-0.5',
		modalOffset: 10,
		placement: 'bottom'
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

<CodeSnippet
	lang="typescript"
	code={`export interface ModalProps {
	children?: Snippet | Snippet<[ModalRemote]>; // default snippet
	closeDialog?: CloseDialogSnippet;
	closeDialogContent?: { content?: string; backButton?: string; confirmButton?: string };
	tooltip?: Snippet; // snippet for the tooltip, so it appears only when modal is closed
	portal?: Snippet; // snippet for setting content above the modals
	enableCloseDialog?: boolean;
	backdropStyles?: string; // styles of the backdrop
	class?: string; // styles of the modal
	modalOffset?: number; // offset px of the modal from anchor
	modalShift?: number; // shift px of the modal from borders of window
	centered?: boolean; // boolean : is the modal centered or not
	noAutoUpdate?: boolean; // boolean : remove auto update
	noCloseOnHide?: boolean; // boolean : remove close on anchor hide
	noOpenOnAnchorClick?: boolean; // boolean : remove open on anchor click
	noCloseOnOutsideClick?: boolean; // boolean : remove close when clicking outside the modal, inside it, use « getModal » context function to retrieve modal your'in and make your own button to close it
	middleware?: Middleware[]; // array of floatingui/dom middleware
	placement?: Placement; // enums of floatingui/dom placement from anchor or mouse position
	anchor?: HTMLElement;
	noAnchor?: boolean; // boolean : remove everthing that depends on the anchor
	lockBackground?: boolean; // boolean : mouse event wont spread below the backdrop
	shallow?: Shallow;
	stopScrollElements?: (modal: ModalRemote) => (HTMLElement | undefined | null)[];
	callbacks?: { show?: (modal: ModalRemote) => unknown; hide?: (modal: ModalRemote) => unknown }; // show and hide callbacks
	isCloseDialog?: boolean;
	tooltipProps?: ComponentProps<typeof Tooltip>;
	DEBUG?: { name?: string; log?: boolean };
}`}
/>

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

<h2>Advanced</h2>
<p><InlineCode code="class" /> string. For styling modal with tailwindcss.</p>
<p><InlineCode code="children" /> Snippet rendered in the modal element.</p>
<p>
	<InlineCode code="middleware" /> Array of Floating-ui middlewares. Configure your own, if you want,
	by following <a href="https://floating-ui.com/docs/middleware">@floating-ui/dom</a> documentation.
</p>

<p>Default middlewares</p>

<CodeSnippet
	lang="typescript"
	code={`import { flip, offset, shift } from '@floating-ui/dom';

middleware = [offset(props.modalOffset), flip(), shift({ padding: props.modalShift })]`}
/>
