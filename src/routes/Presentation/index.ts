import type { Component } from 'svelte';
import Overview from './Introduction/Overview.svelte';
import Installation from './Introduction/Installation.svelte';
import ModalOpenVariant from './Introduction/ModalOpenVariant.svelte';
import Anchor from './Introduction/Anchor.svelte';
import TooltipProps from './Tooltips/TooltipProps.svelte';
import TooltipTypes from './Typescript/TooltipTypes.svelte';
import ModalTypes from './Typescript/ModalTypes.svelte';
import InitModalAction from './Introduction/InitModalAction.svelte';
import InitTooltipAction from './Introduction/initTooltipAction.svelte';
import ModalProps from './Modals/Interactivity.svelte';
import Placement from './Modals/Placement.svelte';
import Reference from './Modals/Reference.svelte';
import SnippetContent from './Modals/ContentAndStyles.svelte';
import CloseDialog from './Modals/CloseDialog.svelte';
import ShallowRouting from './Modals/ShallowRouting.svelte';
import TooltipInsideModal from './Modals/TooltipInsideModal.svelte';
import StopScroll from './Modals/StopScroll.svelte';

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
				subtitle: 'Configuration',
				slug: 'configuration',
				component: Installation
			},
			{
				subtitle: `'modal-open:' Variant `,
				slug: 'variant-configuration',
				component: ModalOpenVariant
			},
			{ subtitle: `How anchor works`, slug: 'how-anchor-works', component: Anchor },
			{ subtitle: 'Modal : init action', slug: 'init-modal-action', component: InitModalAction },
			{
				subtitle: 'Tooltip : init action',
				slug: 'init-tooltip-action',
				component: InitTooltipAction
			}
		]
	},
	{
		title: 'Modal Props',
		items: [
			{ subtitle: `Reference`, slug: 'modal-props-reference', component: Reference },
			{ subtitle: `Content & Styles`, slug: 'modal-snippet-content', component: SnippetContent },
			{ subtitle: `Interactivity`, slug: 'modal-props', component: ModalProps },
			{ subtitle: `Placement`, slug: 'modal-placement', component: Placement },
			{ subtitle: `Tooltip in Modals`, slug: 'modal-tooltip', component: TooltipInsideModal },
			{ subtitle: `Close Dialog`, slug: 'close-dialog', component: CloseDialog },
			{ subtitle: `Shallow Routing`, slug: 'shallow-routing', component: ShallowRouting },
			{ subtitle: `Stop scroll`, slug: 'modal-stop-scroll', component: StopScroll }
		]
	},
	{
		title: 'Tooltip',
		items: [{ subtitle: `Props`, slug: 'tooltips-props', component: TooltipProps }]
	},
	{
		title: 'Typescript',
		items: [
			{ subtitle: 'Modal Types', slug: 'modal-types', component: ModalTypes },
			{ subtitle: 'Tooltip Types', slug: 'tooltips-types', component: TooltipTypes }
		]
	}
];

const subitems = index.reduce((prev, cur) => [...prev, ...cur.items], [] as presentationItem[]);
