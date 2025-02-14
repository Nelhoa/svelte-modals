/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	computePosition,
	flip,
	hide,
	offset,
	shift,
	type Middleware,
	type Placement
} from '@floating-ui/dom';
import type { virtualAnchor } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { wait } from '$lib/utils/wait.js';
import type { ModalContextRemote } from './modal-context-remote.svelte.js';
import type Modal from './Modal.svelte';
import type { ModalProps, Shallow } from './modal-props.svelte.js';

export type ModalElement = ReturnType<typeof Modal>;
export type closeContext = 'outsideContextmenu' | 'outsideClick' | 'escape' | 'force';

const MODAL_ATTRIBUTE = 'data-modal';
export class ModalRemote {
	p: ModalProps = $state()!;
	closeDialogElement?: ReturnType<typeof Modal> = $state();
	closeDialog = $derived(this.closeDialogElement?.modal);
	modalContext: ModalContextRemote;
	parentModal?: ModalRemote;
	childModalOpenned?: ModalRemote = $state();
	onMouse = $state(false);
	anchor?: HTMLElement = $state();
	element?: HTMLElement = $state();
	#isVisibleBase = $state(false);
	#isVisible = $derived(
		Boolean(
			this.p.shallow ? this.p.shallow.page.state[this.p.shallow.stateName] : this.#isVisibleBase
		)
	);
	position = $state({ x: 0, y: 0 });
	placement: Placement = $derived(this.p.placement ?? 'bottom');
	autoUpdate: boolean = $derived(!this.p.noAutoUpdate);
	closeOnHide: boolean = $derived(!this.p.noCloseOnHide);
	middleware: Middleware[] = $derived(
		this.p.middleware ?? [
			offset(this.p.ModalOffset ?? 10),
			flip(),
			shift({ padding: this.p.ModalShift ?? 24 })
		]
	);

	get stopScrollElements() {
		return this.p.stopScrollElements?.(this) ?? [];
	}

	get isVisible() {
		return this.#isVisible;
	}

	constructor(params: {
		p: ModalProps;
		modalContext: ModalContextRemote;
		parentModal?: ModalRemote;
	}) {
		this.p = params.p;
		this.parentModal = params.parentModal;
		this.modalContext = params.modalContext;
		this.checkShallowStack();
	}

	checkShallowStack() {
		if (!this.p.shallow) return;
		if (!this.parentModal?.hasShallowAncestors) return;
		throw Error(`Modal Error : Can't stack shallow routed modals`);
	}

	hasShallowAncestors(): boolean {
		const parentShallow = this.parentModal?.hasShallowAncestors();
		return Boolean(this.p.shallow || parentShallow);
	}

	getShallowState(state: Record<string, any>) {
		this.parentModal?.getShallowState(state);
		const shallow = this.p.shallow;
		if (shallow) state[shallow.stateName] = true;
	}

	openState(shallow: Shallow) {
		const newState: Record<string, any> = {};
		this.getShallowState(newState);
		shallow.pushState('', newState);
	}

	closeState() {
		history.back();
	}

	declareOpenned() {
		this.modalContext.addToModalOpenned(this);
	}

	declareClosed() {
		this.modalContext.removeFromModalOpenned(this);
	}

	getDeepestModalOpenned(): ModalRemote {
		return this.childModalOpenned?.getDeepestModalOpenned() ?? this;
	}

	open() {
		if (!this.canOpenModal()) return;
		this.getSister()?.closeModal();
		if (this.modalContext.opennedAtCaptureTime.map((i) => i.modal).includes(this)) return;

		const shallow = this.p.shallow;
		if (shallow) return this.openState(shallow);
		this.p.callbacks?.show?.(this);
		this.#isVisibleBase = true;
		this.setAnchorState('open');
		this.declareOpenned();
	}

	getSister() {
		if (this.parentModal && this.parentModal.childModalOpenned !== this)
			return this.parentModal.childModalOpenned;
		if (this.modalContext.rootModalOpenned !== this) return this.modalContext.rootModalOpenned;
		return undefined;
	}

	getDeepestBlockingModal() {
		let checkedModal = this.getDeepestModalOpenned();
		let security = 0;
		while (security <= 20) {
			if (checkedModal.isModalBlocked()) return checkedModal;
			if (this === checkedModal) return;
			const parentModal = checkedModal.parentModal;
			if (!parentModal) return undefined;
			checkedModal = parentModal;
			security++;
		}
	}

	isModalBlocked() {
		if (this.p.enableCloseDialog) return true;
		if (this.p.noCloseOnOutsideClick) return true;
		return false;
	}

	canOpenModal(): boolean {
		const sister = this.getSister();
		if (!sister) return true;
		const deepestBlockingModal = sister.getDeepestBlockingModal();
		if (!deepestBlockingModal) return true;
		return false;
	}

	contextClose(exception: (ModalRemote | undefined)[] = []) {
		const aModalIsTryingToOpen = exception.filter((i) => i).length > 0;
		if (aModalIsTryingToOpen) return;
		this.close('context');
	}

	close(force?: 'context' | 'deepforce'): boolean {
		const deepestBlockingModal = this.getDeepestBlockingModal();
		const noBlockingModal = !deepestBlockingModal;
		const thisIsTheBlockingModalToForceClose = force === undefined && deepestBlockingModal === this;
		if (force === 'deepforce' || noBlockingModal || thisIsTheBlockingModalToForceClose) {
			this.closeModal();
			return true;
		}
		deepestBlockingModal.closeDialog?.switch();
		return false;
	}

	closeModal() {
		this.closeChild();
		this.declareClosed();
		this.modalContext.preventWindowClick();
		const shallow = this.p.shallow;
		if (shallow) return this.closeState();
		this.p.callbacks?.hide?.(this);
		this.setAnchorState('closed');
		this.onMouse = false;
		this.#isVisibleBase = false;
		this.focusAnchor();
	}

	closeChild() {
		this.childModalOpenned?.closeChild();
		this.childModalOpenned?.closeModal();
	}

	deepClose(maxCloseNumber?: number) {
		if (maxCloseNumber !== undefined) {
			if (maxCloseNumber === 0) return;
			maxCloseNumber -= 1;
		}
		this.close();
		this.parentModal?.deepClose(maxCloseNumber);
	}

	focusAnchor() {
		this.anchor?.focus();
	}

	private setAnchorState(state: 'open' | 'closed') {
		this.anchor?.setAttribute(MODAL_ATTRIBUTE, state);
	}

	switch() {
		if (this.isVisible) {
			this.close();
		} else {
			this.open();
		}
	}

	async openOnMouse() {
		if (this.isVisible) this.close();
		await wait(15);
		this.onMouse = true;
		this.open();
	}

	private debug(...data: [string, unknown] | [string] | [unknown]) {
		const name = this.p.DEBUG?.name;
		if (data[1]) return console.log(`${name} : ${data[0]}`, data[1]);
		if (typeof data[0] === 'string') return console.log(`${name} : ${data[0]}`);
		return console.log(`${name}`, data[0]);
	}

	positionModal(anchor: HTMLElement | virtualAnchor, modalElement: HTMLElement) {
		computePosition(anchor, modalElement, {
			middleware: [...this.middleware, hide()],
			placement: this.placement
		}).then(({ x, y, middlewareData }) => {
			const hide = middlewareData.hide;
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			this.position.x = x - scrollX;
			this.position.y = y - scrollY;
			if (hide?.referenceHidden && this.closeOnHide) this.close();
		});
	}
}

const remote = newRemote('Modal', ModalRemote);
export const createModal = remote.create;
export const getModal = remote.get;

export async function closeModal() {
	const modal = getModal();
	modal?.close();
}
