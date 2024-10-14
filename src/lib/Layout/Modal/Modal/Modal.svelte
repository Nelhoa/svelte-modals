<script lang="ts">
	import { fly } from 'svelte/transition';
	import Portal from '../../Portal.svelte';
	import { offset, type Middleware, flip, shift, type Placement } from '@floating-ui/dom';
	import { setParentClick } from './set-parent-click.js';
	import { get } from 'svelte/store';
	import { setContextClick } from './set-context-click.js';
	import { addToModalOpenned, removeFromModalOpenned } from './escape-modals.svelte.js';
	import { onDestroy } from 'svelte';
	import { setAutoUpdate } from './set-auto-update.js';
	import { mouse } from '$lib/utils/mouse-position.svelte.js';
	import { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
	import { cn } from '$lib/utils/cn.js';
	import { createModal, getModal, type ModalProps } from './modal-remote.svelte.js';

	const parentModal = getModal();

	let p: ModalProps = $props();
	const middleware: Middleware[] = $derived(
		p.middleware ?? [offset(p.ModalOffset), flip(), shift({ padding: p.ModalShift })]
	);
	const placement: Placement = $derived(p.placement ?? 'bottom');
	const autoUpdate: boolean = $derived(!p.noAutoUpdate);
	const closeOnHide: boolean = $derived(!p.noCloseOnHide);
	const ModalOffset: number = $derived(p.ModalOffset ?? 10);
	const ModalShift: number = $derived(p.ModalShift ?? 24);

	// svelte-ignore state_referenced_locally
	export const remote = createModal(middleware, placement, autoUpdate, closeOnHide, parentModal);

	const isVisible = remote.isVisible;
	const modalElement = remote.modalElement;
	const { x, y } = remote.modalPosition;

	function configureAnchor(element: HTMLElement) {
		const parentElement = element.parentElement ?? undefined;
		remote.parentElement.set(parentElement);
		remote.contextElement.set(element);

		if (!p.noAnchorOpenOnClick) {
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
		const anchor = remote.onMouse ? createVirtualAnchor(mouse.x, mouse.y) : parentElement;
		if (!anchor) return;
		remote.positionModal(anchor, element);
		addToModalOpenned(remote);
		const removeAutoUpdate = setAutoUpdate(remote, element, anchor);
		const removeContextClick = p.noCloseOnOutsideClick
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
		const removeContextClick = p.noCloseOnOutsideClick
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
		if (!p.lockBackground) return;
		e.stopPropagation();
		if (p.noCloseOnOutsideClick) return;
		remote.close();
	}

	onDestroy(() => {
		remote.close();
		get(remote.modalElement)?.remove();
	});
</script>

{#if !p.noAnchor}
	<div class="hidden" use:configureAnchor></div>
{/if}

{#if $isVisible && !p.centered}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<Portal>
		<div
			role="none"
			onclick={backdropClick}
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				p.lockBackground && 'pointer-events-auto',
				p.backdropStyles
			)}
		></div>

		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			bind:this={$modalElement}
			role="dialog"
			id="modal"
			use:onModalMount
			in:fly={{ y: 20, duration: 80 }}
			class={cn(
				'pointer-events-auto fixed top-0 z-modal w-max overflow-hidden rounded-lg bg-white text-black shadow-lg dark:bg-blueBank80 dark:text-white',
				p.modalStyles
			)}
			style="top: {$y}px; left: {$x}px;"
			onclick={(e) => e.stopPropagation()}
			oncontextmenu={(e) => e.stopPropagation()}
		>
			{@render p.children?.()}
		</div>
	</Portal>
{:else if $isVisible}
	<Portal>
		<div
			onclick={backdropClick}
			role="none"
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				p.lockBackground && 'pointer-events-auto',
				p.backdropStyles
			)}
		></div>

		<div class="pointer-events-none fixed inset-0 z-modal flex items-center justify-center">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				role="dialog"
				bind:this={$modalElement}
				id="modal"
				use:onCenteredModalMount
				in:fly={{ y: 20, duration: 80 }}
				class={cn(
					'pointer-events-auto overflow-hidden rounded-lg bg-gradient-to-b from-white/[.45] to-white/[.58] text-black shadow-lg backdrop-blur-md backdrop-brightness-[1.13]  ',
					p.modalStyles
				)}
				onclick={(e) => e.stopPropagation()}
				oncontextmenu={(e) => e.stopPropagation()}
			>
				{@render p.children?.()}
			</div>
		</div>
	</Portal>
{/if}

{#if !$isVisible}
	{@render p.tooltip?.()}
{/if}
