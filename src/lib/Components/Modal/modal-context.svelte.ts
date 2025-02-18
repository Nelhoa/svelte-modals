import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import type { ModalRemote } from './modal.svelte.js';
import type { TooltipContext } from './tooltip-context.svelte.js';

export class ModalContextRemote {
	event?: Event;
	#tooltip?: TooltipContext = $state();
	eventTarget?: EventTarget | null;
	rootModalOpenned?: ModalRemote = $state();
	everyModalOpenned: ModalRemote[] = $state.raw([]);
	opennedAtCaptureTime: { modal: ModalRemote; element?: HTMLElement }[] = [];
	openning?: ModalRemote;

	get tooltip() {
		return this.#tooltip!;
	}

	set tooltip(v) {
		this.#tooltip = v;
	}

	preventWindowClick() {
		this.event = undefined;
	}

	escapeModals(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		const firstModal = this.everyModalOpenned[0];
		firstModal?.contextClose();
	}

	addToModalOpenned(modal: ModalRemote) {
		this.openning = modal;
		const parentModal = modal.parentModal;
		this.removeFromModalOpenned(modal);
		this.everyModalOpenned = [modal, ...this.everyModalOpenned];
		if (parentModal) {
			parentModal.childModalOpenned = modal;
		} else {
			this.rootModalOpenned = modal;
		}
	}

	removeFromModalOpenned(modal: ModalRemote) {
		const parentModal = modal.parentModal;
		this.everyModalOpenned = this.everyModalOpenned.filter((i) => i !== modal);
		if (parentModal && parentModal.childModalOpenned === modal) {
			parentModal.childModalOpenned = undefined;
		} else if (this.rootModalOpenned === modal) {
			this.rootModalOpenned = undefined;
		}
	}

	captureContextEvent(event: Event) {
		this.openning = undefined;
		this.event = event;
		this.eventTarget = event.target;
		this.opennedAtCaptureTime = this.everyModalOpenned.map((i) => ({
			modal: i,
			element: i.element
		}));
	}

	private getTargetedRootModals(
		target: Node,
		opennedAtCaptureTime: { modal: ModalRemote; element?: HTMLElement }[]
	) {
		for (const openned of opennedAtCaptureTime) {
			if (!openned.element?.contains(target)) continue;
			return openned.modal.childModalOpenned;
		}
		return this.rootModalOpenned;
	}

	windowClick() {
		const exception = [this.openning];
		const target = this.eventTarget;
		const opennedAtCaptureTime = [...this.opennedAtCaptureTime];
		this.opennedAtCaptureTime = [];
		this.openning = undefined;
		this.eventTarget = undefined;
		this.event = undefined;

		if (opennedAtCaptureTime.length === 0) return;
		if (!(target instanceof Node)) return;
		const branchToClose = this.getTargetedRootModals(target, opennedAtCaptureTime);
		branchToClose?.contextClose(exception);
	}
}

const remote = newRemote('modalContext', ModalContextRemote);
export const createModalContextRemote = remote.create;

export function getModalContext() {
	const modalContext = remote.get();
	if (!modalContext)
		throw Error('No modal context found. Add a ModalContext component on your top layout.');
	return modalContext;
}
