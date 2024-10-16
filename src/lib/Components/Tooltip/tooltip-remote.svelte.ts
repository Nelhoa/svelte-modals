import type { SvelteTransition } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { isPhone } from '$lib/utils/const.js';
import { flip, offset, shift, type Middleware, type Placement } from '@floating-ui/dom';
import { Store } from 'runed';
import type { Snippet } from 'svelte';
import { on } from 'svelte/events';
import { tweened, type TweenedOptions } from 'svelte/motion';

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
}

export class TooltipRemote {
	#p: TooltipProps = $state()!;
	anchor: HTMLElement | undefined | null = $state();
	element: HTMLElement | undefined | null = $state();
	#isVisible = $state(false);
	#x = tweened(0, { duration: 0 });
	#y = tweened(0, { duration: 0 });
	x = new Store(this.#x);
	y = new Store(this.#y);
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
		this.anchor = anchor;
		const destroys = [
			on(anchor, 'mouseenter', this.#onAnchorMouseEnter.bind(this)),
			on(anchor, 'mouseleave', this.#onAnchorMouseLeave.bind(this))
		];
		return {
			destroy: () => destroys.forEach((i) => i())
		};
	}

	setPosition({ x, y }: { x: number; y: number }, options: TweenedOptions<number>) {
		this.#x.set(x, options);
		this.#y.set(y, options);
	}

	show() {
		if (this.#p.disabled) return;
		if (isPhone() && !this.#p.enableOnMobile) return;
		this.#isVisible = true;
	}

	hide() {
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
