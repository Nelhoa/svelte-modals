<script lang="ts">
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { computePosition, autoUpdate } from '@floating-ui/dom';
	import Portal from '$lib/Components/Portal.svelte';
	import { cn } from '$lib/utils/cn.js';
	import { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
	import type { SvelteTransition, virtualAnchor } from '$lib/types/types.js';
	import { createTooltip, type TooltipProps } from './tooltip-remote.svelte.js';
	import { mouse } from '$lib/utils/mouse-position.svelte.js';

	let p: TooltipProps = $props();
	export const tooltip = createTooltip(p);

	const inTransition: SvelteTransition = $derived(p.in ?? ((node) => fly(node, { y: 10 })));
	const outTransition: SvelteTransition = $derived(p.out ?? (() => ({}) as TransitionConfig));
	const { x, y } = $derived(tooltip.position.current);

	let firstPositionned = false;
	export function position(anchor: HTMLElement | virtualAnchor, element: HTMLElement) {
		computePosition(anchor, element, {
			placement: tooltip.placement,
			middleware: tooltip.middleware
		}).then(({ x, y }) => {
			const duration = firstPositionned ? 0 : (p.tweenDuration ?? 0);
			firstPositionned = false;
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			tooltip.setPosition({ x: x - scrollX, y: y - scrollY }, { duration });
		});
	}

	$effect(() => {
		if (!p.onMouse && tooltip.isVisible && tooltip.element && tooltip.anchor) {
			var clean = autoUpdate(tooltip.anchor, tooltip.element, () => {
				if (tooltip.anchor && tooltip.element) position(tooltip.anchor, tooltip.element);
			});
		}
		return () => {
			clean?.();
		};
	});

	$effect(() => {
		if (p.onMouse && tooltip.isVisible && tooltip.element) {
			const mouseAnchor = createVirtualAnchor(mouse.x, mouse.y);
			position(mouseAnchor, tooltip.element);
		}
	});

	let lastVisible = tooltip.isVisible;

	$effect(() => {
		if (tooltip.isVisible && !lastVisible) {
			firstPositionned = true;
		}
		lastVisible = tooltip.isVisible;
	});

	function onInitAnchorMount(e: HTMLDivElement) {
		if (!e.parentElement) return;
		const cleanup = tooltip.initAnchorListeners(e.parentElement);
		return cleanup;
	}
</script>

{#if !p.noDefaultAnchor}
	<div class="hidden" use:onInitAnchorMount></div>
{/if}

{#if tooltip.isVisible}
	<Portal>
		<div
			in:inTransition
			out:outTransition
			bind:this={tooltip.element}
			class={cn(
				'pointer-events-none fixed left-(--x) top-(--y) z-modal rounded-sm bg-white shadow-sm',
				p.class
			)}
			style="--x: {x}px; --y: {y}px"
		>
			{@render p.children?.()}
		</div>
	</Portal>
{/if}
