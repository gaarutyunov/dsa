import { BinaryTree } from './binary_tree.ts';
import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

Deno.test('BinaryTree', async (t) => {
	const testCases = [
		{
			actual: () =>
				BinaryTree.create(
					1,
					BinaryTree.createLeaf(2),
					BinaryTree.createLeaf(3),
				).toArray(),
			expected: [1, [[2], [3]]] as [number, [[number], [number]]],
		},
		{
			actual: () =>
				BinaryTree.create(
					1,
					BinaryTree.createLeaf(2),
					BinaryTree.createLeaf(3),
				).equals(BinaryTree.create(
					1,
					BinaryTree.createLeaf(2),
					BinaryTree.createLeaf(3),
				)),
			expected: true,
		},
		{
			actual: () =>
				BinaryTree.create(
					1,
					BinaryTree.create(
						1,
						BinaryTree.createLeaf(2),
						BinaryTree.createLeaf(3),
					),
					BinaryTree.create(
						1,
						BinaryTree.createLeaf(2),
						BinaryTree.createLeaf(3),
					),
				).equals(BinaryTree.create(
					1,
					BinaryTree.create(
						1,
						BinaryTree.createLeaf(2),
						BinaryTree.createLeaf(3),
					),
					BinaryTree.create(
						1,
						BinaryTree.createLeaf(2),
						BinaryTree.createLeaf(3),
					),
				)),
			expected: true,
		},
		{
			actual: () => BinaryTree.empty().equals(undefined),
			expected: false,
		},
		{
			actual: () => {
				const tree = BinaryTree.create(
					1,
					BinaryTree.createLeaf(2),
					BinaryTree.createLeaf(3),
				);

				return [tree.children.left?.value, tree.children.right?.value];
			},
			expected: [2, 3],
		},
		{
			actual: () => {
				const tree = BinaryTree.createLeaf(2);

				return [tree.children.left?.value, tree.children.right?.value];
			},
			expected: [undefined, undefined],
		},
		{
			actual: () => {
				const tree = BinaryTree.create(
					1,
					BinaryTree.createLeaf(2),
					BinaryTree.createLeaf(3),
				);

				return tree === tree.children.left?.parent &&
					tree === tree.children.left?.root;
			},
			expected: true,
		},
		{
			actual: () =>
				BinaryTree.create(
					1,
					BinaryTree.create(
						2,
						BinaryTree.createLeaf(3),
						BinaryTree.createLeaf(4),
					),
					BinaryTree.create(
						5,
						BinaryTree.createLeaf(6),
						BinaryTree.createLeaf(7),
					),
				).children.left?.children.left?.depth,
			expected: 3,
		},
		{
			actual: () => {
				const tree = BinaryTree.empty();
				return [tree.children.left, tree.children.right];
			},
			expected: [undefined, undefined],
		},
		{
			actual: () => {
				const values = [];

				for (
					const child of BinaryTree.create(
						2,
						BinaryTree.createLeaf(3),
						BinaryTree.createLeaf(4),
					).children
				) {
					values.push(child.value);
				}

				return values;
			},
			expected: [3, 4],
		},
		{
			actual: () => BinaryTree.empty<number>().toArray(),
			expected: [undefined],
		},
	];

	await Promise.all(testCases.map(async ({ actual, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(actual(), expected),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));
});
