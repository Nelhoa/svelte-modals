import Tooltip from './Components/Tooltip/Tooltip.svelte';
import Modal from './Components/OldModal/Modal.svelte';
import Portal from './Components/Portal.svelte';
import { type ModalComponent } from './Components/OldModal/modal-remote.svelte.js';
import { getModal, createModal } from './Components/OldModal/modal-remote.svelte.js';
import { initModalContext } from './Components/Modal/modal-context-init.svelte.js';
import type {
	TooltipElement,
	TooltipProps,
	TooltipRemote
} from './Components/Tooltip/tooltip-remote.svelte.js';

export {
	Tooltip,
	Modal,
	Portal,
	type ModalComponent,
	type TooltipElement,
	type TooltipProps,
	type TooltipRemote,
	getModal,
	createModal,
	initModalContext
};
