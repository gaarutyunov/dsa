import { compare, isBigger, isEqual, isSmaller } from './comparer.ts';
import { ITestCase, testEquals } from './test_helpers.ts';

Deno.test('comparer', async (t) => {
	const testCases: ITestCase<boolean | number>[] = [
		{
			actual: () => isSmaller(1, 0),
			expected: false,
		},
		{
			actual: () => isSmaller(0, 1),
			expected: true,
		},
		{
			actual: () => isBigger(1, -1.5),
			expected: true,
		},
		{
			actual: () => isBigger(0, 0),
			expected: false,
		},
		{
			actual: () => isEqual(0, 0),
			expected: true,
		},
		{
			actual: () => isEqual(2, 1),
			expected: false,
		},
		{
			actual: () => compare(0, 0),
			expected: 0,
		},
		{
			actual: () => compare(-1, 0),
			expected: -1,
		},
		{
			actual: () => compare(2, 0),
			expected: 1,
		},
	];

	await testEquals(t, testCases);
});
