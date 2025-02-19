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

<p><InlineCode code="tooltip" /> Snippet.</p>
<p><InlineCode code="tooltipProps" /> TooltipProps.</p>

<p>
	It's best to use tooltips within modals, as the modal will make sure that the tooltip is not
	opened when the modal is. Instead of using the <InlineCode code="initTooltip" />
	action or using the <InlineCode code="Tooltip" /> component in an anchor, simply pass a <InlineCode
		code="tooltip"
	/> snippet to the Modal along with the <InlineCode code="tooltipProps" /> to make it work.
</p>

{#snippet tooltip()}
	My tooltip content
{/snippet}

<div class="flex mt-6 gap-3 mb-7 flex-wrap">
	<button>
		My Button
		<Modal
			{tooltip}
			tooltipProps={{ class: 'bg-cyan-100 text-cyan-600 font-semibold' }}
			{...modalProps}>Modal content</Modal
		>
	</button>
</div>

<CodeSnippet
	lang="svelte"
	code={`<script>
    import Modal from '@nelhoa/svelte-modals';
</script\>

<button>
    My Button
    <Modal
        {tooltip}
        tooltipProps={{ class: 'bg-cyan-100 text-cyan-600' }}>
            Modal content
    </Modal>
</button>`}
/>
