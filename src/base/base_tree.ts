/**
 * Interface for trees
 */
interface ITree<T> {
	/**
	 Get parent of the tree.
	 Returns undefined when the tree has no parent.
 	 */
	get parent(): this | undefined;

	/**
	 * Get root of the tree.
	 * Returns undefined when the tree itself is a root
	 */
	get root(): this | undefined;

	/**
	 * Get the depth of the tree.
	 * Starts with 1 in the root.
	 */
	get depth(): number;

	/**
	 * Get the array of children
	 */
	get allChildren(): this[];
}

/**
 * Base tree's children proxy, that exposes an iterator
 */
export abstract class BaseChildrenProxy<T, TT extends ITree<T> = ITree<T>> {
	/**
	 * Get number of tree's children
	 */
	public get length(): number {
		return this._tree.allChildren.length;
	}

	constructor(protected readonly _tree: TT) {
	}

	/**
	 * Get a tree's child by index
	 * @param index array index
	 */
	public get(index: number): TT | undefined {
		return this._tree.allChildren[index];
	}

	/**
	 * Iterates over all children
	 */
	*[Symbol.iterator]() {
		for (const child of this._tree.allChildren) {
			yield child;
		}
	}
}

/**
 * Base class for trees
 */
export abstract class BaseTree<
	T,
	TC extends BaseChildrenProxy<T>,
> implements ITree<T> {
	/**
	 * @inheritDoc
	 */
	public get parent(): this | undefined {
		return this._parent;
	}
	/**
	 * @inheritDoc
	 */
	public get root(): this | undefined {
		return this._root;
	}

	/**
	 * @inheritDoc
	 */
	public get depth(): number {
		return this._depth;
	}

	/**
	 * Get tree's children
	 */
	public abstract get children(): TC;

	/**
	 * @inheritDoc
	 */
	public get allChildren(): this[] {
		return this._children as this[];
	}

	/**
	 * Get the siblings of the node in the tree
	 */
	public get siblings(): this[] {
		return this._parent?._children.filter((x) => x !== this) as this[] ??
			[];
	}

	private _parent?: this;
	private _depth = 1;
	private _root?: this;

	protected constructor(
		public readonly value?: T,
		protected readonly _children: BaseTree<T, TC>[] = [],
	) {
		this._updateChildren();
	}

	/**
	 * Recursively updates children's root, parent and depth properties
	 * @private
	 */
	private _updateChildren(): void {
		if (this._children.length === 0) {
			return;
		}

		for (const child of this._children) {
			child._root = this._depth === 1 ? this : this._root;
			child._parent = this;
			child._depth = this._depth + 1;

			child._updateChildren();
		}
	}
}
