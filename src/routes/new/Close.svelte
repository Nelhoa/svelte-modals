<script lang="ts">
	import { getModal } from '$lib/index.js';
	let { children } = $props();
	const modal = getModal();
</script>

<button onclick={() => modal?.deepClose()}>
	{@render children?.()}
</button>
