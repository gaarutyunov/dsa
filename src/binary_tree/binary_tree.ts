import { BaseChildrenProxy, BaseTree, ITree } from '../base/base_tree.ts';

/**
 * @internal
 */
type Value<T> = T | undefined;

/**
 * Multidimensional array with value and children
 */
export type ValueAndChildren<T> =
	| [Value<T>]
	| [Value<T>, [ValueAndChildren<T>, ValueAndChildren<T>]];

/**
 * Interface for binary trees
 */
interface IBinaryTree<T> extends ITree<T> {
	/**
	 * Checks whether binary tree has no children
	 */
	get isEmpty(): boolean;

	/**
	 * Get the size of the tree, i.e. the number of nodes
	 */
	get size(): number;

	/**
	 * Equality for binary trees
	 * @param other tree to compare with
	 */
	equals(other?: this): boolean;
}

/**
 * An accessor for binary tree's children
 */
export class BinaryTreeChildrenProxy<
	T,
	TT extends IBinaryTree<T> = IBinaryTree<T>,
> extends BaseChildrenProxy<T, TT> {
	/**
	 * Returns left child of a binary tree
	 */
	public get left(): TT | undefined {
		return this._tree.isEmpty ? undefined : this.get(0);
	}

	/**
	 * Returns right child of a binary tree
	 */
	public get right(): TT | undefined {
		return this._tree.isEmpty ? undefined : this.get(1);
	}
}

/**
 * A tree with two children
 */
export class BinaryTree<
	T,
	TC extends BinaryTreeChildrenProxy<T> = BinaryTreeChildrenProxy<T>,
> extends BaseTree<T, BinaryTreeChildrenProxy<T>> implements IBinaryTree<T> {
	/**
	 * Checks whether a node is a leaf
	 */
	public get isLeaf(): boolean {
		return this.allChildren.every((x) => x.isEmpty);
	}

	/**
	 * @inheritDoc
	 */
	public get isEmpty(): boolean {
		return this.allChildren.length === 0;
	}

	/**
	 * @inheritDoc
	 */
	public get children(): TC {
		return new BinaryTreeChildrenProxy<T, this>(this) as unknown as TC;
	}

	/**
	 * @inheritDoc
	 */
	public get size(): number {
		if (this.isEmpty) return 0;

		return 1 + this.children.left!.size + this.children.right!.size;
	}

	/**
	 * Creates an empty binary tree
	 */
	public static empty<T, TT extends BinaryTree<T> = BinaryTree<T>>(): TT {
		return new this<T>() as TT;
	}

	/**
	 * Creates a binary tree with value and two children
	 * @param value
	 * @param left left child
	 * @param right right child
	 */
	public static create<T, TT extends BinaryTree<T> = BinaryTree<T>>(
		value: T,
		left: BinaryTree<T>,
		right: BinaryTree<T>,
	): TT {
		return new this<T>(value, [left, right]) as TT;
	}

	/**
	 * Creates a leaf with value and two empty children
	 * @param value
	 */
	public static createLeaf<T, TT extends BinaryTree<T> = BinaryTree<T>>(
		value: T,
	): TT {
		return new this<T>(value, [this.empty<T>(), this.empty<T>()]) as TT;
	}

	/**
	 * @inheritDoc
	 */
	public equals(other?: this): boolean {
		if (!other) {
			return false;
		}

		if (this.isEmpty && other.isEmpty) {
			return this.value === other.value;
		}

		return this.value === other.value &&
			(this.children.left!.equals(other.children!.left) &&
				this.children.right!.equals(other.children!.right));
	}

	/**
	 * Recursively converts a tree to array format.
	 */
	public toArray(): ValueAndChildren<T> {
		if (this.allChildren.every((x) => x.isEmpty)) {
			return [this.value];
		}

		return [
			this.value,
			this.allChildren
				.filter((x) => !x.isEmpty)
				.map((x) => x.toArray()) as [
					ValueAndChildren<T>,
					ValueAndChildren<T>,
				],
		];
	}
}
