<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import powershell from 'svelte-highlight/languages/powershell';
	import scss from 'svelte-highlight/languages/scss';
	import 'svelte-highlight/styles/github.css';

	let {
		lang,
		code,
		fileName,
		class: className
	}: {
		lang: 'typescript' | 'svelte' | 'powershell' | 'css';
		code: string;
		fileName?: string;
		class?: string;
	} = $props();
</script>

<div
	class={cn(
		'relative rounded-md overflow-clip border border-black/10 mt-3 mb-6 max-[800px]:scrollbarr-show',
		!fileName && 'pt-2',
		className
	)}
>
	{#if !fileName}
		<div class="absolute top-[3px] text-[13px] font-mono right-[8px] text-blue-900/40">{lang}</div>
	{:else}
		<div
			class="w-full bg-blue-50 font-mono font-medium text-blue-900/60 tracking-wide px-4 text-[15px] flex justify-between py-1"
		>
			<div class="">
				{fileName}
			</div>
			<div class="font-mono text-blue-900/40">{lang}</div>
		</div>
	{/if}
	{#if lang === 'typescript'}
		<Highlight language={typescript} {code} />
	{:else if lang === 'svelte'}
		<HighlightSvelte {code}></HighlightSvelte>
	{:else if lang === 'powershell'}
		<Highlight language={powershell} {code} />
	{:else if lang === 'css'}
		<Highlight language={scss} {code} />
	{/if}
</div>
