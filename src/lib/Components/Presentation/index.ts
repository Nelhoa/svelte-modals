import type { Component } from 'svelte';
import Overview from './Introduction/Overview.svelte';
import Installation from './Introduction/Installation.svelte';
import ModalOpenVariant from './Introduction/ModalOpenVariant.svelte';

export type title = { title: string; items: presentationItem[] };
export type presentationItem = { subtitle: string; slug: string; component: Component };

export function findPresentationItem(slug?: string) {
	const item = subitems.find((i) => i.slug === slug);
	return item;
}

export const index: title[] = [
	{
		title: 'Introduction',
		items: [
			{ subtitle: 'Overview', slug: 'overview', component: Overview },
			{
				subtitle: 'Installation',
				slug: 'installation',
				component: Installation
			},
			{
				subtitle: `'modal-open:' Variant `,
				slug: 'variant-configuration',
				component: ModalOpenVariant
			}
		]
	}
];

const subitems = index.reduce((prev, cur) => [...prev, ...cur.items], [] as presentationItem[]);
