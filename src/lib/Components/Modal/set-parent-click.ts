import type { ModalRemote } from './modal-remote.svelte.js';
import { on } from 'svelte/events';

export function setParentClick(modal: ModalRemote, parent: HTMLElement) {
	const cleanup = on(parent, 'click', modal.switch.bind(modal));
	return { destroy: cleanup };
}
