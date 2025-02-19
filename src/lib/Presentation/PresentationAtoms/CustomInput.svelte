<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	let {
		value = $bindable(),
		type,
		title,
		children
	}: {
		value?: string | number | boolean;
		title: string;
		type: 'text' | 'number' | 'boolean' | string[];
		children?: Snippet;
	} = $props();

	let openned = $state(false);

	$effect(() => {
		if (value === undefined)
			untrack(() => {
				if (type === 'text') return (value = '');
				if (type === 'boolean') return (value = false);
				if (type === 'number') return (value = 0);
				return (value = type[0]);
			});
	});
</script>

<div class="my-3.5">
	<div
		class="grid grid-cols-[auto_1fr_auto] border rounded focus-within:border-blue-500/40 h-[27px]"
	>
		<div
			class=" bg-blue-500/10 text-blue-900/60 px-2 w-[175px] text-[13.5px] font-mono flex items-center leading-0"
		>
			{title}
		</div>
		{#if type === 'number'}
			<input type="number" bind:value />
		{:else if type === 'text'}
			<input type="text" bind:value />
		{:else if type === 'boolean' && typeof value === 'boolean'}
			<input type="checkbox" bind:checked={value} />
		{:else}
			<select bind:value>
				{#each type as optionValue}
					<option class="text-sm" id={optionValue}>{optionValue}</option>
				{/each}
			</select>
		{/if}
		{#if children}
			<button
				disabled={!children}
				onclick={() => (openned = !openned)}
				class="w-[50px] justify-center h-full flex items-center leading-0 bg-blue-50 hover:bg-blue-100 hover:text-black/70 text-black/50 text-sm rounded-none focus:outline-hidden focus:shadow-none disabled:bg-black/[.03] disabled:text-black/20 disabled:cursor-auto"
				>{openned ? 'less' : 'more'}</button
			>
		{/if}
	</div>

	{#if children && openned}
		<div in:fly={{ x: 5 }} class="*:text-sm *:text-black/60 -mt-1">
			{@render children?.()}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";
	input,
	select {
		@apply px-3 w-full focus:outline-hidden;

		&[type='checkbox'] {
			@apply accent-blue-500 size-4 self-center ml-3;
		}
	}
</style>
