import { on } from 'svelte/events';
import type { ModalRemote } from './modal-remote.svelte.js';

let ModalOpened: ModalRemote[] = [];

function escapeModal(event: KeyboardEvent) {
	if (event.key === 'Escape') closeFirstModal();
}

function addToModalOpenned(remote: ModalRemote) {
	ModalOpened = [remote, ...ModalOpened];
}

function removeFromModalOpenned(remote: ModalRemote) {
	ModalOpened = ModalOpened.filter((i) => i !== remote);
}

function closeFirstModal() {
	const modalToClose = ModalOpened[0];
	if (modalToClose) return modalToClose.close();
}

let init = false;

export function initModalEscaper() {
	if (init) return;
	console.log('init');
	$effect.root(() => {
		$effect(() => {
			on(window, 'keydown', escapeModal);
		});
	});
	init = true;
}

export const modalsOpenned = {
	add: addToModalOpenned,
	remove: removeFromModalOpenned
};
