<script>
	import CodeSnippet from '../PresentationAtoms/CodeSnippet.svelte';
</script>

<CodeSnippet
	lang="typescript"
	code={`interface ModalProps {
	children?: Snippet | Snippet<[ModalRemote]>; 
	closeDialog?: Snippet<[{ close: () => unknown; back: () => unknown }]>;
	closeDialogContent?: { content?: string; backButton?: string; confirmButton?: string };
	tooltip?: Snippet; 
	portal?: Snippet; 
	enableCloseDialog?: boolean;
	backdropStyles?: string; 
	class?: string; 
	modalOffset?: number; 
	modalShift?: number;
	centered?: boolean;
	noAutoUpdate?: boolean;
	noCloseOnHide?: boolean;
	noOpenOnAnchorClick?: boolean; 
	noCloseOnOutsideClick?: boolean; 
	middleware?: Middleware[];
	placement?: Placement;
	anchor?: HTMLElement;
	noAnchor?: boolean;
	lockBackground?: boolean;
	shallow?: {
		pushState: (url: string, object: Record<string, unknown>) => void;
		stateName: string;
		page: Record<string, any>;
	};
	stopScrollElements?: (modal: ModalRemote) => (HTMLElement | undefined | null)[];
	callbacks?: { show?: (modal: ModalRemote) => unknown; hide?: (modal: ModalRemote) => unknown }; // show and hide callbacks
	tooltipProps?: ComponentProps<typeof Tooltip>;
}`}
/>
