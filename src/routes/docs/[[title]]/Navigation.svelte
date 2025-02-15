<script lang="ts">
	import type { presentationItem } from '$lib/Components/Presentation/index.js';
	import { index } from '$lib/Components/Presentation/index.js';
	import { cn } from '$lib/utils/cn.js';

	let { item }: { item: presentationItem } = $props();
</script>

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
