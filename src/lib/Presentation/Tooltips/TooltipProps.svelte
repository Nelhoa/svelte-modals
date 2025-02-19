<script lang="ts">
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import CustomInput from '$lib/Presentation/PresentationAtoms/CustomInput.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
	import type { TooltipProps } from '$lib/Components/Tooltip/tooltip-remote.svelte.js';
	import type { Placement } from '@floating-ui/dom';
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

	/**
     * 
	
    */
</script>

<CustomInput type="boolean" bind:value={tooltipProps.disabled} title="disabled"></CustomInput>
<CustomInput type="boolean" bind:value={tooltipProps.enableOnMobile} title="enableOnMobile"
></CustomInput>

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

<CustomInput type="number" bind:value={tooltipProps.modalOffset} title="modalOffset">
	<p>Gap (px unit) between tooltip and its anchor or mouse</p>
</CustomInput>
<CustomInput type="number" bind:value={tooltipProps.modalShift} title="modalShift">
	<p>Min gap (px unit) between tooltip borders of the window.</p>
</CustomInput>

<CustomInput type={placements} bind:value={tooltipProps.placement} title="placement"
	><p>
		Floating ui placement preference. But will flip by default if no space is available. You can
		remove this behavior by giving your own middleware as explained further.
	</p></CustomInput
>

<h2>Advanced</h2>
<p><InlineCode code="class" /> string. For styling tooltip with tailwindcss.</p>
<p><InlineCode code="children" /> Snippet rendered in the tooltip element.</p>
<p>
	<InlineCode code="middleware" /> Array of Floating-ui middlewares. Configure your own, if you want,
	by following <a href="https://floating-ui.com/docs/middleware">@floating-ui/dom</a> documentation.
</p>

<p>Default middlewares</p>

<CodeSnippet
	lang="typescript"
	code={`import { flip, offset, shift } from '@floating-ui/dom';

middleware = [offset(props.modalOffset), flip(), shift({ padding: props.modalShift })]`}
/>

<p>
	<InlineCode code="noDefaultAnchor" /> For removing the default anchor like you would for modals. Learn
	more in <a href="/docs/how-anchor-works">How anchor works</a> section.
</p>
<p><InlineCode code="in" /> SvelteTransition.</p>
<p><InlineCode code="out" /> SvelteTransition.</p>

{#snippet tooltip()}
	My tooltip content
{/snippet}

<div class="flex gap-3 mt-3 mb-3 flex-wrap">
	<button class="mt-4">
		Button one
		<Modal class="px-3 py-1" {tooltipProps} {tooltip}>Modal content</Modal>
	</button>

	<button class="mt-4">
		Button two
		<Modal class="px-3 py-1" {tooltipProps} {tooltip}>Modal content</Modal>
	</button>
</div>

<CodeSnippet
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
/>
