import { BaseChildrenProxy, BaseTree } from '../base/base_tree.ts';

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

class BinaryTreeChildrenProxy<T> extends BaseChildrenProxy<T, BinaryTree<T>> {
	/**
	 * Returns left child of a binary tree
	 */
	public get left(): BinaryTree<T> | undefined {
		return this._tree.isEmpty ? undefined : this.get(0);
	}

	/**
	 * Returns right child of a binary tree
	 */
	public get right(): BinaryTree<T> | undefined {
		return this._tree.isEmpty ? undefined : this.get(1);
	}
}

export class BinaryTree<T> extends BaseTree<T, BinaryTreeChildrenProxy<T>> {
	/**
	 * Checks whether binary tree has no children
	 */
	public get isEmpty(): boolean {
		return this.allChildren.length === 0;
	}

	/**
	 * @inheritDoc
	 */
	public get children(): BinaryTreeChildrenProxy<T> {
		return new BinaryTreeChildrenProxy<T>(this);
	}

	/**
	 * Creates an empty binary tree
	 */
	public static empty<T>(): BinaryTree<T> {
		return new this<T>();
	}

	/**
	 * Creates a binary tree with value and two children
	 * @param value
	 * @param left left child
	 * @param right right child
	 */
	public static create<T>(
		value: T,
		left: BinaryTree<T>,
		right: BinaryTree<T>,
	): BinaryTree<T> {
		return new this<T>(value, [left, right]);
	}

	/**
	 * Creates a leaf with value and two empty children
	 * @param value
	 */
	public static createLeaf<T>(value: T): BinaryTree<T> {
		return new this<T>(value, [this.empty<T>(), this.empty<T>()]);
	}

	/**
	 * Equality for binary trees
	 * @param other tree to compare with
	 */
	public equals(other?: BinaryTree<T>): boolean {
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
	 * Recursively converts a tree to array format,
	 * where first value is the value of the node
	 * and second value is the array of children:
	 * ```ts
	 * const tree = Tree.create(1, Tree.create(2), Tree.create(3));
	 *
	 * tree.toArray() === [1, [[2], [2]]];
	 * ```
	 */
	public toArray(): ValueAndChildren<T> {
		if (this.allChildren.every((x) => x.isEmpty)) {
			return [this.value];
		}

		return [
			this.value,
			this.allChildren
				.map((x) => x.toArray()) as [
					ValueAndChildren<T>,
					ValueAndChildren<T>,
				],
		];
	}
}
