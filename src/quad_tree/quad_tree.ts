import { BaseChildrenProxy, BaseTree } from '../base/base_tree.ts';

/**
 * Proxy for tree's children in the following form:
 *
 * ```ts
 * const tree = QuadTree.create(
 * 	QuadTree.base(1),
 * 	QuadTree.base(2),
 * 	QuadTree.base(3),
 * 	QuadTree.base(4),
 * );
 * ```
 *
 * ```
 * | 1 | 2 |
 * | 4 | 3 |
 * ```
 */
export class QuadTreeChildrenProxy<T>
	extends BaseChildrenProxy<T, QuadTree<T>> {
	/**
	 * Left-upper child of the tree. `1` in the example
	 */
	public get leftUpper(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this.get(0);
	}

	/**
	 * Right-upper child of the tree. `2` in the example.
	 */
	public get rightUpper(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this.get(1);
	}

	/**
	 * Right-lower child of the tree. `3` in the example.
	 */
	public get rightLower(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this.get(2);
	}

	/**
	 * Left-lower child of the tree. `4` in the example.
	 */
	public get leftLower(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this.get(3);
	}
}

/**
 * A tree with 4 children
 */
export class QuadTree<T> extends BaseTree<T, QuadTreeChildrenProxy<T>> {
	/**
	 * Is a value node
	 */
	public get isValue(): boolean {
		return this.children.length === 0;
	}

	/**
	 * @inheritDoc
	 */
	public override get children(): QuadTreeChildrenProxy<T> {
		return new QuadTreeChildrenProxy<T>(this);
	}

	protected constructor(
		value?: T,
		children?: BaseTree<T, QuadTreeChildrenProxy<T>>[],
	) {
		super(value, children);
	}

	/**
	 * Create a QuadTree with value
	 * @param value
	 */
	public static base<T>(value: T): QuadTree<T> {
		return new QuadTree<T>(value);
	}

	/**
	 * Create a QuadTree with four children
	 * @param leftUpper
	 * @param rightUpper
	 * @param rightLower
	 * @param leftLower
	 */
	public static create<T>(
		leftUpper: QuadTree<T>,
		rightUpper: QuadTree<T>,
		rightLower: QuadTree<T>,
		leftLower: QuadTree<T>,
	) {
		return new QuadTree<T>(undefined, [
			leftUpper,
			rightUpper,
			rightLower,
			leftLower,
		]);
	}

	/**
	 * Rotates a tree to specified degrees.
	 * Only value 0, 90, 180, 270 and 360 are accepted.
	 * @param degrees
	 */
	public rotate(degrees = 0): QuadTree<T> {
		if (degrees < 0 || degrees > 360) {
			throw new Error(
				`Radians must be between 0 and 360, provided: ${degrees}`,
			);
		}

		if (degrees % 90 !== 0) {
			throw new Error(
				`Radians must be modulo of 90, provided: ${degrees}`,
			);
		}

		if (this.isValue) {
			return this;
		}

		const mod = degrees / 90;

		switch (mod) {
			case 1:
				return QuadTree.create(
					this.children.leftLower!.rotate(degrees),
					this.children.leftUpper!.rotate(degrees),
					this.children.rightUpper!.rotate(degrees),
					this.children.rightLower!.rotate(degrees),
				);
			case 2:
				return QuadTree.create(
					this.children.rightLower!.rotate(degrees),
					this.children.leftLower!.rotate(degrees),
					this.children.leftUpper!.rotate(degrees),
					this.children.rightUpper!.rotate(degrees),
				);
			case 3:
				return QuadTree.create(
					this.children.rightUpper!.rotate(degrees),
					this.children.rightLower!.rotate(degrees),
					this.children.leftLower!.rotate(degrees),
					this.children.leftUpper!.rotate(degrees),
				);
			default:
				return this;
		}
	}
}
