import { get } from 'svelte/store';
import type { SimpleModalRemote } from './simple-modal-remote.js';

export function setParentClick(remote: SimpleModalRemote) {
	function openMenu() {
		remote.switch();
	}

	const parentElement = get(remote.parentElement);
	parentElement?.addEventListener('click', openMenu);

	return () => parentElement?.removeEventListener('click', openMenu);
}
