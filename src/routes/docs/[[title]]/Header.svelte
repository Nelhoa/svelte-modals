<script lang="ts">
	import type { ModalElement } from '$lib/Components/Modal/modal.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import type { presentationItem } from '$lib/Components/Presentation/index.js';
	import Navigation from './Navigation.svelte';

	let { item }: { item: presentationItem } = $props();
	let modal = $state<ModalElement>();
</script>

<div
	class="bg-white px-5 py-3 text-lg font-semibold border-b border-b-black/10 flex justify-between items-center max-[800px]:bg-blue-50 max-[800px]:border-t border-t-blue-200 max-[800px]:shadow"
>
	<div>
		<span class="text-blue-500">@nelhoa</span><span class="text-black/45">/</span>svelte-modals
	</div>
	<div class="hidden max-[800px]:block">
		<button
			class="p-0 text-sm text-black/75 focus:outline-hidden focus:shadow-none modal-open:text-white modal-open:bg-blue-500 px-2.5 py-1 bg-blue-500/15 hover:bg-blue-500/30"
			>Menu
			<Modal
				bind:this={modal}
				class="w-[250px] border-blue-100 border max-h-[90dvh] overflow-y-auto"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="p-3" onclick={() => modal?.modal.close()}>
					<Navigation {item} />
				</div>
				<div
					class="flex px-3 pb-3 text-[16px] gap-x-3 font-semibold text-black/50 *:hover:text-black/80 *:cursor-pointer"
				>
					<a href="https://www.npmjs.com/package/@nelhoa/svelte-modals">NPM</a>
					<a href="https://github.com/Nelhoa/svelte-modals">Github</a>
				</div>
			</Modal>
		</button>
	</div>
	<div
		class="flex max-[800px]:hidden text-[16px] gap-x-3 font-semibold text-black/50 *:hover:text-black/80 *:cursor-pointer"
	>
		<a href="https://www.npmjs.com/package/@nelhoa/svelte-modals">NPM</a>
		<a href="https://github.com/Nelhoa/svelte-modals">Github</a>
	</div>
</div>
