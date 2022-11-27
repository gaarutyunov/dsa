import { LinkedList } from '../linked_list/linked_list.ts';

export class DoublyLinkedList<T> extends LinkedList<T> {
	public override get isEmpty(): boolean {
		return this._element === undefined &&
			(this._list === undefined || this._listLeft === undefined);
	}

	public get firstRight(): T | undefined {
		if (this.restRight === undefined || this.restRight.isEmpty) {
			return this.first;
		}

		let list = this.restRight;

		while (
			list !== undefined && list.restRight !== undefined &&
			!list.restRight.isEmpty
		) {
			list = list.restRight!;
		}

		return list!.first;
	}

	public get restRight(): DoublyLinkedList<T> | undefined {
		return this.rest;
	}

	public override get rest(): DoublyLinkedList<T> | undefined {
		return super.rest as DoublyLinkedList<T>;
	}

	public get firstLeft(): T | undefined {
		if (this.restLeft === undefined || this.restLeft.isEmpty) {
			return this.first;
		}

		let list = this.restLeft;

		while (
			list !== undefined && list.restLeft !== undefined &&
			!list.restLeft.isEmpty
		) {
			list = list.restLeft!;
		}

		return list!.first;
	}

	public get restLeft(): DoublyLinkedList<T> | undefined {
		return this._listLeft;
	}

	protected _listLeft?: DoublyLinkedList<T>;

	protected constructor(
		element?: T,
		list?: DoublyLinkedList<T>,
		rightHanded?: boolean,
	) {
		const isRightHanded = rightHanded === true;
		super(element, undefined);

		if (isRightHanded) {
			this._list = list;
		} else {
			this._listLeft = list;
		}

		if (list !== undefined && isRightHanded) {
			list._listLeft = this;
		}

		if (list !== undefined && !isRightHanded) {
			list._list = this;
		}
	}

	public static override empty<T>(): DoublyLinkedList<T> {
		return new DoublyLinkedList<T>();
	}

	public static override create<T>(
		element: T,
		list?: DoublyLinkedList<T>,
		rightHanded?: boolean,
	): DoublyLinkedList<T> {
		if (rightHanded === true && list !== undefined) {
			while (list.restLeft !== undefined && !list.restLeft.isEmpty) {
				list = list.restLeft;
			}
		}

		if (rightHanded === false && list !== undefined) {
			while (list.restRight !== undefined && !list.restRight.isEmpty) {
				list = list.restRight;
			}
		}

		const newList = new DoublyLinkedList<T>(
			element,
			list ?? this.empty(),
			rightHanded,
		);
		const empty = this.empty<T>();

		if (rightHanded === true && newList._listLeft === undefined) {
			empty._list = newList;
			newList._listLeft = empty;
		}

		if (rightHanded === false && newList._list === undefined) {
			empty._listLeft = newList;
			newList._list = empty;
		}

		return newList;
	}

	public static createLeft<T>(
		element: T,
		list?: DoublyLinkedList<T>,
	): DoublyLinkedList<T> {
		return this.create(element, list, true);
	}

	public static createRight<T>(
		element: T,
		list?: DoublyLinkedList<T>,
	): DoublyLinkedList<T> {
		return this.create(element, list, false);
	}

	public static override from<T>(iterable: Iterable<T>): DoublyLinkedList<T> {
		let res: DoublyLinkedList<T> | undefined = undefined;

		for (const a of iterable) {
			res = this.createRight<T>(a, res);
		}

		return res!;
	}

	public override append(
		list: DoublyLinkedList<T>,
		rightHanded?: boolean,
	): DoublyLinkedList<T> {
		throw new Error('append not implemented');
	}

	public override toString(): string {
		if (this._listLeft !== undefined) {
			return this._listLeft.toString();
		}

		return super.toString();
	}

	protected override _appendString(s: string): string {
		if (
			this.isEmpty && this.restLeft === undefined &&
			this.restRight === undefined
		) {
			return '[x]';
		}

		if (this.isEmpty && this.restRight !== undefined) {
			s += '[/|';
			return this.rest!._appendString(s);
		}

		if (this.isEmpty && this.restRight === undefined) {
			s += '|/]';
			return s;
		}

		if (s === '[/|') {
			s += `${this.first}`;
		} else {
			s += `|*]<->[*|${this.first}`;
		}

		return this.rest!._appendString(s);
	}
}
