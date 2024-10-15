<!-- <script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { getModalRemote } from '../SimpleModal/simple-modal-remote';

	export let title: string;
	export let shortcut: string[] | undefined = undefined;
	export let onclick: (() => any) | undefined = undefined;
	export let emojiStyles = '';
	export let noAutomaticClose = false;
	export let deepCloseLevel = 1;
	export let async = false;
	export let waitMessage = 'En cours...';
	let loading = false;
	const remote = getModalRemote();

	async function clickOption(e: Event) {
		async ? clickAsync(e) : click(e);
	}

	async function click(e: Event) {
		await close(e);
		onclick?.();
	}

	async function clickAsync(e: Event) {
		loading = true;
		await onclick?.();
		await close(e);
		loading = false;
	}

	async function close(e: Event) {
		if (!noAutomaticClose) {
			await remote.deepClose(deepCloseLevel);
			e.stopPropagation();
		}
	}
</script>

<button
	class="option group grid h-[32px] w-full grid-cols-[15px_1fr_auto] items-center gap-x-[12px] border-b px-3 last:border-none hover:bg-black/5 focus:bg-black/5 focus:shadow modal-open:bg-black/[.03]"
	on:click={clickOption}
>
	<div class={cn('flex h-full w-full items-center justify-center text-black/30', emojiStyles)}>
		<slot />
	</div>
	<div
		class="truncate text-left text-[length:var(--title-size,14px)] text-black/70 hover:text-black"
	>
		{loading ? waitMessage : title}
	</div>
	<div class="flex gap-x-[5px] text-[13px] text-black/50">
		{#if shortcut}
			{#each shortcut as key}
				<div class="rounded bg-black/5 px-[5px] py-[0px]">{key}</div>
			{/each}
		{/if}
	</div>
	<slot name="menu" />
</button> -->
