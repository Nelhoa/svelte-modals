<script lang="ts">
	import { getModalContext } from '$lib/Components/Modal/modal-context.svelte.js';
	import { initTooltip } from '$lib/Components/Modal/tooltip-context.svelte.js';
	let props = $state({ onMouse: true });
	const modalContext = getModalContext();

	function onclick() {
		props.onMouse = !props.onMouse;
	}
</script>

<p>Tooltips</p>

<p>Hello {JSON.stringify(modalContext.tooltip?.props)}</p>

{#snippet element()}
	<div>Coucou</div>
{/snippet}

<button class="mt-5" {onclick} use:initTooltip={() => ({ children: element, ...props })}>
	Hover this button !
</button>

<!-- <button use:initModal={{ children: element, class: 'bg-blue-100 px-3' }}>Test modal</button> -->
