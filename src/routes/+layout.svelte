<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	let props: { children: Snippet } = $props();
</script>

{@render props.children()}
