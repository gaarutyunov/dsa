import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { minimum } from './minimum.ts';

Deno.test('minimum', async (t) => {
	const testCases = [
		{
			array: [0, 1, 2, 3, 4],
			expected: 0,
		},
		{
			array: [-1, -2, -3, -4],
			expected: -4,
		},
		{
			array: [0, -1, 9, -5.3, -0.4, -5.4],
			expected: -5.4,
		},
	];

	await Promise.all(testCases.map(async ({ array, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(minimum(array), expected),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));
});
