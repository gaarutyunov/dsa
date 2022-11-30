import {
	BinaryTree,
	BinaryTreeChildrenProxy,
} from '../binary_tree/binary_tree.ts';

/**
 * Binary tree that supports searching for values
 */
export class BinarySearchTree<T> extends BinaryTree<T> {
	/**
	 * @inheritDoc
	 */
	public override get children(): BinaryTreeChildrenProxy<T, this> {
		return new BinaryTreeChildrenProxy<T, this>(this);
	}

	/**
	 * Insert a new value into binary search tree
	 * @param value
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
	 * Search for value in the binary search tree
	 * @param value
	 */
	public isIn(value: T): boolean {
		if (this.isEmpty) {
			return false;
		}

		if (value === this.value!) {
			return true;
		}

		if (value < this.value!) {
			return this.children.left!.isIn(value);
		}

		if (value > this.value!) {
			return this.children.right!.isIn(value);
		}

		return false;
	}
}
