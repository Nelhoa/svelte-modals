import type { ModalRemote } from './modal-remote.svelte.js';
import { on } from 'svelte/events';

export function setParentClick(remote: ModalRemote) {
	if (!remote.parentElement) return;
	const cleanup = on(remote.parentElement, 'click', remote.switch.bind(remote));
	return cleanup;
}
