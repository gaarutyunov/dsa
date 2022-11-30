import {
	BinarySearchTree,
	BinarySearchTreeSorter,
} from './binary_search_tree.ts';
import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { sort } from '../helpers/sorter.ts';

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
				!!BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.search(5),
			expected: true,
		},
		{
			actual: () =>
				!!BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.search(1),
			expected: false,
		},
		{
			actual: () =>
				!!BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.search(11),
			expected: true,
		},
		{
			actual: () =>
				!!BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(
						10,
					)
					.insert(9)
					.insert(11)
					.insert(5)
					.insert(2)
					.insert(12)
					.search(undefined as unknown as number),
			expected: false,
		},
		{
			actual: () => BinarySearchTree.from([1, -1, 3, 4]).toArray(),
			expected: [1, [[-1], [3, [[4]]]]],
		},
		{
			actual: () =>
				sort(
					[1, -1, 4, 3],
					BinarySearchTreeSorter.getInstance<number>(),
				),
			expected: [-1, 1, 3, 4],
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
					.isValid,
			expected: true,
		},
		{
			actual: () =>
				BinarySearchTree.empty<number, BinarySearchTree<number>>()
					.isValid,
			expected: true,
		},
		{
			actual: () =>
				BinarySearchTree.create<number, BinarySearchTree<number>>(
					1,
					BinarySearchTree.createLeaf<
						number,
						BinarySearchTree<number>
					>(3),
					BinarySearchTree.createLeaf<
						number,
						BinarySearchTree<number>
					>(-1),
				).isValid,
			expected: false,
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(10)
					.insert(-1)
					.insert(1)
					.insert(3)
					.delete(3)
					.toArray(),
			expected: [10, [[-1, [[1]]]]],
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(10)
					.insert(-1)
					.insert(1)
					.insert(-3)
					.delete(1)
					.toArray(),
			expected: [10, [[-1, [[-3]]]]],
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(10)
					.insert(20)
					.insert(15)
					.insert(30)
					.delete(20)
					.toArray(),
			expected: [10, [[30, [[15]]]]],
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(10)
					.insert(9)
					.insert(7)
					.insert(6)
					.delete(7)
					.toArray(),
			expected: [10, [[9, [[6]]]]],
		},
		{
			actual: () =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(10)
					.insert(5)
					.insert(4)
					.children
					.smallest!
					.value!,
			expected: 4,
		},
		{
			actual: () =>
				BinarySearchTree
					.from([
						1,
						-2,
						-3,
						-1,
						2,
						3,
						0.5,
						4,
						2.5,
						2.7,
						2.1,
						1.2,
						0.7,
					])
					.delete(2)
					.children
					.smallest!
					.value!,
			expected: -3,
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

	await t.step({
		name: `case ${testCases.length + 2}`,
		fn: () => {
			assertThrows(() =>
				BinarySearchTree
					.createLeaf<number, BinarySearchTree<number>>(1)
					.insert(-1)
					.delete(3)
			);
		},
		sanitizeOps: false,
		sanitizeResources: false,
		sanitizeExit: false,
	});
});
