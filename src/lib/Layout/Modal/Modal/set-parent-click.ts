import { get } from 'svelte/store';
import type { ModalRemote } from './modal-remote.svelte.js';

export function setParentClick(remote: ModalRemote) {
	function openMenu() {
		remote.switch();
	}

	const parentElement = get(remote.parentElement);
	parentElement?.addEventListener('click', openMenu);

	return () => parentElement?.removeEventListener('click', openMenu);
}
