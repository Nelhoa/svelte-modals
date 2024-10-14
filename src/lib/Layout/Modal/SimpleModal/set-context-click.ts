import type { SimpleModalRemote } from './simple-modal-remote.js';
import { wait } from '$lib/utils/Public/wait';

export function setContextClick(remote: SimpleModalRemote, anchor?: HTMLElement) {
	const parentModal = anchor?.closest('#modal') as HTMLElement | null | undefined;
	function close(event: Event) {
		remote.close({ focusParent: false, event });
	}

	async function waitAndSetContextClick() {
		await wait(20);
		parentModal?.addEventListener('click', close);
		parentModal?.addEventListener('contextmenu', close);
		window?.addEventListener('click', close);
		window?.addEventListener('contextmenu', close);
	}

	waitAndSetContextClick();

	return () => {
		parentModal?.removeEventListener('click', close);
		parentModal?.removeEventListener('contextmenu', close);
		window?.removeEventListener('click', close);
		window?.removeEventListener('contextmenu', close);
	};
}
