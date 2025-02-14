import { findPresentationItem } from '$lib/Components/Presentation/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	console.log('test');
	const item = findPresentationItem(params.title);
	if (!item) redirect(303, '/docs/overview');
	return { item };
}
