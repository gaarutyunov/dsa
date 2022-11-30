import { DefaultComparer } from './comparer.ts';

/**
 * Interface for sorting
 */
export interface ISorter<T> {
	/**
	 * Sorts values in ascending order
	 * @param x
	 */
	sort(x: Iterable<T>): Iterable<T>;
}

/**
 * Default sorting based on default comparator
 */
export class DefaultSorter<T> implements ISorter<T> {
	private readonly _defaultComparator = DefaultComparer.getInstance<T>();
	private static _instance = new this();

	protected constructor() {
	}

	/**
	 * Get static instance
	 */
	public static getInstance<T>(): DefaultSorter<T> {
		return this._instance as DefaultSorter<T>;
	}

	/**
	 * @inheritDoc
	 */
	public sort(x: Iterable<T>): Iterable<T> {
		const arr = Array.isArray(x) ? x : Array.from<T>(x);

		return arr.sort(
			(a, b) => this._defaultComparator.compare(a, b),
		);
	}
}

/**
 * Sorts `x` using provided `sorter` in ascending order
 * @param x
 * @param sorter
 */
export function sort<T, TS extends ISorter<T> = DefaultSorter<T>>(
	x: Iterable<T>,
	sorter: TS = DefaultSorter.getInstance<T>() as unknown as TS,
): Iterable<T> {
	return sorter.sort(x);
}
