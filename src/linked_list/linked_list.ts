import { BaseLinkedList } from '../base/base_linked_list.ts';

/**
 * The most simple linked list
 */
export class LinkedList<T> extends BaseLinkedList<T, LinkedList<T>> {
	/**
	 * Get the first value of the linked list
	 */
	public get first(): T | undefined {
		return this._element;
	}

	/**
	 * Gets the rest of values
	 */
	public get rest(): LinkedList<T> | undefined {
		return this._list;
	}

	/**
	 * Gets the last value of the linked list
	 */
	public get last(): T | undefined {
		if (this.isEmpty) {
			return undefined;
		}

		if (this._list!.isEmpty) {
			return this.first;
		}

		return this._list!.last;
	}

	/**
	 * Pushes an element to a list or creates a new one
	 * @param element
	 * @param list
	 */
	public static create<T>(element: T, list?: LinkedList<T>): LinkedList<T> {
		return new LinkedList<T>(
			element,
			list ?? this.empty<T, LinkedList<T>>(),
		);
	}

	/**
	 * Creates a linked list from an itrable
	 * @param iterable
	 */
	public static from<T>(iterable: Iterable<T>): LinkedList<T> {
		let res: LinkedList<T> = this.empty<T, LinkedList<T>>();

		for (const a of iterable) {
			res = res.append(this.create(a));
		}

		return res!;
	}

	/**
	 * Appends a list to the end
	 * @param list
	 */
	public append(list: LinkedList<T>): LinkedList<T> {
		if (this.isEmpty) {
			return list;
		}

		return LinkedList.create<T>(this.first!, this.rest!.append(list));
	}
}
