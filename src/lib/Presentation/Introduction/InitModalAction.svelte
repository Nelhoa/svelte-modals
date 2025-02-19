<script lang="ts">
	import { initModal } from '$lib/Components/Modal/modal-init.svelte.js';
	import { ModalRemote } from '$lib/Components/Modal/modal.svelte.js';
	import type { TooltipProps } from '$lib/Components/Tooltip/tooltip-remote.svelte.js';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import CustomInput from '../PresentationAtoms/CustomInput.svelte';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';

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
</script>

<p><InlineCode code={'initModal'} /> action is a good way to create a flexible modal.</p>
<ul>
	<li>It has <InlineCode code="noDefaultAnchor" /> by default</li>
	<li>It makes your anchor works without extra element binding</li>
</ul>
<p>
	Be sure to pass the <InlineCode code="children" /> Snippet prop. Which, by the way, can have a parameter
	that represent the <InlineCode code="ModalRemote" />.
</p>

<h2>Basic use</h2>

<button use:initModal={{ children: modalContent, class: 'px-3 py-1' }} class="mt-2"
	>My button</button
>

{#snippet modalContent()}
	My modal
{/snippet}

<CodeSnippet
	class="mt-6"
	lang="svelte"
	code={`\<script lang="ts">
	import { initModal } from '@nelhoa/svelte-modals';
</script\>

<button use:initModal={{ children: modalContent,  }}
	>My button</button
>

{#snippet modalContent(modal: ModalRemote)}
	My modal
{/snippet}`}
/>

<h2>Modal children snippet</h2>

<p>
	Having the <InlineCode code="ModalRemote" /> as parameter of the children snippet make it easy to create
	a button inside of your modal that controls it, for instance :
</p>

{#snippet modalWithButton(modal: ModalRemote)}
	<div>
		<button onclick={() => modal.close()}>Close modal</button>
	</div>
{/snippet}

<button use:initModal={{ children: modalWithButton, class: 'px-3 py-1' }} class="mt-4"
	>Open modal</button
>

<CodeSnippet
	class="mt-6"
	lang="svelte"
	code={`{#snippet modalWithButton(modal: ModalRemote)}
	<div>
		<button onclick={() => modal.close()}>Close modal</button>
	</div>
{/snippet}`}
/>

<h2>Works well with tooltip</h2>
<p>And tooltip props remains reactive, try it !</p>

{#snippet content(modal?: ModalRemote)}
	{#if modal}
		In Modal context
	{:else}
		In Tooltip context
	{/if}
{/snippet}

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

<button class="mt-3" use:initModal={{ children: content, tooltip: content, tooltipProps }}
	>My button</button
>

<CodeSnippet
	class="mt-6"
	lang="svelte"
	code={`{#snippet content(modal?: ModalRemote)}
	{#if modal}
		In Modal context
	{:else}
		In Tooltip context
	{/if}
{/snippet}

<button use:initModal={{ children: content, tooltip: content, tooltipProps }}
	>My button</button
>`}
/>
