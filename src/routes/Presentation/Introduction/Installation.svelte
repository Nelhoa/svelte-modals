<script>
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import { layoutInit } from '../codeSnippet.js';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';
</script>

<p>Install using npm</p>

<CodeSnippet lang="powershell" code={`npm install svelte-pops`} />

<p>And init context</p>

<CodeSnippet lang="svelte" code={layoutInit} fileName="+layout.svelte" />

<h2>Defaults tooltips and modals props</h2>

<p>
	<InlineCode code="initModalContext()" /> function takes an optional parameter <InlineCode
		code={'options'}
	/> to configure the default properties of your project's tooltips and modals.
</p>

<CodeSnippet
	class="mt-5"
	lang="typescript"
	code={`options?: { defaultModalProps?: ModalProps; defaultTooltipProps: TooltipProps }`}
/>

<h2>Further configuration</h2>
<p>
	Look at the <a href="/docs/variant-configuration">{`'modal-open:' Variant section`}</a> to learn how
	to style your anchor based on the openned state of its modal.
</p>
