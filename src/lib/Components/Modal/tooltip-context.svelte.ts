import { mount, unmount, untrack, type ComponentProps } from 'svelte';
import Tooltip from '../Tooltip/Tooltip.svelte';
import { getModalContext } from './modal-context.svelte.js';
import { Subscribers } from '$lib/utils/subscribers.svelte.js';
import { on } from 'svelte/events';

type tooltipElement = ReturnType<typeof Tooltip>;
type tooltipRemote = tooltipElement['tooltip'];
type tooltipProps = ComponentProps<typeof Tooltip>;

const defaultTooltipProps: tooltipProps = {
	noDefaultAnchor: true
};

export class TooltipContext {
	specialProps?: () => tooltipProps = $state();
	readonly props: tooltipProps = $derived.by(() => {
		const specialProps = this.specialProps?.() ?? {};
		return { ...defaultTooltipProps, ...specialProps };
	});
	element: tooltipElement;
	remote: tooltipRemote;

	constructor() {
		this.element = mount(Tooltip, {
			target: document.querySelector('body')!,
			props: this.props
		});
		this.remote = this.element.tooltip;
	}

	unmount() {
		unmount(this.element);
	}

	setTooltipAction(props: () => tooltipProps, element: HTMLElement) {
		const tooltip = this.remote;
		return {
			enter: () => {
				if (!tooltip) return;
				this.specialProps = props;
				tooltip.customAnchor = this.props.onMouse ? undefined : element;
				tooltip.show();
			},
			leave: async () => {
				await tooltip?.hide(props().hideMS);
			}
		};
	}
}

export function initTooltip(element: HTMLElement, props: () => tooltipProps) {
	$effect(() => {
		const tooltip = getModalContext().tooltip;
		const { enter, leave } = untrack(() => tooltip.setTooltipAction(props, element));
		const subs = new Subscribers();
		subs.add(on(element, 'mouseenter', enter));
		subs.add(on(element, 'mouseleave', leave));

		return () => {
			tooltip.remote.hide(0);
			subs.unsubscribe();
		};
	});
}
