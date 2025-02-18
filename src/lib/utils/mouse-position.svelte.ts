import { on } from 'svelte/events';

const mousePosition = $state({ x: 0, y: 0 });

$effect.root(() => {
	$effect(() => {
		return on(window, 'mousemove', handleMouseMove);
	});
});

function handleMouseMove(e: MouseEvent) {
	mousePosition.x = e.clientX;
	mousePosition.y = e.clientY;
}

export const mouse = {
	get x() {
		return mousePosition.x;
	},
	get y() {
		return mousePosition.y;
	}
};
