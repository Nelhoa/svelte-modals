import { autoUpdate } from '@floating-ui/dom';
import type { ModalRemote } from './modal.svelte.js';
import type { virtualAnchor } from '$lib/types/types.js';

export function setAutoUpdate(
	modal: ModalRemote,
	element: HTMLElement,
	anchor: HTMLElement | virtualAnchor
) {
	function positionModal() {
		modal.positionModal(anchor, element);
	}

	return autoUpdate(anchor, element, positionModal, { ancestorScroll: true });
}
