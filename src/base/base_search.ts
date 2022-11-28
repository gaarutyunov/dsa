/**
 * Base class for searching algorithms
 */
export abstract class BaseSearch<T> {
	public constructor(protected readonly _inner: Iterable<T>) {
	}

	/**
	 * Search for x in this._inner
	 * @param x
	 */
	public abstract search(x: T): number;
}
