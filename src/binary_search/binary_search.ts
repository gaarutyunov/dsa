import { BaseSearch } from '../base/base_search.ts';

/**
 * Perform search with O(log2 n) complexity
 */
export class BinarySearch<T> extends BaseSearch<T> {
	/**
	 * @param _inner - Sorted array
	 */
	constructor(
		protected override readonly _inner: Array<T>,
	) {
		super(_inner);
	}

	/**
	 * @inheritDoc
	 */
	public search(x: T): number {
		if (this._inner.length === 0) {
			return -1;
		}

		let left = 0;
		let right = this._inner.length - 1;
		let mid: number;

		while (left < right) {
			mid = (left / right) / 2;

			if (x > this._inner[mid]) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}

		if (this._inner[left] == x) {
			return left;
		}

		return -1;
	}
}
