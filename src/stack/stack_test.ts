import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { Stack } from './stack.ts';

Deno.test('Stack', async (t) => {
    const testCases = [
        {
            actual: Stack.empty(),
            expected: '[x]',
        },
        {
            actual: Stack.create(1, Stack.empty()),
            expected: '[1|/]',
        },
        {
            actual: Stack.push(1, Stack.empty()),
            expected: '[1|/]',
        },
        {
            actual: Stack.create(
                2,
                Stack.create(1, Stack.empty()),
            ),
            expected: '[2|*]->[1|/]',
        },
        {
            actual: Stack.push(
                2,
                Stack.push(1, Stack.empty()),
            ),
            expected: '[2|*]->[1|/]',
        },
        {
            actual: Stack.from([1, 2, 3, 4]),
            expected: '[4|*]->[3|*]->[2|*]->[1|/]',
        },
        {
            actual: Stack.from([1, 2, 3, 4]).replaceRest(Stack.from([5, 6, 7])),
            expected: '[4|*]->[7|*]->[6|*]->[5|/]'
        },
        {
            actual: Stack.from([1, 2, 3, 4]).last,
            expected: '1'
        },
        {
            actual: Stack.empty().last,
            expected: 'undefined'
        },
        {
            actual: Stack.empty().append(Stack.from([1, 2])),
            expected: '[2|*]->[1|/]'
        },
        {
            actual: Stack.from([1, 2, 3, 4]).pop(),
            expected: '[3|*]->[2|*]->[1|/]'
        }
    ];

    await Promise.all(testCases.map(async ({ actual, expected }, i) => {
        await t.step({
            name: `case ${i}`,
            fn: () => assertEquals(`${actual}`, expected),
            sanitizeOps: false,
            sanitizeResources: false,
            sanitizeExit: false,
        });
    }));
});
