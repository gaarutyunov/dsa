import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

export interface ITestCase<T> {
	actual: () => T;
	expected: T;
}

export async function testEquals<T>(
	t: Deno.TestContext,
	testCases: ITestCase<T>[],
): Promise<void> {
	await Promise.all(testCases.map(async ({ actual, expected }, i) => {
		await t.step({
			name: `case ${i}`,
			fn: () => assertEquals(actual(), expected),
			sanitizeOps: false,
			sanitizeResources: false,
			sanitizeExit: false,
		});
	}));
}
