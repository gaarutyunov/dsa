import { LinkedList } from '../linked_list/linked_list.ts';

export class Stack<T> extends LinkedList<T> {
	public get top(): T | undefined {
		return this.first;
	}

	public override get rest(): Stack<T> | undefined {
		return super.rest as Stack<T>;
	}

	protected constructor(element?: T, stack?: Stack<T>) {
		super(element, stack);
	}

	public static push<T>(element: T, stack: Stack<T>): Stack<T> {
		return this.create<T>(element, stack);
	}

	public static override create<T>(element: T, stack?: Stack<T>): Stack<T> {
		return new Stack<T>(element, stack ?? Stack.empty<T>());
	}

	public static override from<T>(iterable: Iterable<T>): Stack<T> {
		let res: Stack<T> | undefined = undefined;

		for (const a of iterable) {
			const b = this.create(a);

			if (res === undefined) {
				res = b;
			} else {
				res = res.append(b);
			}
		}

		return res!;
	}

	public static override empty<T>() {
		return new Stack<T>();
	}

	public pop(): Stack<T> | undefined {
		return this.rest;
	}

	public override append(list: Stack<T>): Stack<T> {
		if (this.isEmpty) {
			return list;
		}

		return Stack.create<T>(list.top!, this);
	}
}
