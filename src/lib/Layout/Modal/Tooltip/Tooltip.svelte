<script lang="ts">
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { computePosition, offset, shift, autoUpdate, flip } from '@floating-ui/dom';
	import Portal from '$lib/Layout/Portal.svelte';
	import { cn } from '$lib/utils/cn.js';
	import { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
	import type { SvelteTransition, virtualAnchor } from '$lib/types/types.js';
	import { createTooltip, type TooltipProps } from './tooltip-remote.svelte.js';
	import { mouse } from '$lib/utils/mouse-position.svelte.js';

	let p: TooltipProps = $props();
	export const tooltip = createTooltip(p);

	const inTransition: SvelteTransition = $derived(p.in ?? ((node) => fly(node, { y: 10 })));
	const outTransition: SvelteTransition = $derived(p.out ?? (() => ({}) as TransitionConfig));

	$effect(() => {
		if (p.onMouse && tooltip.isVisible && tooltip.element) {
			const mouseAnchor = createVirtualAnchor(mouse.x, mouse.y);
			positionFunction(mouseAnchor, tooltip.element);
		}
	});

	let firstPositionned = $state(false);

	function positionFunction(anchor: HTMLElement | virtualAnchor, element: HTMLElement) {
		computePosition(anchor, element, {
			placement: p.placement ?? 'bottom',
			middleware: p.middleware ?? [offset(p.modalOffset), flip(), shift({ padding: 24 })]
		}).then(({ x, y }) => {
			const duration = firstPositionned ? (p.tweenDuration ?? 0) : 0;
			tooltip.setPosition({ x, y }, { duration });
			firstPositionned = true;
		});
	}

	function onTooltipMount(e: HTMLDivElement) {
		if (p.onMouse) return;
		if (!tooltip.anchor) return;
		const cleanup = autoUpdate(tooltip.anchor, e, () => {
			if (tooltip.anchor) positionFunction(tooltip.anchor, e);
		});
		return {
			destroy: () => {
				firstPositionned = false;
				cleanup();
			}
		};
	}

	function onInitAnchorMount(e: HTMLDivElement) {
		if (!e.parentElement) return;
		const cleanup = tooltip.initAnchorListeners(e.parentElement);
		return cleanup;
	}
</script>

<div class="hidden" use:onInitAnchorMount></div>

{#if tooltip.isVisible}
	<Portal>
		<div
			in:inTransition
			out:outTransition
			bind:this={tooltip.element}
			class={cn(
				'pointer-events-none fixed left-[--x] top-[--y] z-modal rounded bg-white shadow',
				p.class
			)}
			style="--x: {tooltip.x.current}px; --y: {tooltip.y.current}px"
			use:onTooltipMount
		>
			{@render p.children?.()}
		</div>
	</Portal>
{/if}
