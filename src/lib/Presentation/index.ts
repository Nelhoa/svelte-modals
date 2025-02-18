import type { Component } from 'svelte';
import Overview from './Introduction/Overview.svelte';
import Installation from './Introduction/Installation.svelte';
import ModalOpenVariant from './Introduction/ModalOpenVariant.svelte';
import Anchor from './Introduction/Anchor.svelte';
import TooltipIntro from './Tooltips/TooltipProps.svelte';
import TooltipTypes from './Tooltips/TooltipTypes.svelte';
import ModalTypes from './Modals/ModalTypes.svelte';

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
			},
			{ subtitle: `How anchor works`, slug: 'how-anchor-works', component: Anchor }
		]
	},
	{
		title: 'Tooltip',
		items: [
			{ subtitle: `Props`, slug: 'tooltips-props', component: TooltipIntro },
			{ subtitle: 'Typescript', slug: 'tooltips-types', component: TooltipTypes }
		]
	},
	{
		title: 'Modal',
		items: [
			// { subtitle: `Props`, slug: 'tooltips-props', component: TooltipIntro },
			{ subtitle: 'Typescript', slug: 'modal-types', component: ModalTypes }
		]
	}
];

const subitems = index.reduce((prev, cur) => [...prev, ...cur.items], [] as presentationItem[]);
