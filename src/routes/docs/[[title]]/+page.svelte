<script lang="ts">
	import { index } from '$lib/Components/Presentation/index.js';
	import { cn } from '$lib/utils/cn.js';
	import Header from './Header.svelte';

	let { data } = $props();
	const item = $derived(data.item);
	const ItemComponent = $derived(item.component);
	const title = $derived(index.find((i) => i.items.find((sub) => sub === item)))!;
</script>

<div class="grid grid-rows-[auto_1fr] h-screen">
	<Header />
	<div class="grid grid-cols-[250px_1fr] h-full min-h-0">
		<div class="bg-blue-200/5 overflow-y-auto p-5">
			{#each index as mainTitle}
				<div>
					<div class="text-[20px] font-serif mb-2">{mainTitle.title}</div>
					<div>
						{#each mainTitle.items as subitem}
							<a
								class={cn(
									'block text-black/60 mb-0.5',
									subitem !== item && 'hover:text-black',
									subitem === item && 'text-blue-500 font-bold'
								)}
								href={`/docs/${subitem.slug}`}
							>
								{subitem.subtitle}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="bg-white overflow-y-auto h-full min-h-0">
			<div class="mx-auto w-[90%] max-w-[1100px] py-9">
				<div class="uppercase text-black/50 tracking-wide leading-0.5 text-[15px]">
					{title.title}
				</div>
				<div class="text-[40px] font-serif mb-5">{item.subtitle}</div>
				<div class="presentation">
					<ItemComponent />
				</div>
			</div>
		</div>
	</div>
</div>
