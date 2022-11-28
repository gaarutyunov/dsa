import { BaseSearch } from '../base/base_search.ts';

/**
 * Perform search with O(n) complexity
 */
export class LinearSearch<T> extends BaseSearch<T> {
	/**
	 * @inheritDoc
	 */
	public search(x: T): number {
		let i = 0;

		for (const a of this._inner) {
			if (a === x) {
				return i;
			}

			i++;
		}

		return -1;
	}
}
