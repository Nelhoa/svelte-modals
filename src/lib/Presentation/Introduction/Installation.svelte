<script>
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import { layoutInit } from '../codeSnippet.js';
</script>

<p>Install using npm</p>

<CodeSnippet lang="powershell" code={`npm install svelte-pops`} />

<p>And init context</p>

<CodeSnippet lang="svelte" code={layoutInit} fileName="+layout.svelte" />
