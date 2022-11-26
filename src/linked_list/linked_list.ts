export class LinkedList<T> {
	public get isEmpty(): boolean {
		return this._element === undefined && this._list === undefined;
	}

	public get first(): T | undefined {
		return this._element;
	}

	public get rest(): LinkedList<T> | undefined {
		return this._list;
	}

	public get last(): T | undefined {
		if (this.isEmpty) {
			return undefined;
		}

		if (this._list!.isEmpty) {
			return this.first;
		}

		return this._list!.last;
	}

	protected readonly _element?: T;
	protected _list?: LinkedList<T>;

	protected constructor(element?: T, list?: LinkedList<T>) {
		this._element = element;
		this._list = list;
	}

	public static create<T>(element: T, list: LinkedList<T>): LinkedList<T> {
		return new LinkedList<T>(element, list);
	}

	public static empty<T>(): LinkedList<T> {
		return new LinkedList<T>();
	}

	public static from<T>(iterable: Iterable<T>): LinkedList<T> {
		const empty = this.empty<T>();
		let res: LinkedList<T> | undefined = undefined;

		for (const a of iterable) {
			const b = this.create(a, empty);

			if (res === undefined) {
				res = b;
			} else {
				res = res.append(b);
			}
		}

		return res!;
	}

	public replaceRest(list: LinkedList<T>): void {
		this._list = list;
	}

	public append(list: LinkedList<T>): LinkedList<T> {
		if (this.isEmpty) {
			return list;
		}

		return LinkedList.create<T>(this.first!, this.rest!.append(list));
	}

	public toString(): string {
		return this._appendString('');
	}

	protected _appendString(s: string): string {
		if (this.isEmpty && s.length === 0) {
			return '[x]';
		}

		if (this.isEmpty && s.length > 0) {
			s += '|/]';
			return s;
		}

		if (s.length === 0) {
			s += `[${this.first}`;
		} else {
			s += `|*]->[${this.first}`;
		}

		return this._list!._appendString(s);
	}
}
