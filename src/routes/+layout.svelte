<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { initModalContext } from '$lib/Components/Modal/modal-context-init.svelte.js';
	let props: { children: Snippet } = $props();
	initModalContext({
		defaultTooltipProps: {
			class: 'px-2 py-0.5 border border-blue-100 text-[15px] text-black/80',
			hideMS: 0,
			placement: 'bottom-start',
			modalOffset: 15
		},
		defaultModalProps: {
			class: 'px-3 py-1 ',
			modalOffset: 10,
			placement: 'bottom-start'
		}
	});

	const title = 'Svelte-Props';
	const image = 'https://svelte-pops.vercel.app/OG.png';
	const description =
		'Complete popover and tooltip management library for Svelte 5 & Tailwindcss 4';
	const url = 'https://svelte-pops.vercel.app/';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Balises supplémentaires pour d'autres réseaux -->
	<meta name="og:site_name" content={title} />
	<meta name="og:locale" content="fr_FR" />
	<meta property="article:author" content={'Neil Savin'} />
</svelte:head>

{@render props.children()}
