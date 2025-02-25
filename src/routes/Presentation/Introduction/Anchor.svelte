<script lang="ts">
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '../PresentationAtoms/InlineCode.svelte';

	let checked = $state<boolean>(false);
	let button1 = $state<HTMLElement>();
	let button2 = $state<HTMLElement>();
	const bindedButton = $derived(checked ? button2 : button1);
</script>

<p>
	By default, when you set a <InlineCode code={'Modal'} /> inside an <InlineCode
		code={'HTMLElement'}
	/>, this closest parent is the anchor. This works thanks to an extra DOM element binded inside the <InlineCode
		code={'Modal'}
	/> component which gets its parent thanks to the <InlineCode code={'.closestParent'} /> method.
</p>

<p>
	In the vast majority of cases, you won't notice any performance issues even when using hundreds of <InlineCode
		code={'Modals'}
	/> with the default anchor system.
</p>
<p>
	But in some cases, if you have a large number of components with
	<InlineCode code={'Modals'} />, placed at the same time in the DOM, it may be worthwhile to remove
	the element used to determine the anchor by using the <InlineCode code={'noAnchor'} /> property and
	targeting the desired anchor with <InlineCode code={'binding'} />.
</p>

<CodeSnippet
	class="mt-5"
	lang="svelte"
	code={`<Modal noAnchor anchor={myAnchor}>My content</Modal>`}
/>

<h2>You can set anchor manualy</h2>

<CodeSnippet
	class="mt-5"
	lang="svelte"
	code={`\<script lang="ts">
	let myButton = $state<HTMLElement>();
</script\>

<button bind:this={myButton}>My button</button>
<Modal noAnchor anchor={myButton}>My content</Modal>`}
/>

<h2>And make it switch</h2>

<div class="flex gap-3 mt-5 mb-5 flex-wrap">
	<button disabled={bindedButton !== button1} bind:this={button1} class="disabled:opacity-30"
		>Button One</button
	>
	<button disabled={bindedButton !== button2} class="disabled:opacity-30" bind:this={button2}
		>Button Two</button
	>
</div>

<Modal class="p-4" noAnchor anchor={bindedButton}
	><div class="flex gap-x-3 items-center">
		<input type="checkbox" bind:checked />
		<div>Switch anchor</div>
	</div></Modal
>

<CodeSnippet
	class="mt-5"
	lang="svelte"
	code={`\<script lang="ts">
	let checked = $state<boolean>(false);
	let button1 = $state<HTMLElement>();
	let button2 = $state<HTMLElement>();
	const bindedButton = $derived(checked ? button2 : button1);
</script\>

<button bind:this={button1}>Button One</button>
<button bind:this={button2}>Button Two</button>

<Modal noAnchor anchor={bindedButton}>
	<input type="checkbox" bind:checked />
	<div>Switch anchor</div>
</Modal>`}
/>
