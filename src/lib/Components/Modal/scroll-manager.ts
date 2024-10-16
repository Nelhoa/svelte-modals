export function createStopScroll(styleGetter: () => CSSStyleDeclaration) {}

export class ScrollManager {
	#resume?: () => void;
	get resume() {
		return this.#resume;
	}

	stop(...targets: (HTMLElement | null | undefined)[]) {
		const stops = targets.map((i) => this.stopTarget(i));
		this.#resume = () => {
			stops.forEach((resume) => resume?.());
			this.#resume = undefined;
		};
	}

	stopTarget(target?: HTMLElement | null) {
		if (!target) return;
		const scrollBarrWidth = getScrollBarWidth(target);
		const previousPaddingRight = target.style.paddingRight;
		const previousOverflow = target.style.overflow;
		target.style.overflow = 'hidden';
		target.style.paddingRight = `${previousPaddingRight + scrollBarrWidth}px`;
		return () => {
			target.style.overflow = previousOverflow;
			target.style.paddingRight = previousPaddingRight;
		};
	}
}

function getScrollBarWidth(element: HTMLElement) {
	if (element === document.body || element === document.documentElement) {
		return window.innerWidth - document.documentElement.clientWidth;
	} else {
		return element.offsetWidth - element.clientWidth;
	}
}
