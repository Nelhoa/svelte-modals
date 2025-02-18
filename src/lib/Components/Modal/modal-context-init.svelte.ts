import { untrack } from 'svelte';
import { createModalContextRemote } from './modal-context.svelte.js';
import { on } from 'svelte/events';
import { TooltipContext } from './tooltip-context.svelte.js';
import { Subscribers } from '$lib/utils/subscribers.svelte.js';

export function initModalContext() {
	const modalContext = createModalContextRemote();

	$effect(() => {
		console.log('set modal context');
		const subs = new Subscribers();

		untrack(() => {
			const tooltipContext = new TooltipContext();
			modalContext.tooltip = tooltipContext;
			subs.add(tooltipContext.unmount.bind(tooltipContext));

			const onclick = () => modalContext.windowClick();
			const oncontextmenu = () => modalContext.windowClick();
			const onkeydown = (e: KeyboardEvent) => modalContext.escapeModals(e);
			const capture = (e: Event) => modalContext.captureContextEvent(e);

			subs.add(on(window, 'click', capture, { capture: true }));
			subs.add(on(window, 'contextmenu', capture, { capture: true }));
			subs.add(on(window, 'click', onclick));
			subs.add(on(window, 'contextmenu', oncontextmenu));
			subs.add(on(window, 'keydown', onkeydown));
		});

		return () => {
			console.log('clean modal context');
			modalContext.everyModalOpenned = [];
			modalContext.rootModalOpenned = undefined;
			subs.unsubscribe();
		};
	});
}
