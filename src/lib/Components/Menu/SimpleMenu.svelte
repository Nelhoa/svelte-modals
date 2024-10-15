<!-- <script lang="ts">
	import SimpleModal from '../SimpleModal/SimpleModal.svelte';
	import Option from './SimpleMenuOption.svelte';
	import Details from './SimpleMenuDetails.svelte';
	import type { SimpleModalElement } from '../SimpleModal/simple-modal-remote';
	import { cn } from '$lib/utils/cn';
	import type { Placement } from '@floating-ui/dom';
	import { createMenuRemote } from './menu-remote';
	import { wait } from '$lib/utils/Public/wait';
	export let remote: SimpleModalElement = undefined;
	export let menuStyles = '';
	export let backdropStyles = '';
	export let ModalOffset = 8;
	export let placement: Placement = 'bottom-start';
	export let noContextClose = false;
	export let noDefaultClick = false;
	export let ModalShift = 24;

	const menu = createMenuRemote();
	const menuModal = menu.Modal;
	const element = menu.MenuElement;
	$: menuModal.set(remote);

	function onListMount(e: HTMLElement) {
		async function focus() {
			await wait(10);
			e.focus();
		}
		focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') return;
		e.stopPropagation();
		if (e.key === 'ArrowDown') return menu.navigate(1);
		if (e.key === 'ArrowUp') return menu.navigate(-1);
	}
</script>

<SimpleModal
	noAnchorOpenOnClick={noDefaultClick}
	noCloseOnOutsideClick={noContextClose}
	modalStyles={cn('border border-light-90 max-w-[270px] min-w-[200px] dark:bg-white', menuStyles)}
	{ModalOffset}
	{ModalShift}
	{backdropStyles}
	{placement}
	bind:remote
>
	<button class=" w-full text-left" on:keydown={handleKeydown} bind:this={$element} use:onListMount>
		<slot {Option} {Details} />
	</button>
	<slot slot="tooltip" name="tooltip" />
</SimpleModal> -->
