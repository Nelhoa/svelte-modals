<script lang="ts">
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';
</script>

<p>
	You can tell the modal which elements should no longer be scrollable when it's open. This is made
	possible by the <InlineCode code="stopScrollElements" /> property, which takes a function with an optional
	<InlineCode code="ModalRemote" /> parameter that can be used to determine which element should be blocked
	from scrolling.
</p>

<div
	class="relative h-[200px] w-[450px] mt-6 scrollbarr-show overflow-y-scroll max-w-full max-h-[70vh] bg-blue-100"
>
	<div class="absolute text-black/40 top-[5px] left-[12px]">Scrollable box</div>
	<div class="h-[200%] px-5 pt-[20%] flex justify-center items-start">
		<button class="block"
			>Test
			<Modal
				stopScrollElements={(modal) => [
					modal.anchor?.parentElement?.parentElement,
					modal.anchor?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
				]}>Content</Modal
			>
		</button>
	</div>
</div>

<p class="mt-6">
	The function given to stopScrollElements must return an array of HTML elements. By using the
	modal's anchor and tracing its parents, we can find the scrollable element to stop. It's also
	possible to bind the precise element you wish to stop scrolling or to use <InlineCode
		code={`document.querySelector('something')`}
	/>.
</p>

<CodeSnippet
	class="mt-5"
	lang="typescript"
	code={`const stopScrollElements = (modal) => [modal.anchor?.parentElement?.parentElement] `}
/>

<CodeSnippet
	class="mt-5"
	lang="svelte"
	code={`<button >
	Test
	<Modal {stopScrollElements} >
		Content
	</Modal>
</button>`}
/>
