<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Modal from '$lib/Components/Modal/Modal.svelte';
</script>

<!-- <p>Need further dev.</p> -->

<!-- <button class="">
	My button
	<Modal shallow={{ pushState, stateName: 'openModal', page: page }}>Modal content</Modal>
</button> -->

<button
	class="flex bg-white border text-black/95 font-atma font-semibold tracking-widest text-[20px] gap-x-2 focus:outline-none"
>
	<img src="/my_icon.svg" width="30" alt="" class="pb-[2px]" /> svelte-pops
	<Modal class="font-semibold">Popover & Tooltips</Modal>
</button>
