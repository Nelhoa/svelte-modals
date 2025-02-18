import { findPresentationItem } from '$lib/Presentation/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const item = findPresentationItem(params.title);
	if (!item) redirect(303, '/docs/overview');
	return { item };
}
