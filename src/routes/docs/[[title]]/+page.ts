import { redirect } from '@sveltejs/kit';
import { findPresentationItem } from '../../Presentation/index.js';

export async function load({ params }) {
	const item = findPresentationItem(params.title);
	if (!item) redirect(303, '/docs/overview');
	return { item };
}
