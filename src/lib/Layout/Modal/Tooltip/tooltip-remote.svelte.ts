import type { SvelteTransition } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { isPhone } from '$lib/utils/const.js';
import type { Middleware, Placement } from '@floating-ui/dom';
import { Store } from 'runed';
import type { Snippet } from 'svelte';
import { on } from 'svelte/events';
import { tweened, type TweenedOptions } from 'svelte/motion';

export interface TooltipProps {
	children?: Snippet;
	modalOffset?: number;
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
	#props: TooltipProps = $state()!;
	anchor: HTMLElement | undefined | null = $state();
	element: HTMLElement | undefined | null = $state();
	#isVisible = $state(false);
	#x = tweened(0, { duration: 0 });
	#y = tweened(0, { duration: 0 });
	x = new Store(this.#x);
	y = new Store(this.#y);

	get isVisible() {
		return this.#isVisible;
	}

	constructor(props: TooltipProps) {
		this.#props = props;
	}

	initAnchorListeners(anchor: HTMLElement) {
		this.anchor = anchor;
		const destroys = [
			on(anchor, 'mouseenter', this.#onAnchorMouseEnter.bind(this)),
			on(anchor, 'mouseleave', this.#onAnchorMouseLeave.bind(this))
		];
		return {
			destroy: () => {
				destroys.forEach((i) => i());
				console.log('clean');
			}
		};
	}

	setPosition({ x, y }: { x: number; y: number }, options: TweenedOptions<number>) {
		this.#x.set(x, options);
		this.#y.set(y, options);
	}

	show() {
		if (this.#props.disabled) return;
		if (isPhone() && !this.#props.enableOnMobile) return;
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

export const { create: createTooltip, get: getTooltip } = newRemote('tooltip', TooltipRemote);
