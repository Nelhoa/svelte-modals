<script>
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
</script>

<h2>TooltipElement</h2>
<p>
	The type of element you get when using <InlineCode code={'bind:this'} /> on a Tooltip component
</p>
<CodeSnippet lang="typescript" code={`import type { TooltipElement } from 'svelte-pops'`} />

<h2>TooltipProps</h2>
<p>More about props in the <a href="/docs/tooltips-props">dedicated section</a>.</p>

<CodeSnippet lang="typescript" code={`import type { TooltipProps } from 'svelte-pops'`} />
<h2>TooltipRemote</h2>
<p>Remote attached to a tooltip component.</p>

<CodeSnippet lang="typescript" code={`import type { TooltipRemote } from 'svelte-pops'`} />
