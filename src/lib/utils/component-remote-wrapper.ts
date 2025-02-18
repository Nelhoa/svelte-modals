import { getContext, setContext } from 'svelte';

export function newRemote<T, A extends unknown[]>(context: string, classType: new (...i: A) => T) {
	function create(...params: ConstructorParameters<typeof classType>) {
		const remote = new classType(...params);
		setContext(context, remote);
		return remote;
	}

	function createOrReset(
		func?: { get: () => T | undefined | null; set: (remote: T) => unknown },
		...params: ConstructorParameters<typeof classType>
	) {
		const remote = func?.get() ?? new classType(...params);
		func?.set(remote);
		setContext(context, remote);
		return remote;
	}

	function get(throwError: 'throw'): T;
	function get(): T | undefined;
	function get(throwError?: 'throw') {
		const remote = getContext(context);
		if (throwError) {
			if (!remote) throw Error(`No remote found for context ${context}`);
			return remote as T;
		}
		return remote as T | undefined;
	}

	return { create, get, createOrReset };
}
