import { BaseLinkedList } from '../base/base_linked_list.ts';

/**
 * A linked list that contains a reference to values before and after current value
 */
export class DoublyLinkedList<T>
	extends BaseLinkedList<T, DoublyLinkedList<T>> {
	/**
	 * Gets the values to the right
	 */
	public get restRight(): DoublyLinkedList<T> | undefined {
		return this._list;
	}

	/**
	 * Gets the values to the left
	 */
	public get restLeft(): DoublyLinkedList<T> | undefined {
		return this._listLeft;
	}

	/**
	 * Holds reference to the list on the left
	 * @protected
	 */
	protected _listLeft?: DoublyLinkedList<T>;

	/**
	 * Creates an instance of a doubly-linked list
	 * @param element
	 * @param list
	 * @param appendLeft - when true appends a value to the left
	 * @protected
	 */
	protected constructor(
		element?: T,
		list?: DoublyLinkedList<T>,
		appendLeft?: boolean,
	) {
		const appendedLeft = appendLeft === true;
		super(element);

		if (appendedLeft) {
			this._list = list;
		} else {
			this._listLeft = list;
		}

		if (list !== undefined && appendedLeft) {
			list._listLeft = this;
		}

		if (list !== undefined && !appendedLeft) {
			list._list = this;
		}
	}

	/**
	 * Creates a list by appending a value to the left
	 * @param element
	 * @param list
	 */
	public static createLeft<T>(
		element: T,
		list?: DoublyLinkedList<T>,
	): DoublyLinkedList<T> {
		list = list?.traverseLeft() ?? this.empty<T, DoublyLinkedList<T>>();

		const newList = new DoublyLinkedList<T>(
			element,
			list,
			true,
		);
		const empty = this.empty<T, DoublyLinkedList<T>>();

		if (newList._listLeft === undefined) {
			empty._list = newList;
			newList._listLeft = empty;
		}

		return newList;
	}

	/**
	 * Create a list appending a value to the right
	 * @param element
	 * @param list
	 */
	public static createRight<T>(
		element: T,
		list?: DoublyLinkedList<T>,
	): DoublyLinkedList<T> {
		list = list?.traverseRight() ?? this.empty<T, DoublyLinkedList<T>>();

		const newList = new DoublyLinkedList<T>(
			element,
			list,
			false,
		);
		const empty = this.empty<T, DoublyLinkedList<T>>();

		if (newList._list === undefined) {
			empty._listLeft = newList;
			newList._list = empty;
		}

		return newList;
	}

	/**
	 * Creates a list from an iterable
	 * @param iterable
	 */
	public static from<T>(iterable: Iterable<T>): DoublyLinkedList<T> {
		let res: DoublyLinkedList<T> | undefined = undefined;

		for (const a of iterable) {
			res = this.createRight<T>(a, res);
		}

		return res!;
	}

	/**
	 * Appends a list to the right edge
	 * @param list
	 */
	public append(
		list: DoublyLinkedList<T>,
	): DoublyLinkedList<T> {
		const listToAppend = this.traverseRight();
		list = list.traverseLeft();

		listToAppend.replaceRest(
			list,
		);

		return listToAppend;
	}

	/**
	 * @inheritDoc
	 */
	public override toString(): string {
		if (this._listLeft !== undefined) {
			return this._listLeft.toString();
		}

		return super.toString();
	}

	/**
	 * Go to the left edge of the doubly-linked list
	 * @protected
	 */
	protected traverseLeft(): DoublyLinkedList<T> {
		let list: DoublyLinkedList<T>;
		list = this;

		while (
			list.restLeft !== undefined &&
			!list.restLeft.isEmpty
		) {
			list = list.restLeft!;
		}

		return list;
	}

	/**
	 * Go to the right edge of the doubly-linked list
	 * @protected
	 */
	protected traverseRight(): DoublyLinkedList<T> {
		let list: DoublyLinkedList<T>;
		list = this;

		while (
			list.restRight !== undefined &&
			!list.restRight.isEmpty
		) {
			list = list.restRight!;
		}

		return list;
	}

	/**
	 * @inheritDoc
	 * @protected
	 */
	protected override _appendString(s: string): string {
		if (
			this.isEmpty && this.restLeft === undefined &&
			this.restRight === undefined
		) {
			return '[x]';
		}

		if (this.isEmpty && this.restRight !== undefined) {
			s += '[/|';
			return this._list!._appendString(s);
		}

		if (this.isEmpty && this.restRight === undefined) {
			s += '|/]';
			return s;
		}

		if (s === '[/|') {
			s += `${this._element}`;
		} else {
			s += `|*]<->[*|${this._element}`;
		}

		return this._list!._appendString(s);
	}
}
