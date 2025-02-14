<script lang="ts">
	import { initModalContext } from '$lib/Components/Modal/modal-context-init.svelte.js';
	import Modal from '$lib/Components/Modal/Modal.svelte';
	import CodeSnippet from '$lib/Components/PresentationAtoms/CodeSnippet.svelte';
	import Tooltip from '$lib/Components/Tooltip/Tooltip.svelte';
	import Close from './Close.svelte';
	initModalContext();

	let myModal = $state<ReturnType<typeof Modal>>();

	const code: string = `\<script>
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import horizonDark from "svelte-highlight/styles/horizon-dark";

  const code = "const add = (a: number, b: number) => a + b;";
\</script\>

<svelte:head>
  {@html horizonDark}
</svelte:head>

<Highlight language={typescript} {code} />
`;
</script>

<div class="p-10 bg-blue-100 h-screen">
	<div class="font-bold text-lg">Nouvelle modal</div>

	<CodeSnippet lang="svelte" {code} />

	<button
		class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
		>Tester
		<Modal
			DEBUG={{ name: 'Modal 1' }}
			bind:this={myModal}
			placement="bottom-start"
			class="px-3 py-1"
			enableCloseDialog
			>Voici ma super modale !
			<button onclick={() => myModal?.modal.close()}>Fermer</button>

			{#snippet tooltip()}
				<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
			{/snippet}
			<button
				class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
				>Tester
				<Modal placement="bottom-start" class="px-3 py-1" enableCloseDialog
					>Imbrication ?

					{#snippet tooltip()}
						<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
					{/snippet}
					<!-- {#snippet closeDialog(close, back)}
				<div>
					Va te faire foutre
					<button onclick={close}>Oui</button>
					<button onclick={back}>Non</button>
				</div>
			{/snippet} -->
				</Modal></button
			>
			<!-- {#snippet closeDialog(close, back)}
				<div>
					Va te faire foutre
					<button onclick={close}>Oui</button>
					<button onclick={back}>Non</button>
				</div>
			{/snippet} -->
		</Modal></button
	>
	<button
		class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
		>Tester
		<Modal placement="bottom-start" class="px-3 py-1"
			>Voici un peu de folie
			<button
				class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
				>Tester
				<Modal placement="bottom-start" class="px-3 py-1"
					>Voici ma super modale !

					{#snippet tooltip()}
						<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
					{/snippet}
				</Modal></button
			>
			<button
				class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
				>Tester
				<Modal placement="bottom-start" class="px-3 py-1"
					>Voici ma super modale !

					<button
						class="bg-blue-500 mt-2 text-sm text-white font-semibold rounded px-3 py-1 cursor-pointer hover:bg-blue-600"
						>Tester
						<Modal placement="bottom-start" class="px-3 py-1"
							><Close>Ferme</Close>

							{#snippet tooltip()}
								<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
							{/snippet}
						</Modal></button
					>

					{#snippet tooltip()}
						<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
					{/snippet}
				</Modal></button
			>
			{#snippet tooltip()}
				<Tooltip class="text-sm px-2 py-0.5">Vive le vent</Tooltip>
			{/snippet}
		</Modal></button
	>
</div>
