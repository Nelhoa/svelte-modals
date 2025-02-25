/* eslint-disable @typescript-eslint/no-explicit-any */
import { computePosition, flip, hide, offset, shift, type Middleware } from '@floating-ui/dom';
import type { virtualAnchor } from '$lib/types/types.js';
import { newRemote } from '$lib/utils/component-remote-wrapper.js';
import { wait } from '$lib/utils/wait.js';
import type { ModalContextRemote } from './modal-context.svelte.js';
import type Modal from './Modal.svelte';
import type { ModalProps, Shallow } from './modal-props.svelte.js';
import { cn } from '$lib/utils/cn.js';

export type ModalElement = ReturnType<typeof Modal>;
export type closeContext = 'outsideContextmenu' | 'outsideClick' | 'escape' | 'force';

const defaultModalProps: ModalProps = { modalOffset: 10, modalShift: 10 };
const MODAL_ATTRIBUTE = 'data-modal';
export class ModalRemote {
	private p: Readonly<ModalProps> = $state()!;
	readonly props = $derived.by(() => ({
		...defaultModalProps,
		...this._modalContext.defaultModalProps,
		...this.p,
		class: cn(this._modalContext.defaultModalProps.class, this.p.class)
	}));
	_modalContext: ModalContextRemote;
	_parentModal?: ModalRemote;
	_childModalOpenned?: ModalRemote = $state();

	_onMouse = $state(false);
	_defaultAnchor?: HTMLElement = $state();
	_givenAnchor?: HTMLElement = $state();

	element?: HTMLElement = $state();
	#isVisibleBase = $state(false);

	#position = $state({ x: 0, y: 0 });

	_closeDialogElement?: ModalElement = $state();
	readonly #closeDialog = $derived(this._closeDialogElement?.modal);
	readonly #isVisible = $derived(
		Boolean(
			this.p.shallow ? this.p.shallow.page.state[this.p.shallow.stateName] : this.#isVisibleBase
		)
	);
	readonly #anchor?: HTMLElement = $derived(
		this._givenAnchor ?? this.p.anchor ?? this._defaultAnchor
	);
	readonly closeOnHide: boolean = $derived(!this.p.noCloseOnHide);
	readonly middleware: Middleware[] = $derived(
		this.p.middleware ?? [
			offset(this.props.modalOffset),
			flip(),
			shift({ padding: this.props.modalShift })
		]
	);

	get anchor() {
		return this.#anchor;
	}

	set anchor(v) {
		this._givenAnchor = v;
	}

	get position() {
		return this.#position;
	}

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
		this._parentModal = params.parentModal;
		this._modalContext = params.modalContext;
		this.checkShallowStack();
	}

	private checkShallowStack() {
		if (!this.p.shallow) return;
		if (!this._parentModal?.hasShallowAncestors) return;
		throw Error(`Modal Error : Can't stack shallow routed modals`);
	}

	private hasShallowAncestors(): boolean {
		const parentShallow = this._parentModal?.hasShallowAncestors();
		return Boolean(this.p.shallow || parentShallow);
	}

	private getShallowState(state: Record<string, any>) {
		this._parentModal?.getShallowState(state);
		const shallow = this.p.shallow;
		if (shallow) state[shallow.stateName] = true;
	}

	private openState(shallow: Shallow) {
		const newState: Record<string, any> = {};
		console.log('openState');
		this.getShallowState(newState);
		shallow.pushState('', newState);
	}

	private closeState() {
		console.log('closeState');
		history.back();
	}

	private declareOpenned() {
		this._modalContext.addToModalOpenned(this);
	}

	private declareClosed() {
		this._modalContext.removeFromModalOpenned(this);
	}

	private getDeepestModalOpenned(): ModalRemote {
		return this._childModalOpenned?.getDeepestModalOpenned() ?? this;
	}

	open() {
		if (!this.canOpenModal()) return;
		this.getSister()?.closeModal();
		if (this._modalContext.opennedAtCaptureTime.map((i) => i.modal).includes(this)) return;
		const shallow = this.p.shallow;
		this.declareOpenned();
		if (shallow) return this.openState(shallow);
		this.p.callbacks?.show?.(this);
		this.#isVisibleBase = true;
		this.setAnchorState('open');
	}

	private getSister() {
		if (this._parentModal && this._parentModal._childModalOpenned !== this)
			return this._parentModal._childModalOpenned;
		if (this._modalContext.rootModalOpenned !== this) return this._modalContext.rootModalOpenned;
		return undefined;
	}

	private getDeepestBlockingModal() {
		let checkedModal = this.getDeepestModalOpenned();
		let security = 0;
		while (security <= 20) {
			if (checkedModal.isModalBlocked()) return checkedModal;
			if (this === checkedModal) return;
			const parentModal = checkedModal._parentModal;
			if (!parentModal) return undefined;
			checkedModal = parentModal;
			security++;
		}
	}

	private isModalBlocked() {
		if (this.p.enableCloseDialog) return true;
		if (this.p.noCloseOnOutsideClick) return true;
		return false;
	}

	private canOpenModal(): boolean {
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

	close(force?: 'context' | 'deepforce' | 'escape'): boolean {
		console.log('close');
		const deepestBlockingModal = this.getDeepestBlockingModal();
		const noBlockingModal = !deepestBlockingModal;
		const thisIsTheBlockingModalToForceClose = force === undefined && deepestBlockingModal === this;
		if (force === 'deepforce' || noBlockingModal || thisIsTheBlockingModalToForceClose) {
			this.closeModal();
			return true;
		}
		deepestBlockingModal.#closeDialog?.switch();
		return false;
	}

	closeModal() {
		this.closeChild();
		this.declareClosed();
		this._modalContext.preventWindowClick();
		const shallow = this.p.shallow;
		if (shallow) return this.closeState();
		this.p.callbacks?.hide?.(this);
		this.setAnchorState('closed');
		this._onMouse = false;
		this.#isVisibleBase = false;
		this.focusAnchor();
	}

	closeChild() {
		this._childModalOpenned?.closeChild();
		this._childModalOpenned?.closeModal();
	}

	deepClose(maxCloseNumber?: number) {
		if (maxCloseNumber !== undefined) {
			if (maxCloseNumber === 0) return;
			maxCloseNumber -= 1;
		}
		this.close();
		this._parentModal?.deepClose(maxCloseNumber);
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
		this._onMouse = true;
		this.open();
	}

	private debug(...data: [string, unknown] | [string] | [unknown]) {
		const name = this.p._DEBUG?.name;
		if (data[1]) return console.log(`${name} : ${data[0]}`, data[1]);
		if (typeof data[0] === 'string') return console.log(`${name} : ${data[0]}`);
		return console.log(`${name}`, data[0]);
	}

	positionModal(anchor: HTMLElement | virtualAnchor, modalElement: HTMLElement) {
		computePosition(anchor, modalElement, {
			middleware: [...this.middleware, hide()],
			placement: this.props.placement
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
