<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { initModalContext } from '$lib/Components/Modal/modal-context-init.svelte.js';
	let props: { children: Snippet } = $props();
	initModalContext();
</script>

<svelte:head>
	<title>@nelhoa/svelte-modals</title>
</svelte:head>

{@render props.children()}
