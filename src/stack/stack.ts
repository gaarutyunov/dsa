import { BaseLinkedList } from '../base/base_linked_list.ts';

/**
 * A linked list to model LIFO (Last-In-Last-Out)
 */
export class Stack<T> extends BaseLinkedList<T, Stack<T>> {
	/**
	 * Get the top element of stack
	 */
	public get top(): T | undefined {
		return this._element;
	}

	/**
	 * Get the stack without the top element
	 */
	public get pop(): Stack<T> | undefined {
		return this._list;
	}

	/**
	 * @inheritDoc
	 */
	protected constructor(element?: T, stack?: Stack<T>) {
		super(element, stack);
	}

	/**
	 * Pushes an element to the end of a stack or creates a new one
	 * @param element
	 * @param stack
	 */
	public static push<T>(element: T, stack?: Stack<T>): Stack<T> {
		return new Stack<T>(element, stack ?? this.empty<T, Stack<T>>());
	}

	/**
	 * Creates a stack from an iterable
	 * @param iterable
	 */
	public static from<T>(iterable: Iterable<T>): Stack<T> {
		let res: Stack<T> | undefined = undefined;

		for (const a of iterable) {
			res = this.push(a, res);
		}

		return res!;
	}
}
