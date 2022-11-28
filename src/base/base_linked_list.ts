/**
 * Interface for linked lists
 */
export interface ILinkedList<T> {
	/**
	 * Check if linked list is empty (has no value)
	 */
	get isEmpty(): boolean;

	/**
	 * Convert to string representation
	 */
	toString(): string;
}

/**
 * Base class for linked lists
 */
export class BaseLinkedList<T, TL extends ILinkedList<T> = ILinkedList<T>>
	implements ILinkedList<T> {
	/**
	 * @inheritDoc
	 */
	public get isEmpty(): boolean {
		return this._element === undefined;
	}

	/**
	 * Underlying value
	 * @protected
	 */
	protected readonly _element?: T;
	/**
	 * Reference to another list
	 * @protected
	 */
	protected _list?: TL;

	/**
	 * Creates an instance of linked-list
	 * @param element - underlying value
	 * @param list - reference to another linked-list
	 * @protected
	 */
	protected constructor(element?: T, list?: TL) {
		this._element = element;
		this._list = list;
	}

	/**
	 * Create an empty list
	 */
	public static empty<T, TL extends ILinkedList<T> = ILinkedList<T>>(): TL {
		return new this<T, TL>() as unknown as TL;
	}

	/**
	 * Replace reference to list
	 * @param list - list to replace by
	 */
	public replaceRest(list: TL): this {
		this._list = list;

		return this;
	}

	/**
	 * @inheritDoc
	 */
	public toString(): string {
		return this._appendString('');
	}

	/**
	 * Recursively appends tokens to string representation
	 * @param acc - string accumulation
	 * @protected
	 */
	protected _appendString(acc: string): string {
		if (this.isEmpty && acc.length === 0) {
			return '[x]';
		}

		if (this.isEmpty && acc.length > 0) {
			acc += '|/]';
			return acc;
		}

		if (acc.length === 0) {
			acc += `[${this._element}`;
		} else {
			acc += `|*]->[${this._element}`;
		}

		return (this._list! as unknown as BaseLinkedList<T>)._appendString(acc);
	}
}
