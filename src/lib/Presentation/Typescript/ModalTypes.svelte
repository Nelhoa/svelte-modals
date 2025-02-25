<script>
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
</script>

<h2>ModalElement</h2>
<p>
	The type of element you get when using <InlineCode code={'bind:this'} /> on a Modal component.
</p>
<CodeSnippet lang="typescript" code={`import type { ModalElement } from 'svelte-pops'`} />

<h2>ModalProps</h2>
<!-- <p>More about props in the <a href="/docs/tooltips-props">dedicated section</a>.</p> -->

<CodeSnippet lang="typescript" code={`import type { ModalProps } from 'svelte-pops'`} />
<h2>ModalRemote</h2>
<p>Remote attached to a Modal component.</p>

<CodeSnippet lang="typescript" code={`import type { ModalRemote } from 'svelte-pops'`} />
