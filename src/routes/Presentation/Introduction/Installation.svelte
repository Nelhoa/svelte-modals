<script>
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import { layoutInit } from '../codeSnippet.js';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';
</script>

<p>Install using npm</p>

<CodeSnippet lang="powershell" code={`npm install svelte-pops`} />

<h2>Enable tailwindcss for svelte-pops</h2>

<p>
	The package may not work properly if you don't declare <InlineCode code="svelte-pops" /> as a source
	to be detected by Tailwindcss. To solve this problem, go to your main style-sheet and add the source:
</p>

<CodeSnippet lang="css" code={`@source "../node_modules/svelte-pops/";`} fileName="app.css" />

<h2>Init context</h2>
<p>You need to init modal context on your top layout.</p>

<CodeSnippet lang="svelte" code={layoutInit} fileName="+layout.svelte" />

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
