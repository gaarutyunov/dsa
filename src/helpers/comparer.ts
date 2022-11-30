/**
 * Interface for objects comparison
 */
export interface IComparer<A> {
	/**
     Compares two objects:

     1) If a > b, returns 1

     2) If a < b, returns 2

     3) Otherwise, returns 0
     @param a
     @param b
     */
	compare<B = A>(a: A, b: B): number;
}

/**
 * Default comparison using operators
 */
export class DefaultComparer<A> implements IComparer<A> {
	protected static _instance = new this();

	protected constructor() {
	}

	/**
	 * @inheritDoc
	 */
	public compare<B = A>(a: A, b: B): number {
		return a > (b as unknown as A) ? 1 : a < (b as unknown as A) ? -1 : 0;
	}

	/**
	 * Gets static comparator instance
	 */
	public static getInstance<A>(): DefaultComparer<A> {
		return this._instance;
	}
}

/**
 * Compares `a` and `b` using comparer
 * @param a
 * @param b
 * @param comparer
 */
export function compare<
	A,
	B,
	TC extends IComparer<A> = DefaultComparer<A>,
>(
	a: A,
	b: B,
	comparer: TC = DefaultComparer.getInstance<A>() as TC,
): number {
	return comparer.compare<B>(a, b);
}

/**
 * Checks whether `a` is smaller than `b`
 * @param a
 * @param b
 * @param comparer
 */
export function isSmaller<
	A,
	B,
	TC extends IComparer<A> = DefaultComparer<A>,
>(
	a: A,
	b: B,
	comparer: TC = DefaultComparer.getInstance<A>() as TC,
): boolean {
	return compare(a, b, comparer) === -1;
}

/**
 * Checks whether `a` is bigger than `b`
 * @param a
 * @param b
 * @param comparer
 */
export function isBigger<
	A,
	B,
	TC extends IComparer<A> = DefaultComparer<A>,
>(
	a: A,
	b: B,
	comparer: TC = DefaultComparer.getInstance<A>() as TC,
): boolean {
	return compare(a, b, comparer) === 1;
}

/**
 * Checks whether `a` is equal to `b`
 * @param a
 * @param b
 * @param comparer
 */
export function isEqual<
	A,
	B,
	TC extends IComparer<A> = DefaultComparer<A>,
>(
	a: A,
	b: B,
	comparer: TC = DefaultComparer.getInstance<A>() as TC,
): boolean {
	return compare(a, b, comparer) === 0;
}
