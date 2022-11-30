import { sort } from './sorter.ts';
import { ITestCase, testEquals } from './test_helpers.ts';

Deno.test('sorter', async (t) => {
	class TestIterable implements Iterable<number> {
		*[Symbol.iterator]() {
			yield 3;
			yield 1;
			yield 2;
		}
	}

	const testCases: ITestCase<Iterable<number>>[] = [
		{
			actual: () => sort([4, 2, 3, 1]),
			expected: [1, 2, 3, 4],
		},
		{
			actual: () => sort([-1, -10, 0]),
			expected: [-10, -1, 0],
		},
		{
			actual: () => sort(new TestIterable()),
			expected: [1, 2, 3],
		},
	];

	await testEquals(t, testCases);
});
