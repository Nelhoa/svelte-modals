<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { initModalContext } from '$lib/Components/Modal/modal-context-init.svelte.js';
	let props: { children: Snippet } = $props();
	initModalContext({
		defaultTooltipProps: {
			class: 'px-2 py-0.5 border border-blue-100 text-[15px] text-black/80',
			hideMS: 0,
			placement: 'bottom-start',
			modalOffset: 15
		},
		defaultModalProps: {
			class: 'px-3 py-1 ',
			modalOffset: 10,
			placement: 'bottom-start'
		}
	});
</script>

<svelte:head>
	<title>@nelhoa/svelte-modals</title>
</svelte:head>

{@render props.children()}
