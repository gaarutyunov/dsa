import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { Queue } from './queue.ts';

Deno.test('Queue', async (t) => {
	const testCases = [
		{
			actual: () => Queue.empty(),
			expected: '[x]',
		},
		{
			actual: () => Queue.push(1),
			expected: '[1(S+E)|/]',
		},
		{
			actual: () => Queue.push(1).pop(),
			expected: '[1(S+E)|/]',
		},
		{
			actual: () => Queue.push(2, Queue.push(1)),
			expected: '[1(S)|*]->[2(E)|/]',
		},
		{
			actual: () => Queue.push(2, Queue.push(1)),
			expected: '[1(S)|*]->[2(E)|/]',
		},
		{
			actual: () => Queue.from([1, 2, 3]),
			expected: '[1(S)|*]->[2|*]->[3(E)|/]',
		},
		{
			actual: () => Queue.from([1, 2, 3]).pop(),
			expected: '[2(S)|*]->[3(E)|/]',
		},
		{
			actual: () => Queue.from([1, 2]).append(Queue.from([3, 4])),
			expected: '[1(S)|*]->[2|*]->[3|*]->[4(E)|/]',
		},
		{
			actual: () =>
				Queue.empty<number, Queue<number>>().append(Queue.from([1, 2])),
			expected: '[1(S)|*]->[2(E)|/]',
		},
		{
			actual: () => Queue.from([1, 2]).top,
			expected: '1',
		},
		{
			actual: () => Queue.from([1, 2]).last,
			expected: '2',
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
