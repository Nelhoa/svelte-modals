import { autoUpdate } from '@floating-ui/dom';
import type { ModalRemote } from './modal-remote.svelte.js';
import type { virtualAnchor } from '$lib/types/types.js';

export function setAutoUpdate(
	modal: ModalRemote,
	element: HTMLElement,
	anchor: HTMLElement | virtualAnchor
) {
	if (!modal.autoUpdate) return;
	if (modal.onMouse) return;

	function positionModal() {
		modal.positionModal(anchor, element);
	}

	return autoUpdate(anchor, element, positionModal, { ancestorScroll: true });
}
