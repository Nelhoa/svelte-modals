export function createVirtualAnchor(x: number, y: number) {
	return {
		getBoundingClientRect: () => ({
			width: 0,
			height: 0,
			top: y,
			right: x,
			bottom: y,
			left: x,
			x,
			y
		})
	};
}
