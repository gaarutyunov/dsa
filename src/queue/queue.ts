import { BaseLinkedList, ILinkedList } from '../base/base_linked_list.ts';

/**
 * A two-cell holding references to start and end of a queue
 */
class TwoCell<T, TL extends ILinkedList<T>> {
	/**
	 * Reference to end of queue
	 */
	public get end(): TL {
		return this._end;
	}

	/**
	 * Setter for end of queue
	 * @param value
	 */
	public set end(value: TL) {
		this._end = value;
	}

	/**
	 * Reference to queue start
	 */
	public readonly start: TL;
	private _end: TL;

	constructor(start: TL, end: TL) {
		this.start = start;
		this._end = end;
	}
}

/**
 * A linked list that models FIFO (First-In-First-Out) strategy
 */
export class Queue<T> extends BaseLinkedList<T, Queue<T>> {
	/**
	 * Get last element in queue
	 */
	public get last(): T | undefined {
		return this._twoCell.end._element;
	}

	/**
	 * Get top element in queue
	 */
	public get top(): T | undefined {
		return this._twoCell.start._element;
	}

	/**
	 * A two-cell holding references to start and end of a queue
	 * @private
	 */
	private readonly _twoCell: TwoCell<T, this>;

	/**
	 * @inheritDoc
	 */
	protected constructor(element?: T, queue?: Queue<T>) {
		super(element, queue);

		this._twoCell = new TwoCell<T, this>(this, this);
	}

	/**
	 * Pushes element to the end of a queue
	 * @param element
	 * @param queue
	 */
	public static push<T>(
		element: T,
		queue?: Queue<T>,
	): Queue<T> {
		if (queue === undefined) {
			return new Queue<T>(element, this.empty<T, Queue<T>>());
		}

		const newRest = this.push<T>(element);
		queue._twoCell.end.replaceRest(newRest);
		queue._twoCell.end = newRest;

		return queue;
	}

	/**
	 * Creates a queue from Iterable
	 * @param iterable
	 */
	public static from<T>(iterable: Iterable<T>): Queue<T> {
		let res: Queue<T> | undefined = undefined;

		for (const a of iterable) {
			res = this.push(a, res);
		}

		return res!;
	}

	/**
	 * Appends another queue at the end
	 * @param queue
	 */
	public append(queue: Queue<T>): Queue<T> {
		if (this.isEmpty) {
			return queue;
		}

		const newRest = this._list!.append(queue);

		const newQueue = new Queue<T>(this!.top!, newRest);
		newQueue._twoCell.end = queue._twoCell.end;

		return newQueue;
	}

	/**
	 * Returns the queue without top element
	 */
	public pop(): Queue<T> {
		if (this._twoCell.start === this._twoCell.end) {
			return this;
		}

		const newQueue = new Queue<T>(this._list!._element!, this._list!._list);
		newQueue._twoCell.end = this._twoCell.end;

		return newQueue;
	}

	/**
	 * @inheritDoc
	 */
	protected override _appendString(s: string): string {
		if (this.isEmpty && s.length === 0) {
			return '[x]';
		}

		if (this.isEmpty && s.length > 0) {
			if (s.endsWith('S')) {
				s += '+';
			} else {
				s += '(';
			}

			s += 'E)|/]';
			return s;
		}

		if (s.length === 0) {
			s += `[${this.top}(S`;
		} else {
			if (s.endsWith('S')) {
				s += ')';
			}
			s += `|*]->[${this.top}`;
		}

		return this._list!._appendString(s);
	}
}
