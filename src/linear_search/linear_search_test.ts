import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { LinearSearch } from './linear_search.ts';

Deno.test('LinearSearch', async (t) => {
	const testCases = [
		{
			actual: () => new LinearSearch([1, 2, 3]).search(4),
			expected: -1,
		},
		{
			actual: () => new LinearSearch([1, 2, 3]).search(1),
			expected: 0,
		},
		{
			actual: () => new LinearSearch<number>([]).search(1),
			expected: -1,
		},
		{
			actual: () => new LinearSearch([3, 1, 1]).search(1),
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
