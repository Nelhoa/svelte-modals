import { mount, unmount, type ComponentProps } from 'svelte';
import Modal from './Modal.svelte';

export function initModal(element: HTMLElement, props: ComponentProps<typeof Modal>) {
	$effect(() => {
		const modal = mount(Modal, {
			target: element,
			props: { noAnchor: true, anchor: element, ...props }
		});
		return () => {
			unmount(modal);
		};
	});
}
