import type { SvelteTransition } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { isPhone } from '$lib/utils/const.js';
import { wait } from '$lib/utils/wait.js';
import { flip, offset, shift, type Middleware, type Placement } from '@floating-ui/dom';
import { untrack, type Snippet } from 'svelte';
import { on } from 'svelte/events';
import { tweened } from 'svelte/motion';
import { fromStore } from 'svelte/store';

type tweenedOptions = Parameters<ReturnType<typeof tweened<number>>['set']>[1];

export interface TooltipProps {
	children?: Snippet;
	modalOffset?: number;
	ModalShift?: number;
	middleware?: Middleware[];
	placement?: Placement;
	tweenDuration?: number;
	disabled?: boolean;
	enableOnMobile?: boolean;
	onMouse?: boolean;
	class?: string;
	in?: SvelteTransition;
	out?: SvelteTransition;
	noDefaultAnchor?: boolean;
	hideMS?: number;
}

export class TooltipRemote {
	currentHides: Symbol[] = [];
	#p: TooltipProps = $state()!;
	#hideMS = $derived(this.#p?.hideMS !== undefined ? this.#p.hideMS : 150);
	defaultAnchor: HTMLElement | undefined | null = $state();
	customAnchor = $state<HTMLElement>();
	anchor = $derived(this.customAnchor ?? this.defaultAnchor);
	element: HTMLElement | undefined | null = $state();
	#isVisible = $state(false);
	#x = tweened(0, { duration: 0 });
	#y = tweened(0, { duration: 0 });
	x = fromStore(this.#x);
	y = fromStore(this.#y);
	cleanupAutoUpdate?: () => void;
	placement = $derived(this.#p.placement ?? 'bottom');
	middleware = $derived(
		this.#p.middleware ?? [
			offset(this.#p.modalOffset ?? 10),
			flip(),
			shift({ padding: this.#p.ModalShift ?? 24 })
		]
	);

	get isVisible() {
		return this.#isVisible;
	}

	constructor(props: TooltipProps) {
		this.#p = props;
	}

	initAnchorListeners(anchor: HTMLElement) {
		this.defaultAnchor = anchor;
		const destroys = [
			on(anchor, 'mouseenter', this.#onAnchorMouseEnter.bind(this)),
			on(anchor, 'mouseleave', this.#onAnchorMouseLeave.bind(this))
		];
		return {
			destroy: () => destroys.forEach((i) => i())
		};
	}

	setPosition({ x, y }: { x: number; y: number }, options: tweenedOptions) {
		this.#x.set(x, options);
		this.#y.set(y, options);
	}

	show() {
		if (this.#p.disabled) return;
		if (isPhone() && !this.#p.enableOnMobile) return;
		this.currentHides = [];
		this.#isVisible = true;
	}

	async hide() {
		const hideSymbol = Symbol();
		this.currentHides.push(hideSymbol);
		await wait(this.#hideMS);
		if (!this.currentHides.includes(hideSymbol)) return;
		this.currentHides = this.currentHides.filter((i) => i !== hideSymbol);
		this.#isVisible = false;
	}

	#onAnchorMouseEnter() {
		this.show();
	}

	#onAnchorMouseLeave() {
		this.hide();
	}
}

const remote = newRemote('tooltip', TooltipRemote);
export const createTooltip = remote.create;
export const getTooltip = remote.get;
