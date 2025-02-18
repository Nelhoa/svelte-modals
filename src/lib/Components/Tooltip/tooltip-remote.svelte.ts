import type { SvelteTransition } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { isPhone } from '$lib/utils/const.js';
import { wait } from '$lib/utils/wait.js';
import { flip, offset, shift, type Middleware, type Placement } from '@floating-ui/dom';
import { type Snippet } from 'svelte';
import { on } from 'svelte/events';
import { Tween } from 'svelte/motion';
import type Tooltip from './Tooltip.svelte';
import type { ModalContextRemote } from '../Modal/modal-context.svelte.js';
import { cn } from '$lib/utils/cn.js';

type tweenType<T> = InstanceType<typeof Tween<T>>;
type tweenOptions<T> = Parameters<tweenType<T>['set']>['1'];
export type TooltipElement = ReturnType<typeof Tooltip>;

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
	currentHides: symbol[] = [];
	specialProps?: () => TooltipProps = $state();
	private modalContext: ModalContextRemote;
	#p: TooltipProps = $state()!;
	readonly props: TooltipProps = $derived.by(() => ({
		...this.modalContext.defaultTooltipProps,
		...this.#p,
		...this.specialProps?.(),
		class: cn(
			this.modalContext.defaultTooltipProps.class,
			this.#p.class,
			this.specialProps?.().class
		)
	}));
	defaultAnchor: HTMLElement | undefined | null = $state();
	customAnchor = $state<HTMLElement>();
	anchor = $derived(this.customAnchor ?? this.defaultAnchor);
	element: HTMLElement | undefined | null = $state();
	#isVisible = $state(false);
	position = new Tween({ x: 0, y: 0 }, { duration: 0 });
	cleanupAutoUpdate?: () => void;
	placement = $derived(this.props.placement ?? 'bottom');
	middleware = $derived(
		this.props.middleware ?? [
			offset(this.props.modalOffset ?? 10),
			flip(),
			shift({ padding: this.props.ModalShift ?? 24 })
		]
	);

	get isVisible() {
		return this.#isVisible;
	}

	constructor(props: TooltipProps, modalContext: ModalContextRemote) {
		this.modalContext = modalContext;
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

	setPosition(
		newPosition: { x: number; y: number },
		options: tweenOptions<{ x: number; y: number }>
	) {
		this.position.set(newPosition, options);
	}

	show() {
		if (this.props.disabled) return;
		if (isPhone() && !this.props.enableOnMobile) return;
		this.currentHides = [];
		this.#isVisible = true;
	}

	async hide(ms?: number | null, callback?: () => unknown) {
		const hideMS = ms ?? this.props.hideMS;
		if (hideMS && ms !== null) {
			const hideSymbol = Symbol();
			this.currentHides.push(hideSymbol);
			await wait(hideMS);
			if (!this.currentHides.includes(hideSymbol)) return;
			this.currentHides = this.currentHides.filter((i) => i !== hideSymbol);
		}
		this.#isVisible = false;
		callback?.();
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
