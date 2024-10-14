import { autoUpdate } from '@floating-ui/dom';
import type { SimpleModalRemote, virtualAnchor } from './simple-modal-remote.js';

export function setAutoUpdate(
	remote: SimpleModalRemote,
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
