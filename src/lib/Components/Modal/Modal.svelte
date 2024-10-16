<script lang="ts">
	import { fly } from 'svelte/transition';
	import Portal from '$lib/Components/Portal.svelte';
	import { setParentClick } from './set-parent-click.js';
	import { setContextClick } from './set-context-click.js';
	import { untrack } from 'svelte';
	import { setAutoUpdate } from './set-auto-update.js';
	import { mouse } from '$lib/utils/mouse-position.svelte.js';
	import { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
	import { cn } from '$lib/utils/cn.js';
	import { createModal, getModal, type ModalProps } from './modal-remote.svelte.js';
	import { modalsOpenned } from './open-modals.svelte.js';
	import { ScrollManager } from './scroll-manager.js';

	const parentModal = getModal();

	let p: ModalProps = $props();
	export const modal = createModal(p, parentModal);

	function onInitAnchorMount(element: HTMLElement) {
		modal.anchor = element.parentElement ?? undefined;
		if (!modal.anchor) return;
		if (p.noOpenOnAnchorClick) return;
		return setParentClick(modal, modal.anchor);
	}

	function onModalMount(element: HTMLElement) {
		const anchor = modal.onMouse ? createVirtualAnchor(mouse.x, mouse.y) : modal.anchor;
		if (!anchor) return;
		modal.positionModal(anchor, element);
		modalsOpenned.add(modal);
		const scroll = new ScrollManager();
		scroll.stop(...modal.stopScrollElements);
		const removeAutoUpdate = setAutoUpdate(modal, element, anchor);
		const removeContextClick = p.noCloseOnOutsideClick
			? undefined
			: setContextClick(modal, modal.anchor);
		return {
			destroy: async () => {
				scroll.resume?.();
				modalsOpenned.remove(modal);
				removeAutoUpdate?.();
				removeContextClick?.();
			}
		};
	}

	function onCenteredModalMount(element: HTMLElement) {
		const parentElement = modal.anchor;
		modalsOpenned.add(modal);
		const scroll = new ScrollManager();
		scroll.stop(...modal.stopScrollElements);
		const removeContextClick = p.noCloseOnOutsideClick
			? undefined
			: setContextClick(modal, parentElement);
		return {
			destroy: async () => {
				scroll.resume?.();
				modalsOpenned.remove(modal);
				removeContextClick?.();
			}
		};
	}

	function backdropClick(e: Event) {
		if (!p.lockBackground) return;
		e.stopPropagation();
		if (p.noCloseOnOutsideClick) return;
		modal.close();
	}

	$effect(() => {
		return () => {
			untrack(() => {
				modal.close();
				modal.element?.remove();
			});
		};
	});
</script>

{#if !p.noAnchor}
	<div class="hidden" use:onInitAnchorMount></div>
{/if}

{#if modal.isVisible && !p.centered}
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
			bind:this={modal.element}
			role="dialog"
			id="modal"
			use:onModalMount
			in:fly={{ y: 20, duration: 80 }}
			class={cn(
				'pointer-events-auto fixed top-0 z-modal w-max overflow-hidden rounded-lg bg-white text-black shadow-lg dark:bg-blueBank80 dark:text-white',
				p.class
			)}
			style="top: {modal.position.y}px; left: {modal.position.x}px;"
			onclick={(e) => e.stopPropagation()}
			oncontextmenu={(e) => e.stopPropagation()}
		>
			{@render p.children?.()}
		</div>
	</Portal>
{:else if modal.isVisible}
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
				bind:this={modal.element}
				id="modal"
				use:onCenteredModalMount
				in:fly={{ y: 20, duration: 80 }}
				class={cn(
					'pointer-events-auto overflow-hidden rounded-lg bg-gradient-to-b from-white/[.45] to-white/[.58] text-black shadow-lg backdrop-blur-md backdrop-brightness-[1.13]  ',
					p.class
				)}
			>
				{@render p.children?.()}
			</div>
		</div>
	</Portal>
{/if}

{#if !modal.isVisible}
	{@render p.tooltip?.()}
{/if}
