import { untrack } from 'svelte';
import { createModalContextRemote } from './modal-context-remote.svelte.js';
import { on } from 'svelte/events';

export function initModalContext() {
	const modalContext = createModalContextRemote();

	$effect(() => {
		console.log('set modal context');
		const subs = new Subscribers();

		untrack(() => {
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
			modalContext.everyModalOpenned = [];
			modalContext.rootModalOpenned = undefined;
			subs.unsubscribe();
			console.log('clean modal context');
		};
	});
}

type unsubscriber = () => unknown;

class Subscribers {
	#list: unsubscriber[] = [];

	add(unsubscriber: unsubscriber) {
		this.#list.push(unsubscriber);
	}

	unsubscribe() {
		this.#list.forEach((i) => i());
		this.#list = [];
	}
}
