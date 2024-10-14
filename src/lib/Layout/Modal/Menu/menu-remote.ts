import { get, writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { SimpleModalElement } from '../SimpleModal/simple-modal-remote.js';
import type { createVirtualAnchor } from '$lib/utils/create-virtual-anchor.js';

const MENU_CONTEXT = 'menu-remote';
type simpleMenuConstructor = ConstructorParameters<typeof SimpleMenuRemote>;
export type SimpleMenuElement = SimpleMenuRemote | undefined;
export type virtualAnchor = ReturnType<typeof createVirtualAnchor>;

export class SimpleMenuRemote {
	MenuElement = writable<HTMLElement>();
	Modal = writable<SimpleModalElement>();

	focusFirstOption() {
		const options = this.getOptions();
		if (!options) return;
		options[0]?.focus();
	}

	navigate(dir: -1 | 1) {
		const options = this.getOptions();
		const focused = this.getFocused(options);
		const indexOfFocused = this.getIndex(options, focused);
		if (!options) return;
		if (indexOfFocused == undefined) return options[0]?.focus();
		const newIndex = indexOfFocused + dir;
		if (newIndex > options.length - 1) return options[0]?.focus();
		if (newIndex < 0) return options[options.length - 1]?.focus();
		return options[newIndex]?.focus();
	}

	private getIndex(options: HTMLElement[] | undefined, item: HTMLElement | undefined) {
		if (!item || !options) return;
		const index = options.indexOf(item);
		if (index >= 0) return index;
	}

	private getFocused(options: HTMLElement[] | undefined) {
		if (!options) return;
		const focused = document?.activeElement as HTMLElement | null | undefined;
		if (focused && options.includes(focused)) return focused;
	}

	private getOptions() {
		const menuElement = get(this.MenuElement);
		if (!menuElement) return;
		const options = menuElement.querySelectorAll<HTMLElement>('.option');
		return [...options];
	}
}

export function createMenuRemote(...params: simpleMenuConstructor) {
	const remote = new SimpleMenuRemote(...params);
	setContext(MENU_CONTEXT, remote);
	return remote;
}

export function getMenuRemote() {
	const remote = getContext(MENU_CONTEXT) as SimpleMenuRemote;
	if (!remote) throw Error('No menu remote in context');
	return remote;
}

export function getOptionalMenuRemote() {
	try {
		const remote = getMenuRemote();
		return remote;
	} catch (err) {}
}
