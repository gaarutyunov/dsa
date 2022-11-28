import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { BinarySearch } from './binary_search.ts';

Deno.test('BinarySearch', async (t) => {
	const testCases = [
		{
			actual: () => new BinarySearch([1, 2, 3]).search(4),
			expected: -1,
		},
		{
			actual: () => new BinarySearch([1, 2, 3]).search(1),
			expected: 0,
		},
		{
			actual: () => new BinarySearch<number>([]).search(1),
			expected: -1,
		},
		{
			actual: () => new BinarySearch([1, 1, 3]).search(1),
			expected: 0,
		},
		{
			actual: () => new BinarySearch([-2, -1, 1, 1, 2, 3]).search(-1),
			expected: 1,
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
