import type { Middleware, Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import type { ModalRemote } from './modal-remote.svelte.js';

export interface ModalProps {
	// if you want to open modal on mouse, use bind:this with the ModalComponent type, inside the remote is a function called openOnMouse dedicated to it.
	children?: Snippet; // default snippet
	closeDialog?: Snippet<[() => unknown, () => unknown]>;
	tooltip?: Snippet; // snippet for the tooltip, so it appears only when modal is closed
	portal?: Snippet; // snippet for setting content above the modals
	enableCloseDialog?: boolean;
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
	anchor?: HTMLElement;
	noAnchor?: boolean; // boolean : remove everthing that depends on the anchor
	lockBackground?: boolean; // boolean : mouse event wont spread below the backdrop
	shallow?: Shallow;
	stopScrollElements?: (modal: ModalRemote) => (HTMLElement | undefined | null)[];
	callbacks?: { show?: (modal: ModalRemote) => unknown; hide?: (modal: ModalRemote) => unknown }; // show and hide callbacks
	isCloseDialog?: boolean;
	debug?: boolean;
}

export type Shallow = {
	pushState: (url: string, object: Record<string, unknown>) => void;
	stateName: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	page: Record<string, any>;
};
