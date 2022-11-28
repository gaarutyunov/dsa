import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { LinkedList } from './linked_list.ts';

Deno.test('LinkedList', async (t) => {
	const testCases = [
		{
			actual: () => LinkedList.empty(),
			expected: '[x]',
		},
		{
			actual: () => LinkedList.create(1),
			expected: '[1|/]',
		},
		{
			actual: () =>
				LinkedList.create(
					2,
					LinkedList.create(1),
				),
			expected: '[2|*]->[1|/]',
		},
		{
			actual: () => LinkedList.from([1, 2, 3, 4]),
			expected: '[1|*]->[2|*]->[3|*]->[4|/]',
		},
		{
			actual: () => LinkedList.from([1, 2, 3, 4]).last as number,
			expected: '4',
		},
		{
			actual: () => LinkedList.empty<number, LinkedList<number>>().last,
			expected: 'undefined',
		},
		{
			actual: () =>
				LinkedList.from([1, 2, 3, 4]).replaceRest(
					LinkedList.from([5, 6, 7]),
				),
			expected: '[1|*]->[5|*]->[6|*]->[7|/]',
		},
		{
			actual: () =>
				LinkedList.from([1, 2]).append(LinkedList.from([3, 4])),
			expected: '[1|*]->[2|*]->[3|*]->[4|/]',
		},
	];

	await Promise.all(testCases.map(async ({ actual, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(`${actual()}`, expected),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));
});
