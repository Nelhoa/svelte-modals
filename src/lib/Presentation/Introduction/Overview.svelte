<script lang="ts">
	import type { ModalElement } from '$lib/Components/Modal/modal.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Presentation/PresentationAtoms/CodeSnippet.svelte';
	import InlineCode from '$lib/Presentation/PresentationAtoms/InlineCode.svelte';
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	import { layoutInit } from '../codeSnippet.js';
	let modal = $state<ModalElement>();
</script>

<p class="mb-3 text-balance">
	Svelte-modals is a performant and easy to use popover manager for creating dialog and tooltips.
	Primarly built for <a href="https://planhead.fr">Planhead (cashflow management)</a> by
	<a href="https://github.com/Nelhoa">Neil Savin</a>.
</p>

<h2>Test it !</h2>

<div class="flex gap-3 mt-3 mb-3 flex-wrap">
	<button
		>⚓ Anchored modal
		<Modal
			placement="bottom-start"
			class="p-3 flex flex-col items-start border border-black/10 gap-y-2"
			><div>Here is your content</div>
			<button
				>Next modal ?
				<Modal
					placement="bottom-start"
					class="p-3 flex flex-col item-start justify-center border border-black/10"
					><div>Its stackable !</div>
					{#snippet tooltip()}
						Click here !
					{/snippet}
				</Modal>
			</button>
			{#snippet tooltip()}
				Click here !
			{/snippet}
		</Modal>
	</button>
	<button
		>🎯 Centered modal
		<Modal
			bind:this={modal}
			class="presentation p-8 w-[90%] max-w-[550px] overflow-y-auto max-h-[80dvh] bg-white"
			centered
			lockBackground
			backdropStyles="bg-black/30"
			stopScrollElements={(modal) => [modal.anchor?.parentElement?.parentElement?.parentElement]}
		>
			<h2 class="mt-0">A centered modal</h2>
			<p>For exemple:</p>
			<ul>
				<li>Background interactivity disabled.</li>
				<li>Scrolling stoped.</li>
			</ul>
			<CodeSnippet
				class="w-full my-3"
				lang="svelte"
				code={`<button
	>Centered modal
	<Modal
		bind:this={modal}
		centered
		lockBackground
		backdropStyles="bg-black/30"
		stopScrollElements={(modal) => [
            modal.anchor?.parentElement?.parentElement?.parentElement
        ]}
	>
		<button onclick={() => modal?.modal.close()}>Click here to close</button>
	</Modal>
</button>`}
			/>
			<button class="mt-4" onclick={() => modal?.modal.close()}>Click here to close</button>
			{#snippet tooltip()}
				Click here !
			{/snippet}
		</Modal>
	</button>
	<button
		>🔒 Protected modal
		<Modal
			enableCloseDialog
			class="p-3 max-w-[200px]"
			tooltipProps={{ onMouse: true, tweenDuration: 200 }}
		>
			You won’t be able to close this modal unless you confirm your choice.
			{#snippet tooltip()}
				Click here !
			{/snippet}
		</Modal>
	</button>
</div>

<h2>Features</h2>

<ul>
	<li>Great DX with no extra bindings</li>
	<li>Widely customizable</li>
	<li>Stackable popover</li>
	<li>Handle tooltips</li>
	<li>Handle <InlineCode code="shallow routing" /></li>
	<li>Handle <InlineCode code="escape" /> keydown shortcut</li>
	<li>Handle stop scrolling</li>
	<li>Based on <a href="https://svelte.dev/">Svelte 5</a> and typescript</li>
	<li>Requires <a href="https://tailwindcss.com/">Tailwindcss 4</a></li>
	<li>
		Placement based on <a href="https://floating-ui.com/docs/getting-started">floating-ui</a>
	</li>
</ul>

<h2>Basic use</h2>

<p>Init context manager on your top <InlineCode code="+layout.svelte" /></p>

<CodeSnippet lang="svelte" code={layoutInit} fileName="+layout.svelte" />

<p>
	<InlineCode code="Modal" /> component goes directly inside your anchor
</p>

<CodeSnippet
	lang="svelte"
	fileName="Component.svelte"
	code={`<button
	>Open modal
	<Modal class="p-3">
        Here is your content
    </Modal>
</button>`}
/>
