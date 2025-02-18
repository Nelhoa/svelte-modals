<script lang="ts">
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
</script>

<p>
	You can configure a <InlineCode code="tailwindcss" /> variant to easily style your anchor based on
	the openning status of your modal.
</p>

<p>
	When given an anchor or creating inside an HTMLElement and taking it as its anchor, the modal will
	update anchor property <InlineCode code="data-modal" /> switching from <InlineCode code="close" />
	to <InlineCode code="open" />.
</p>

<p>So you can just add this <InlineCode code="@custom-variant" /> in your stylesheet.</p>

<CodeSnippet
	fileName="app.css"
	class="my-4"
	lang="css"
	code="@custom-variant modal-open (&:is([data-modal='open']));"
/>

<h2>Use</h2>

<button class="modal-open:bg-green-600">
	Styled when openned
	<Modal placement="bottom-start" class="p-3 border border-black/10">Openned</Modal>
</button>

<CodeSnippet
	class="mt-5"
	lang="svelte"
	code={`<button class="modal-open:bg-green-600">
	Styled when openned
	<Modal>Your content goes here</Modal>
</button>`}
/>
