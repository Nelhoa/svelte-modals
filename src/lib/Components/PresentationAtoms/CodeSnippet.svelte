<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import powershell from 'svelte-highlight/languages/powershell';
	import 'svelte-highlight/styles/github.css';

	let {
		lang,
		code,
		fileName,
		class: className
	}: {
		lang: 'typescript' | 'svelte' | 'powershell';
		code: string;
		fileName?: string;
		class?: string;
	} = $props();
</script>

<div class={cn('relative rounded-md overflow-clip border border-black/10 mt-3 mb-6', className)}>
	{#if !fileName}
		<div class="absolute top-[5px] font-mono right-[10px] text-blue-900/40">{lang}</div>
	{/if}
	{#if fileName}
		<div
			class="w-full bg-blue-50 py-1 font-mono font-medium text-blue-900/60 tracking-wide px-4 text-[15px] flex justify-between"
		>
			<div>
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
	{/if}
</div>
