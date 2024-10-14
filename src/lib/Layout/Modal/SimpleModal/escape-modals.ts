import { organisation } from '$lib/stores/organisations-store';
import { get } from 'svelte/store';
import type { SimpleModalRemote } from './simple-modal-remote.js';

let ModalOpened: SimpleModalRemote[] = [];

export function escapeModal(event: KeyboardEvent) {
	if (event.key === 'Escape') closeFirstModal();
}

export function addToModalOpenned(remote: SimpleModalRemote) {
	ModalOpened = [remote, ...ModalOpened];
}

export function removeFromModalOpenned(remote: SimpleModalRemote) {
	ModalOpened = ModalOpened.filter((i) => i !== remote);
}

function closeFirstModal() {
	const modalToClose = ModalOpened[0];
	if (modalToClose) return modalToClose.close();
	const orga = get(organisation);
	orga?.unselectCategory();
}
