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

export interface ModalProps {
	children?: Snippet;
	tooltip?: Snippet;
	backdropStyles?: string;
	class?: string;
	ModalOffset?: number;
	ModalShift?: number;
	centered?: boolean;
	noAutoUpdate?: boolean;
	noCloseOnHide?: boolean;
	noOpenOnAnchorClick?: boolean;
	noCloseOnOutsideClick?: boolean;
	middleware?: Middleware[];
	placement?: Placement;
	noAnchor?: boolean;
	lockBackground?: boolean;
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
	ModalOffset: number = $derived(this.#p.ModalOffset ?? 10);
	ModalShift: number = $derived(this.#p.ModalShift ?? 24);
	middleware: Middleware[] = $derived(
		this.#p.middleware ?? [offset(this.ModalOffset), flip(), shift({ padding: this.ModalShift })]
	);

	get isVisible() {
		return this.#isVisible;
	}

	constructor(p: ModalProps, parentModal?: ModalRemote) {
		this.#p = p;
		this.parentModal = parentModal;
	}

	open() {
		this.#isVisible = true;
		this.setAnchorState('open');
	}

	async close(setting?: { focusParent?: boolean; event?: Event }) {
		await wait(6); //Prevent click to propagate under modal
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
		this.anchor?.setAttribute('data-state', state);
	}

	switch() {
		this.isVisible ? this.close() : this.open();
	}

	async openOnMouse() {
		this.close();
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
			this.position.x = x;
			this.position.y = y;
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
