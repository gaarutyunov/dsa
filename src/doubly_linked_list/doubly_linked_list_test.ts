import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { DoublyLinkedList } from './doubly_linked_list.ts';

Deno.test('DoublyLinkedList', async (t) => {
	const testCases = [
		{
			actual: () => DoublyLinkedList.empty(),
			expected: '[x]',
		},
		{
			actual: () =>
				DoublyLinkedList.createLeft(
					3,
					DoublyLinkedList.createLeft(
						1,
						DoublyLinkedList.createLeft(4),
					),
				),
			expected: '[/|3|*]<->[*|1|*]<->[*|4|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.createRight(
					3,
					DoublyLinkedList.createRight(
						1,
						DoublyLinkedList.createRight(4),
					),
				),
			expected: '[/|4|*]<->[*|1|*]<->[*|3|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.createLeft(
					3,
					DoublyLinkedList.createLeft(
						1,
						DoublyLinkedList.createLeft(
							4,
							DoublyLinkedList.createLeft(
								2,
								DoublyLinkedList.createLeft(5),
							),
						),
					),
				),
			expected: '[/|3|*]<->[*|1|*]<->[*|4|*]<->[*|2|*]<->[*|5|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.createLeft(
					3,
					DoublyLinkedList.createLeft(
						1,
						DoublyLinkedList.createRight(
							5,
							DoublyLinkedList.createRight(
								2,
								DoublyLinkedList.createRight(4),
							),
						),
					),
				),
			expected: '[/|3|*]<->[*|1|*]<->[*|4|*]<->[*|2|*]<->[*|5|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.createRight(
					3,
					DoublyLinkedList.createRight(
						1,
						DoublyLinkedList.createLeft(
							5,
							DoublyLinkedList.createLeft(
								2,
								DoublyLinkedList.createLeft(4),
							),
						),
					),
				),
			expected: '[/|5|*]<->[*|2|*]<->[*|4|*]<->[*|1|*]<->[*|3|/]',
		},
		{
			actual: () => DoublyLinkedList.from([3, 1, 4]),
			expected: '[/|3|*]<->[*|1|*]<->[*|4|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.from([1, 2, 3]).append(
					DoublyLinkedList.from([4, 5, 6]),
				),
			expected:
				'[/|1|*]<->[*|2|*]<->[*|3|*]<->[*|4|*]<->[*|5|*]<->[*|6|/]',
		},
		{
			actual: () =>
				DoublyLinkedList.createLeft(
					1,
					DoublyLinkedList.createLeft(
						2,
						DoublyLinkedList.createLeft(3),
					),
				).append(
					DoublyLinkedList.from([4, 5, 6]),
				),
			expected:
				'[/|1|*]<->[*|2|*]<->[*|3|*]<->[*|4|*]<->[*|5|*]<->[*|6|/]',
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
