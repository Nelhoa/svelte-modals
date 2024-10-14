import { get, writable } from 'svelte/store';
import { computePosition, hide, type Middleware, type Placement } from '@floating-ui/dom';
import type { virtualAnchor } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { wait } from '$lib/utils/wait.js';
import type { Snippet } from 'svelte';
import { initModalEscaper } from './escape-modals.svelte.js';

export interface ModalProps {
	children?: Snippet;
	tooltip?: Snippet;
	backdropStyles?: string;
	modalStyles?: string;
	ModalOffset?: number;
	ModalShift?: number;
	centered?: boolean;
	noAutoUpdate?: boolean;
	noCloseOnHide?: boolean;
	noAnchorOpenOnClick?: boolean;
	noCloseOnOutsideClick?: boolean;
	middleware?: Middleware[];
	placement?: Placement;
	noAnchor?: boolean;
	lockBackground?: boolean;
}

type focusStyle = Omit<HTMLElement['style'], 'length' | 'parentRule'>;
export type OldFocusStyle = Partial<focusStyle>;
export type SimpleModalElement = ModalRemote | undefined;
export type ModalCloseParams = Parameters<(typeof ModalRemote)['prototype']['close']>;
export class ModalRemote {
	parentModal: SimpleModalElement;
	autoUpdate: boolean;
	closeOnHide: boolean;
	onMouse = false;
	parentElement = writable<HTMLElement | undefined>();
	contextElement = writable<HTMLElement | undefined>();
	modalElement = writable<HTMLElement | undefined>();
	isVisible = writable<boolean>(false);
	modalPosition = {
		x: writable<number>(0),
		y: writable<number>(0)
	};
	middleware: Middleware[];
	placement: Placement;

	constructor(
		middleware: Middleware[],
		placement: Placement,
		autoUpdate: boolean,
		closeOnHide: boolean,
		parentModal: SimpleModalElement
	) {
		this.middleware = middleware;
		this.placement = placement;
		this.autoUpdate = autoUpdate;
		this.closeOnHide = closeOnHide;
		this.parentModal = parentModal;
	}

	open() {
		this.isVisible.set(true);
		this.setAnchorState('open');
	}

	async close(setting?: { focusParent?: boolean; event?: Event }) {
		await wait(6); //Prevent click to propagate under modal
		this.setAnchorState('closed');
		this.onMouse = false;
		this.isVisible.set(false);
		if (setting?.focusParent ?? true) this.focusParentElement();
	}

	async deepClose(maxCloseNumber?: number) {
		if (maxCloseNumber !== undefined) {
			if (maxCloseNumber === 0) return;
			maxCloseNumber -= 1;
		}
		await this.close();
		await this.parentModal?.deepClose(maxCloseNumber);
	}

	focusParentElement() {
		const parent = get(this.parentElement);
		parent?.focus();
	}

	private setAnchorState(state: 'open' | 'closed') {
		const parent = get(this.parentElement);
		parent?.setAttribute('data-state', state);
	}

	switch() {
		get(this.isVisible) ? this.close() : this.open();
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
			this.modalPosition.x.set(x);
			this.modalPosition.y.set(y);
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
