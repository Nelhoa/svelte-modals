import { wait } from '$lib/utils/wait.js';
import { on } from 'svelte/events';
import type { ModalRemote } from './modal-remote.svelte.js';

export function setContextClick(remote: ModalRemote, anchor?: HTMLElement) {
	const parentModal = anchor?.closest('#modal') as HTMLElement | null | undefined;

	let destroys: (() => void)[] = [];
	function close(event: Event) {
		remote.close({ focusParent: false, event });
	}

	async function waitAndSetContextClick() {
		await wait(20);
		if (parentModal) {
			destroys.push(on(parentModal, 'click', close));
			destroys.push(on(parentModal, 'contextmenu', close));
		}
		if (window) {
			destroys.push(on(window, 'click', close));
			destroys.push(on(window, 'contextmenu', close));
		}
	}

	waitAndSetContextClick();

	return () => {
		destroys.forEach((i) => i());
	};
}
