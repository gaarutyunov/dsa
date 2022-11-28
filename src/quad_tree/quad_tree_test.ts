import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { QuadTree } from './quad_tree.ts';

Deno.test('QuadTree', async (t) => {
	const testCases = [
		{
			actual: () => QuadTree.base(1).isValue,
			expected: true,
		},
		{
			actual: () => {
				const tree = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate();

				return [
					tree.children.leftUpper!.value,
					tree.children.rightUpper!.value,
					tree.children.rightLower!.value,
					tree.children.leftLower!.value,
				];
			},
			expected: [1, 2, 3, 4],
		},
		{
			actual: () => {
				const tree = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(90);

				return [
					tree.children.leftUpper!.value,
					tree.children.rightUpper!.value,
					tree.children.rightLower!.value,
					tree.children.leftLower!.value,
				];
			},
			expected: [4, 1, 2, 3],
		},
		{
			actual: () => {
				const tree = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(180);

				return [
					tree.children.leftUpper!.value,
					tree.children.rightUpper!.value,
					tree.children.rightLower!.value,
					tree.children.leftLower!.value,
				];
			},
			expected: [3, 4, 1, 2],
		},
		{
			actual: () => {
				const tree = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(270);

				return [
					tree.children.leftUpper!.value,
					tree.children.rightUpper!.value,
					tree.children.rightLower!.value,
					tree.children.leftLower!.value,
				];
			},
			expected: [2, 3, 4, 1],
		},
		{
			actual: () => {
				const tree = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(360);

				return [
					tree.children.leftUpper!.value,
					tree.children.rightUpper!.value,
					tree.children.rightLower!.value,
					tree.children.leftLower!.value,
				];
			},
			expected: [1, 2, 3, 4],
		},
		{
			actual: () => {
				const tree = QuadTree.base(0);

				return [
					tree.children.leftUpper?.value,
					tree.children.rightUpper?.value,
					tree.children.rightLower?.value,
					tree.children.leftLower?.value,
				];
			},
			expected: [undefined, undefined, undefined, undefined],
		},
		{
			actual: () => {
				const siblings = QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).children.leftUpper!.siblings;

				return siblings.map((x) => x.value);
			},
			expected: [2, 3, 4],
		},
		{
			actual: () =>
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).children.leftUpper!.siblings.map((x) => x.value),
			expected: [2, 3, 4],
		},
		{
			actual: () =>
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).children.leftUpper!.depth,
			expected: 2,
		},
		{
			actual: () =>
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).siblings,
			expected: [],
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

	await t.step({
		name: `case ${testCases.length + 1}`,
		fn: () => {
			assertThrows(() =>
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(361)
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
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(-1)
			);
		},
		sanitizeOps: false,
		sanitizeResources: false,
		sanitizeExit: false,
	});

	await t.step({
		name: `case ${testCases.length + 3}`,
		fn: () => {
			assertThrows(() =>
				QuadTree.create(
					QuadTree.base(1),
					QuadTree.base(2),
					QuadTree.base(3),
					QuadTree.base(4),
				).rotate(23)
			);
		},
		sanitizeOps: false,
		sanitizeResources: false,
		sanitizeExit: false,
	});
});
