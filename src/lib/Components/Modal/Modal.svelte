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
	import { getModalContext } from './modal-context.svelte.js';
	import CloseDialog from './CloseDialog.svelte';
	import type { ModalProps } from './modal-props.svelte.js';
	import { on } from 'svelte/events';
	import { Subscribers } from '$lib/utils/subscribers.svelte.js';

	const parentModal = getModal();
	const modalContext = getModalContext();

	let p: ModalProps = $props();
	export const modal = createModal({ p, modalContext, parentModal });

	function onInitAnchorMount(element: HTMLElement) {
		modal._defaultAnchor = element.parentElement ?? undefined;
	}

	function openViaAnchor() {
		if (modal.props.noOpenOnAnchorClick) return;
		modal.open();
	}

	$effect(() => {
		if (!modal.anchor) return;
		if (modal.props.noOpenOnAnchorClick) return;
		return on(modal.anchor, 'click', openViaAnchor);
	});

	function onModalMount(element: HTMLElement) {
		const mouseAnchor = createVirtualAnchor(mouse.x, mouse.y);
		$effect(() => {
			const anchor = modal._onMouse ? mouseAnchor : modal.anchor;
			if (!anchor) return;
			var scroll = new ScrollManager();
			scroll.stop(...modal.stopScrollElements);
			if (modal.props.noAutoUpdate || modal._onMouse) {
				modal.positionModal(anchor, element);
			} else {
				var removeAutoUpdate = setAutoUpdate(modal, element, anchor);
			}
			return () => {
				scroll.resume?.();
				removeAutoUpdate?.();
			};
		});
	}

	function onCenteredModalMount(element: HTMLElement) {
		$effect(() => {
			const scroll = new ScrollManager();
			scroll.stop(...modal.stopScrollElements);
			return () => {
				scroll.resume?.();
			};
		});
	}

	$effect(() => {
		return () => {
			untrack(() => {
				if (modal.isVisible) modal.close();
				modal.element?.remove();
			});
		};
	});

	$effect(() => {
		const anchor = modal.anchor;
		const tooltipContext = modal._modalContext.tooltip;
		if (!modal.isVisible && anchor && tooltipContext && modal.props.tooltip) {
			const { enter, leave } = tooltipContext.setTooltipAction(
				() => ({ ...modal.props.tooltipProps, children: modal.props.tooltip }),
				anchor
			);
			const subs = new Subscribers();
			subs.add(on(anchor, 'mouseenter', enter));
			subs.add(on(anchor, 'mouseleave', leave));
			return () => {
				tooltipContext.remote.hide(0);
				subs.unsubscribe();
			};
		}
	});
</script>

{#if !modal.props.noAnchor}
	<div class="hidden" use:onInitAnchorMount></div>
{/if}

{#if modal.isVisible && !modal.props.centered}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<Portal>
		<div
			role="none"
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				modal.props.lockBackground && 'pointer-events-auto',
				modal.props.backdropStyles
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
				modal.props.class
			)}
			style="top: {modal.position.y}px; left: {modal.position.x}px;"
		>
			{@render modal.props.children?.(modal)}
		</div>
		{#if modal.props.portal}
			<div class="fixed inset-0">
				{@render modal.props.portal()}
			</div>
		{/if}
	</Portal>
{:else if modal.isVisible}
	<Portal>
		<div
			role="none"
			class={cn(
				'pointer-events-none fixed inset-0 z-modal',
				modal.props.lockBackground && 'pointer-events-auto',
				modal.props.backdropStyles
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
					modal.props.class
				)}
			>
				{@render modal.props.children?.(modal)}
			</div>
		</div>
		{#if modal.props.portal}
			{@render modal.props.portal()}
		{/if}
	</Portal>
{/if}

<!-- {#if !modal.isVisible}
	{@render p.tooltip?.()}
{/if} -->

<CloseDialog {modal} />
