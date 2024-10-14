import { get, writable } from 'svelte/store';
import { computePosition, hide, type Middleware, type Placement } from '@floating-ui/dom';
import { createVirtualAnchor } from '$lib/components/App-Dashboard/SpansTable/Chart-Main/chart-util-stores';
import { wait } from '$lib/utils/Public/wait';
import _ from 'lodash';
import { newRemote } from '$lib/utils/component-remote-wrapper';

type focusStyle = Omit<HTMLElement['style'], 'length' | 'parentRule'>;
export type OldFocusStyle = Partial<focusStyle>;
export type SimpleModalElement = SimpleModalRemote | undefined;
export type virtualAnchor = ReturnType<typeof createVirtualAnchor>;
export type ModalCloseParams = Parameters<(typeof SimpleModalRemote)['prototype']['close']>;
export class SimpleModalRemote {
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

export const {
	create: createModalRemote,
	get: getModalRemote,
	getOptional: getOptionalModalRemote
} = newRemote('Modal', SimpleModalRemote);

export async function closeModal() {
	const modal = getOptionalModalRemote();
	await modal?.close();
}
