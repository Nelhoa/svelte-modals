import type { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';
import type { TransitionConfig } from 'svelte/transition';

export type SvelteTransition = (node: Element) => TransitionConfig;
export type virtualAnchor = ReturnType<typeof createVirtualAnchor>;
