import { BaseTree } from '../base/base_tree.ts';

class QuadTreeChildrenProxy<T> extends Array<QuadTree<T>> {
	public get leftUpper(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this[0];
	}

	public get rightUpper(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this[1];
	}

	public get rightLower(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this[2];
	}

	public get leftLower(): QuadTree<T> | undefined {
		return this._tree.isValue ? undefined : this[3];
	}

	constructor(private readonly _tree: QuadTree<T>) {
		super(..._tree.allChildren);
	}
}

export class QuadTree<T> extends BaseTree<T, QuadTreeChildrenProxy<T>> {
	public get isValue(): boolean {
		return this.children.length === 0;
	}

	public get children(): QuadTreeChildrenProxy<T> {
		return new QuadTreeChildrenProxy<T>(this);
	}

	protected constructor(
		value?: T,
		children?: BaseTree<T, QuadTreeChildrenProxy<T>>[],
	) {
		super(value, children);
	}

	public static base<T>(value: T): QuadTree<T> {
		return new QuadTree<T>(value);
	}

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

	public rotate(r = 0): QuadTree<T> {
		if (r < 0 || r > 360) {
			throw new Error(
				`Radians must be between 0 and 360, provided: ${r}`,
			);
		}

		if (r % 90 !== 0) {
			throw new Error(`Radians must be modulo of 90, provided: ${r}`);
		}

		if (this.isValue) {
			return this;
		}

		const mod = r / 90;

		switch (mod) {
			case 1:
				return QuadTree.create(
					this.children.leftLower!.rotate(r),
					this.children.leftUpper!.rotate(r),
					this.children.rightUpper!.rotate(r),
					this.children.rightLower!.rotate(r),
				);
			case 2:
				return QuadTree.create(
					this.children.rightLower!.rotate(r),
					this.children.leftLower!.rotate(r),
					this.children.leftUpper!.rotate(r),
					this.children.rightUpper!.rotate(r),
				);
			case 3:
				return QuadTree.create(
					this.children.rightUpper!.rotate(r),
					this.children.rightLower!.rotate(r),
					this.children.leftLower!.rotate(r),
					this.children.leftUpper!.rotate(r),
				);
			default:
				return this;
		}
	}
}
