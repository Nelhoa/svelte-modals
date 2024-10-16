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
import type { Snippet } from 'svelte';
import { initModalEscaper } from './open-modals.svelte.js';

export type ModalComponent = { modal: ModalRemote } | undefined;
const MODAL_ATTRIBUTE = 'data-modal';

export interface ModalProps {
	// if you want to open modal on mouse, use bind:this with the ModalComponent type, inside the remote is a function called openOnMouse dedicated to it.
	children?: Snippet; // default snippet
	tooltip?: Snippet; // snippet for the tooltip, so it appears only when modal is closed
	backdropStyles?: string; // styles of the backdrop
	class?: string; // styles of the modal
	ModalOffset?: number; // offset px of the modal from anchor
	ModalShift?: number; // shift px of the modal from borders of window
	centered?: boolean; // boolean : is the modal centered or not
	noAutoUpdate?: boolean; // boolean : remove auto update
	noCloseOnHide?: boolean; // boolean : remove close on anchor hide
	noOpenOnAnchorClick?: boolean; // boolean : remove open on anchor click
	noCloseOnOutsideClick?: boolean; // boolean : remove close when clicking outside the modal, inside it, use « getModal » context function to retrieve modal your'in and make your own button to close it
	middleware?: Middleware[]; // array of floatingui/dom middleware
	placement?: Placement; // enums of floatingui/dom placement from anchor or mouse position
	noAnchor?: boolean; // boolean : remove everthing that depends on the anchor
	lockBackground?: boolean; // boolean : mouse event wont spread below the backdrop
	stopScrollElements?: (modal: ModalRemote) => (HTMLElement | undefined | null)[];
	callbacks?: { show?: (modal: ModalRemote) => any; hide?: (modal: ModalRemote) => any }; // show and hide callbacks
}

export class ModalRemote {
	#p: ModalProps = $state()!;
	parentModal?: ModalRemote;
	onMouse = $state(false);
	anchor?: HTMLElement = $state();
	element?: HTMLElement = $state();
	#isVisible = $state(false);
	position = $state({ x: 0, y: 0 });
	placement: Placement = $derived(this.#p.placement ?? 'bottom');
	autoUpdate: boolean = $derived(!this.#p.noAutoUpdate);
	closeOnHide: boolean = $derived(!this.#p.noCloseOnHide);
	middleware: Middleware[] = $derived(
		this.#p.middleware ?? [
			offset(this.#p.ModalOffset ?? 10),
			flip(),
			shift({ padding: this.#p.ModalShift ?? 24 })
		]
	);

	get stopScrollElements() {
		return this.#p.stopScrollElements?.(this) ?? [];
	}

	get isVisible() {
		return this.#isVisible;
	}

	constructor(p: ModalProps, parentModal?: ModalRemote) {
		this.#p = p;
		this.parentModal = parentModal;
	}

	open() {
		this.#p.callbacks?.show?.(this);
		this.#isVisible = true;
		this.setAnchorState('open');
	}

	async close(setting?: { focusParent?: boolean; event?: Event }) {
		await wait(6); //Prevent click to propagate under modal
		this.#p.callbacks?.hide?.(this);
		this.setAnchorState('closed');
		this.onMouse = false;
		this.#isVisible = false;
		if (setting?.focusParent ?? true) this.focusAnchor();
	}

	async deepClose(maxCloseNumber?: number) {
		if (maxCloseNumber !== undefined) {
			if (maxCloseNumber === 0) return;
			maxCloseNumber -= 1;
		}
		await this.close();
		await this.parentModal?.deepClose(maxCloseNumber);
	}

	focusAnchor() {
		this.anchor?.focus();
	}

	private setAnchorState(state: 'open' | 'closed') {
		this.anchor?.setAttribute(MODAL_ATTRIBUTE, state);
	}

	switch() {
		this.isVisible ? this.close() : this.open();
	}

	async openOnMouse() {
		if (this.isVisible) this.close();
		await wait(15);
		this.onMouse = true;
		this.open();
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

initModalEscaper();

export async function closeModal() {
	const modal = getModal();
	await modal?.close();
}
