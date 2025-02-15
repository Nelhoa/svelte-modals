<script lang="ts">
	import Content from './Content.svelte';
	import Header from './Header.svelte';
	import Navigation from './Navigation.svelte';

	let { data } = $props();
	const item = $derived(data.item);
</script>

<div class="main">
	<Header {item} />
	<div class="body" style="grid-area: body;">
		<div class="nav bg-blue-200/5 overflow-y-auto p-5" style="grid-area: navigation;">
			<Navigation {item} />
		</div>
		<div class="bg-white overflow-y-auto h-full min-h-0" style="grid-area: content;">
			<Content {item} />
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	.main {
		@apply grid grid-rows-[auto_1fr] h-[100dvh];

		grid-template-areas:
			'header'
			'body';

		@media (width < 800px) {
			grid-template-areas:
				'body'
				'header';

			@apply grid-rows-[1fr_auto];
		}
	}

	.body {
		@apply grid grid-cols-[250px_1fr] h-full min-h-0;

		grid-template-areas: 'navigation content';

		@media (width < 800px) {
			grid-template-areas: 'content content';

			.nav {
				@apply hidden;
			}
		}
	}
</style>
