<script lang="ts">
	import CustomInput from '$lib/Presentation/PresentationAtoms/CustomInput.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
	import type { TooltipProps } from '$lib/Components/Tooltip/tooltip-remote.svelte.js';
	import type { Placement } from '@floating-ui/dom';
	import { initTooltip } from '$lib/Components/Modal/tooltip-context.svelte.js';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	let tooltipProps: TooltipProps = $state({
		onMouse: false,
		hideMS: 50,
		tweenDuration: 150,
		class: 'px-2 py-0.5',
		modalOffset: 10,
		disabled: false,
		enableOnMobile: true,
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

<p>
	You can use action to configure tooltip so that you don't need an extra DOM element and you gain
	performance.
</p>

<CodeSnippet
	class="mt-3 mb-2"
	lang="svelte"
	code={`import { initTooltip } from '@nelhoa/svelte-modals'`}
/>

<p class="mb-5">
	Props must be passed as a returned object of a function. This is required to keep reactivity.
</p>

<CustomInput type="boolean" bind:value={tooltipProps.disabled} title="disabled"></CustomInput>
<CustomInput type="boolean" bind:value={tooltipProps.onMouse} title="onMouse">
	<p>Makes the tooltip be placed relatively to its anchor or to the mouse.</p>
</CustomInput>
<CustomInput type="number" bind:value={tooltipProps.hideMS} title="hideMS">
	<p>
		Time before tooltip hides when <InlineCode code="close()" /> function is called. For instance, when
		mouse leaves anchor. You can override this when manualy calling <InlineCode
			code="tooltip.close(<hideMS>)"
		/>.
	</p>
</CustomInput>
<CustomInput type="number" bind:value={tooltipProps.tweenDuration} title="tweenDuration">
	<p>
		For having a latency when updating tooltip position. You can notice that tooltip will go from
		one anchor to an other if you set an <InlineCode code="hideMS" /> long enough so mouses go from one
		to an other before tooltip close.
	</p>
</CustomInput>

<CustomInput type={placements} bind:value={tooltipProps.placement} title="placement"
	><p>
		Floating ui placement preference. But will flip by default if no space is available. You can
		remove this behavior by giving your own middleware as explained further.
	</p></CustomInput
>

{#snippet tooltip()}
	Tooltip content
{/snippet}

<button class="my-3.5" use:initTooltip={() => ({ children: tooltip, ...tooltipProps })}>
	Button
</button>

<CodeSnippet
	lang="svelte"
	code={`{#snippet tooltip()}
	Tooltip content
{/snippet}

<button use:initTooltip={() => ({ children: tooltip, ...tooltipProps })}>
    Button
</button>`}
/>

<!-- <CodeSnippet
	class="mt-8"
	lang="svelte"
	code={`\<script lang="ts">
    let tooltipProps: TooltipProps = $state({});
</script\>

{#snippet tooltip()}
	My tooltip content
{/snippet}

<button>
    Button one
    <Modal {tooltipProps} {tooltip}>Modal content</Modal>
</button>

<button>
    Button two
    <Modal {tooltipProps} {tooltip}>Modal content</Modal>
</button>`}
/> -->
