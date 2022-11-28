export abstract class BaseTree<
	T,
	TC extends BaseTree<T, TC>[],
> {
	public get depth(): number {
		return this._depth;
	}

	public abstract get children(): TC;

	public get allChildren(): this[] {
		return this._children as this[];
	}

	public get siblings(): this[] {
		return this.parent?._children.filter((x) => x !== this) as this[] ?? [];
	}

	public parent?: this;
	private _depth = 1;

	protected constructor(
		public readonly value?: T,
		protected readonly _children: BaseTree<T, TC>[] = [],
	) {
		for (const child of _children) {
			child.parent = this;
			child._depth = this._depth + 1;
		}
	}
}
