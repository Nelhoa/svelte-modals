import { wait } from '$lib/utils/wait.js';
import { on } from 'svelte/events';
import type { ModalRemote } from './modal-remote.svelte.js';

/**
 * Objectif
 * Mettre une fonction globale de clique sur window
 * On regarde si la target appartient à l’une des modales
 * Si oui on lui fait fermer toutes les modales enfants, en partant de la fin
 */

export function setContextClick(modal: ModalRemote, anchor?: HTMLElement) {
	const parentModal = anchor?.closest('#modal') as HTMLElement | null | undefined;

	const destroys: (() => void)[] = [];
	function close(event: Event) {
		if (event.target instanceof Node && modal.element?.contains(event.target)) return;
		modal.close({ focusParent: false, event });
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
