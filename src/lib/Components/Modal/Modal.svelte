<script lang="ts">
	import { fly } from 'svelte/transition';
	import Portal from '$lib/Components/Portal.svelte';
	import { untrack } from 'svelte';
	import { setAutoUpdate } from './set-auto-update.js';
	import { mouse } from '$lib/utils/mouse-position.svelte.js';
	import { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
	import { cn } from '$lib/utils/cn.js';
	import { createModal, getModal } from './modal-remote.svelte.js';
	import { ScrollManager } from './scroll-manager.js';
	import { getModalContext } from './modal-context-remote.svelte.js';
	import CloseDialog from './CloseDialog.svelte';
	import type { ModalProps } from './modal-props.svelte.js';
	import { on } from 'svelte/events';

	const parentModal = getModal();
	const modalContext = getModalContext();

	let p: ModalProps = $props();
	export const modal = createModal({ p, modalContext, parentModal });

	function onInitAnchorMount(element: HTMLElement) {
		modal.defaultAnchor = element.parentElement ?? undefined;
	}

	$effect(() => {
		if (!modal.anchor) return;
		if (p.noOpenOnAnchorClick) return;
		return on(modal.anchor, 'click', modal.open.bind(modal));
	});

	function onModalMount(element: HTMLElement) {
		const anchor = modal.onMouse ? createVirtualAnchor(mouse.x, mouse.y) : modal.anchor;
		if (!anchor) return;
		modal.positionModal(anchor, element);
		const scroll = new ScrollManager();
		scroll.stop(...modal.stopScrollElements);
		const removeAutoUpdate = setAutoUpdate(modal, element, anchor);
		return {
			destroy: async () => {
				scroll.resume?.();
				removeAutoUpdate?.();
			}
		};
	}

	function onCenteredModalMount(element: HTMLElement) {
		const scroll = new ScrollManager();
		scroll.stop(...modal.stopScrollElements);
		return {
			destroy: async () => {
				scroll.resume?.();
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

{#if !p.noAnchor && !p.anchor}
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
				'pointer-events-auto fixed top-0 z-modal w-max overflow-hidden rounded-lg bg-white text-black shadow-lg',
				p.class
			)}
			style="top: {modal.position.y}px; left: {modal.position.x}px;"
		>
			{@render p.children?.()}
		</div>
		{#if p.portal}
			<div class="fixed inset-0">
				{@render p.portal()}
			</div>
		{/if}
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
					'pointer-events-auto overflow-hidden rounded-lg bg-linear-to-b from-white/[.45] to-white/[.58] text-black shadow-lg backdrop-blur-md backdrop-brightness-[1.13]  ',
					p.class
				)}
			>
				{@render p.children?.()}
			</div>
		</div>
		{#if p.portal}
			{@render p.portal()}
		{/if}
	</Portal>
{/if}

{#if !modal.isVisible}
	{@render p.tooltip?.()}
{/if}

<CloseDialog {modal} />
