import type { ModalRemote } from './modal-remote.svelte.js';
import { on } from 'svelte/events';

export function setParentClick(remote: ModalRemote) {
	function openMenu() {
		remote.switch();
	}

	if (!remote.parentElement) return;
	const cleanup = on(remote.parentElement, 'click', openMenu);

	return cleanup;
}
