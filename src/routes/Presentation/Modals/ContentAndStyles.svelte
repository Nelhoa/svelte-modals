<script lang="ts">
	import type { ModalProps } from '$lib/Components/Modal/modal-props.svelte.js';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
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

<h2>Children</h2>
<p>
	<InlineCode code="children" /> Snippet rendered in the modal element. Can take an optional <InlineCode
		code="ModalRemote"
	/> parameter that you can use within snippet to create interactivity with the modal, like a button
	you can use to close the modal.
</p>

<CodeSnippet
	lang="svelte"
	code={`{#snippet children(modal)}
	<button onclick={() => modal.close()}>
		Close modal
	</button>
{/Snippet}`}
/>

<h2>Styling</h2>
<p><InlineCode code="class" /> string. For styling modal with tailwindcss.</p>
<p><InlineCode code="backdropStyles" /> string. For styling modal backdrop with tailwindcss.</p>

<h2>Portal</h2>

<p>
	<InlineCode code="Portal" /> Snippet rendered above the modal element. Like arrows for going right
	or left.
</p>
