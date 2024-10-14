import { autoUpdate } from '@floating-ui/dom';
import type { ModalRemote } from './modal-remote.svelte.js';
import type { virtualAnchor } from '$lib/types/types.js';

export function setAutoUpdate(
	remote: ModalRemote,
	modal: HTMLElement,
	anchor: HTMLElement | virtualAnchor
) {
	if (!remote.autoUpdate) return;
	if (remote.onMouse) return;

	function positionModal() {
		remote.positionModal(anchor, modal);
	}

	return autoUpdate(anchor, modal, positionModal);
}
