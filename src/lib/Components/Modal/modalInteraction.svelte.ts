export function modalInteraction<
	Element extends MediaQueryList,
	Type extends keyof MediaQueryListEventMap
>(
	element: Element,
	type: Type,
	handler: (this: Element, event: MediaQueryListEventMap[Type]) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
