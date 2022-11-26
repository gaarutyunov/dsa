import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { LinkedList } from './linked_list.ts';

Deno.test('LinkedList', async (t) => {
	const testCases = [
		{
			list: LinkedList.empty(),
			expected: '[x]',
		},
		{
			list: LinkedList.create(1, LinkedList.empty()),
			expected: '[1|/]',
		},
		{
			list: LinkedList.create(
				2,
				LinkedList.create(1, LinkedList.empty()),
			),
			expected: '[2|*]->[1|/]',
		},
		{
			list: LinkedList.from([1, 2, 3, 4]),
			expected: '[1|*]->[2|*]->[3|*]->[4|/]',
		},
	];

	await Promise.all(testCases.map(async ({ list, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(list.toString(), expected),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));

	await t.step({
		name: 'replaceRest',
		fn: () => {
			const list = LinkedList.from([1, 2, 3, 4]);
			list.replaceRest(LinkedList.from([5, 6, 7]));

			assertEquals(list.toString(), '[1|*]->[5|*]->[6|*]->[7|/]');
		},
	});

	await t.step({
		name: 'last',
		fn: () => {
			const list = LinkedList.from([1, 2, 3, 4]);
			assertEquals(list.last, 4);
		},
	});

	await t.step({
		name: 'empty last',
		fn: () => {
			const list = LinkedList.empty();
			assertEquals(list.last, undefined);
		},
	});
});
