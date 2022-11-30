import { BinarySearchTree } from './binary_search_tree.ts';
import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.166.0/testing/asserts.ts';

Deno.test('BinarySearchTree', async (t) => {
	const testCases = [
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.toArray(),
			expected: [10, [[9, [[5, [[2]]]]], [11, [[12]]]]],
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.isIn(5),
			expected: true,
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.isIn(1),
			expected: false,
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.isIn(11),
			expected: true,
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.isIn(undefined as unknown as number),
			expected: false,
		},
	];

	await Promise.all(testCases.map(async ({ actual, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(actual(), expected as unknown),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));

	await t.step({
		name: `case ${testCases.length + 1}`,
		fn: () => {
			assertThrows(() =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(1)
					.insert(1)
			);
		},
		sanitizeOps: false,
		sanitizeResources: false,
		sanitizeExit: false,
	});
});
