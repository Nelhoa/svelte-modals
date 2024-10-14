<script lang="ts">
	import { fly } from 'svelte/transition';
	import Portal from '../../Portal.svelte';
	import { createModalRemote, getOptionalModalRemote } from './simple-modal-remote';
	import { cn } from '$lib/utils/cn';
	import { offset, type Middleware, flip, shift, type Placement } from '@floating-ui/dom';
	import { setParentClick } from './set-parent-click';
	import { mousePosition } from '$lib/stores/mouse-position-store';
	import { get } from 'svelte/store';
	import { createVirtualAnchor } from '$lib/components/App-Dashboard/SpansTable/Chart-Main/chart-util-stores';
	import { setContextClick } from './set-context-click';
	import { addToModalOpenned, removeFromModalOpenned } from './escape-modals';
	import { onDestroy } from 'svelte';
	import { setAutoUpdate } from './set-auto-update';

	const parentModal = getOptionalModalRemote();
	export let backdropStyles = '';
	export let modalStyles = '';
	export let ModalOffset = 10;
	export let ModalShift = 24;
	export let centered = false;
	export let noAutoUpdate = false;
	export let noCloseOnHide = false;
	export let noAnchorOpenOnClick = false;
	export let noCloseOnOutsideClick = false;
	export let middleware: Middleware[] = [
		offset(ModalOffset),
		flip(),
		shift({ padding: ModalShift })
	];
	export let placement: Placement = 'bottom';
	export let noAnchor = false;
	export let lockBackground = false;
	export const remote = createModalRemote(
		middleware,
		placement,
		!noAutoUpdate,
		!noCloseOnHide,
		parentModal
	);
	const isVisible = remote.isVisible;
	const modalElement = remote.modalElement;
	const { x, y } = remote.modalPosition;

	function configureAnchor(element: HTMLElement) {
		const parentElement = element.parentElement ?? undefined;
		remote.parentElement.set(parentElement);
		remote.contextElement.set(element);

		if (!noAnchorOpenOnClick) {
			const removeParentClick = setParentClick(remote);
			return {
				destroy: () => {
					removeParentClick();
				}
			};
		}
	}

	function onModalMount(element: HTMLElement) {
		const parentElement = get(remote.parentElement);
		const mouse = get(mousePosition);
		const anchor = remote.onMouse ? createVirtualAnchor(mouse.x, mouse.y) : parentElement;
		if (!anchor) return;
		remote.positionModal(anchor, element);
		addToModalOpenned(remote);
		const removeAutoUpdate = setAutoUpdate(remote, element, anchor);
		const removeContextClick = noCloseOnOutsideClick
			? undefined
			: setContextClick(remote, parentElement);
		return {
			destroy: async () => {
				removeFromModalOpenned(remote);
				removeAutoUpdate?.();
				removeContextClick?.();
			}
		};
	}

	function onCenteredModalMount(element: HTMLElement) {
		const parentElement = get(remote.parentElement);
		addToModalOpenned(remote);
		const removeContextClick = noCloseOnOutsideClick
			? undefined
			: setContextClick(remote, parentElement);
		return {
			destroy: async () => {
				removeFromModalOpenned(remote);
				removeContextClick?.();
			}
		};
	}

	function backdropClick(e: Event) {
		if (!lockBackground) return;
		e.stopPropagation();
		if (noCloseOnOutsideClick) return;
		remote.close();
	}

	onDestroy(() => {
		remote.close();
		get(remote.modalElement)?.remove();
	});
</script>

{#if !noAnchor}
	<div class="hidden" use:configureAnchor></div>
{/if}

{#if $isVisible && !centered}
	<Portal>
		<div
			role="none"
			on:click={backdropClick}
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				lockBackground && 'pointer-events-auto',
				backdropStyles
			)}
		></div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			bind:this={$modalElement}
			role="dialog"
			id="modal"
			use:onModalMount
			in:fly={{ y: 20, duration: 80 }}
			class={cn(
				'pointer-events-auto fixed top-0 z-modal w-max overflow-hidden rounded-lg bg-white text-black shadow-lg dark:bg-blueBank80 dark:text-white',
				modalStyles
			)}
			style="top: {$y}px; left: {$x}px;"
			on:click|stopPropagation
			on:contextmenu|stopPropagation
		>
			<slot />
		</div>
	</Portal>
{:else if $isVisible}
	<Portal>
		<div
			on:click={backdropClick}
			role="none"
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				lockBackground && 'pointer-events-auto',
				backdropStyles
			)}
		></div>

		<div class="pointer-events-none fixed inset-0 z-modal flex items-center justify-center">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				role="dialog"
				bind:this={$modalElement}
				id="modal"
				use:onCenteredModalMount
				in:fly={{ y: 20, duration: 80 }}
				class={cn(
					'pointer-events-auto overflow-hidden rounded-lg bg-gradient-to-b from-white/[.45] to-white/[.58] text-black shadow-lg backdrop-blur-md backdrop-brightness-[1.13]  ',
					modalStyles
				)}
				on:click|stopPropagation
				on:contextmenu|stopPropagation
			>
				<slot />
			</div>
		</div>
	</Portal>
{/if}

{#if !$isVisible}
	<slot name="tooltip" />
{/if}
