<script lang="ts">
	import { index, type presentationItem } from '$lib/Components/Presentation/index.js';

	let { item }: { item: presentationItem } = $props();
	const ItemComponent = $derived(item.component);
	const title = $derived(index.find((i) => i.items.find((sub) => sub === item)))!;
</script>

<div class="mx-auto w-[90%] max-w-[1100px] py-9">
	<div class="uppercase text-black/50 tracking-wide leading-0.5 text-[15px]">
		{title.title}
	</div>
	<div class="text-[40px] font-serif mb-5">{item.subtitle}</div>
	<div class="presentation">
		<ItemComponent />
	</div>
</div>
