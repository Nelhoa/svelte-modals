import { wait } from '$lib/utils/wait.js';
import type { ModalRemote } from './modal-remote.svelte.js';

export function setContextClick(remote: ModalRemote, anchor?: HTMLElement) {
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
