type unsubscriber = () => unknown;

export class Subscribers {
	#list: unsubscriber[] = [];

	add(unsubscriber: unsubscriber) {
		this.#list.push(unsubscriber);
	}

	unsubscribe() {
		this.#list.forEach((i) => i());
		this.#list = [];
	}
}
