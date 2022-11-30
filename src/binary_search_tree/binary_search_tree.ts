import {
	BinaryTree,
	BinaryTreeChildrenProxy,
} from '../binary_tree/binary_tree.ts';
import { IComparer, isBigger, isSmaller } from '../helpers/comparer.ts';
import { ISorter } from '../helpers/sorter.ts';
import { DefaultComparer } from '../helpers/comparer.ts';

/**
 * Interface for binary search trees
 */
export interface IBinarySearchTree<T> {
	/**
	 * Insert a new value into binary search tree
	 * @param value
	 */
	insert(value: T): this;
	/**
	 * Search a node by value
	 * @param value
	 */
	search(value: T): this | undefined;
}

/**
 * Accessor for binary search tree's children
 */
export class BinarySearchTreeChildrenProxy<T>
	extends BinaryTreeChildrenProxy<T, BinarySearchTree<T>> {
	/**
	 * Gets the smallest child
	 */
	public get smallest(): BinarySearchTree<T> | undefined {
		if (this.left!.isEmpty) {
			return this._tree;
		}

		return this.left!.children.smallest;
	}
}

/**
 * Compares binary search trees
 */
export class BinarySearchTreeComparer<T>
	implements IComparer<BinarySearchTree<T>> {
	private static smallerInstance = new this(true);
	private static biggerInstance = new this(false);

	private readonly _expectedCompareReturn: number;

	/**
	 * @param _strictSmaller checks whether all left subtrees are smaller
	 * @private
	 */
	private constructor(private readonly _strictSmaller: boolean) {
		this._expectedCompareReturn = _strictSmaller ? -1 : 1;
	}

	/**
	 * Get and instance of comparator
	 * @param strictSmaller checks whether all left subtrees are smaller
	 */
	public static getInstance(strictSmaller: boolean) {
		return strictSmaller ? this.smallerInstance : this.biggerInstance;
	}

	/**
	 * @inheritDoc
	 */
	public compare<B>(tree: BinarySearchTree<T>, value: B): number {
		if (tree.isEmpty) {
			return this._expectedCompareReturn;
		}

		const compareSelf = () =>
			DefaultComparer.getInstance().compare(tree.value!, value);
		const compareLeft = () => this.compare(tree.children.left!, value);
		const compareRight = () => this.compare(tree.children.right!, value);

		return [compareSelf, compareLeft, compareRight].every((
				x: () => number,
			) => x() === this._expectedCompareReturn
			)
			? this._expectedCompareReturn
			: -this._expectedCompareReturn;
	}
}

/**
 * Sorts values using binary search trees
 */
export class BinarySearchTreeSorter<T> implements ISorter<T> {
	private static _instance = new this();

	protected constructor() {
	}

	/**
	 * Gets static instance
	 */
	public static getInstance<T>(): BinarySearchTreeSorter<T> {
		return this._instance as BinarySearchTreeSorter<T>;
	}

	/**
	 * @inheritDoc
	 */
	public sort(x: Iterable<T>): T[] {
		let tree = BinarySearchTree.empty<T, BinarySearchTree<T>>();

		for (const value of x) {
			tree = tree.insert(value);
		}

		return BinarySearchTree.from(x).sortedValues;
	}
}

/**
 * Binary tree that supports searching for values
 */
export class BinarySearchTree<T>
	extends BinaryTree<T, BinarySearchTreeChildrenProxy<T>>
	implements IBinarySearchTree<T> {
	/**
	 * Gets values as sorted array
	 */
	public get sortedValues(): T[] {
		if (this.isEmpty) return [];

		return [
			...this.children.left!.sortedValues,
			this.value!,
			...this.children.right!.sortedValues,
		];
	}

	/**
	 * Checks whether a formed binary search tree is valid
	 */
	public get isValid(): boolean {
		if (this.isEmpty) {
			return true;
		}

		return isSmaller(
			this.children.left!,
			this.value!,
			BinarySearchTreeComparer.getInstance(true),
		) && this.children.left!.isValid &&
			isBigger(
				this.children.right!,
				this.value!,
				BinarySearchTreeComparer.getInstance(false),
			) &&
			this.children.right!.isValid;
	}

	/**
	 * @inheritDoc
	 */
	public override get children(): BinarySearchTreeChildrenProxy<T> {
		return new BinarySearchTreeChildrenProxy<T>(this);
	}

	/**
	 * Create a binary search tree from an iterable
	 * @param x
	 */
	public static from<T>(x: Iterable<T>): BinarySearchTree<T> {
		let tree = this.empty<T, BinarySearchTree<T>>();

		for (const v of x) {
			tree = tree.insert(v);
		}

		return tree;
	}

	/**
	 * @inheritDoc
	 */
	public insert(value: T): this {
		if (this.isEmpty) {
			return BinarySearchTree.createLeaf<T, this>(value);
		}

		if (value < this.value!) {
			return BinarySearchTree.create<T, this>(
				this.value!,
				this.children.left!.insert(value),
				this.children.right!,
			);
		}

		if (value > this.value!) {
			return BinarySearchTree.create<T, this>(
				this.value!,
				this.children.left!,
				this.children.right!.insert(value),
			);
		}

		throw new Error('violated assumption in procedure insert');
	}

	/**
	 * @inheritDoc
	 */
	public search(value: T): this | undefined {
		if (this.isEmpty) {
			return undefined;
		}

		if (value === this.value!) {
			return this;
		}

		if (value < this.value!) {
			return this.children.left!.search(value) as this;
		}

		if (value > this.value!) {
			return this.children.right!.search(value) as this;
		}

		return undefined;
	}

	/**
	 * Delete a node with given value
	 * @param value
	 */
	public delete(value: T): this {
		if (this.isEmpty) {
			throw new Error('value not found');
		}

		if (value < this.value!) {
			return BinarySearchTree.create<T, this>(
				this.value!,
				this.children.left!.delete(value),
				this.children.right!,
			);
		}

		if (value > this.value!) {
			return BinarySearchTree.create<T, this>(
				this.value!,
				this.children.left!,
				this.children.right!.delete(value),
			);
		}

		if (this.children.left!.isEmpty) {
			return this.children.right as this;
		}

		if (this.children.right!.isEmpty) {
			return this.children.left as this;
		}

		return BinarySearchTree.create<T, this>(
			this.children.right!.children.smallest!.value!,
			this.children.left!,
			this.children.right!.removeSmallestNode(),
		);
	}

	/**
	 * Removes the smallest node from the tree
	 */
	public removeSmallestNode(): this {
		if (this.children.left!.isEmpty) {
			return this.children.right as this;
		}

		return BinarySearchTree.create<T, this>(
			this.value!,
			this.children.left!.removeSmallestNode(),
			this.children.right as this,
		);
	}
}
