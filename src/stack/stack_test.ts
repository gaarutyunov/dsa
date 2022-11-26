import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';

import { Stack } from './stack.ts';

Deno.test('Stack', async (t) => {
    const testCases = [
        {
            stack: Stack.empty(),
            expected: '[x]',
        },
        {
            stack: Stack.create(1, Stack.empty()),
            expected: '[1|/]',
        },
        {
            stack: Stack.push(1, Stack.empty()),
            expected: '[1|/]',
        },
        {
            stack: Stack.create(
                2,
                Stack.create(1, Stack.empty()),
            ),
            expected: '[2|*]->[1|/]',
        },
        {
            stack: Stack.push(
                2,
                Stack.push(1, Stack.empty()),
            ),
            expected: '[2|*]->[1|/]',
        },
        {
            stack: Stack.from([1, 2, 3, 4]),
            expected: '[4|*]->[3|*]->[2|*]->[1|/]',
        },
    ];

    await Promise.all(testCases.map(async ({ stack, expected }, i) => {
        await t.step({
            name: `case ${i}`,
            fn: () => assertEquals(stack.toString(), expected),
            sanitizeOps: false,
            sanitizeResources: false,
            sanitizeExit: false,
        });
    }));

    await t.step({
        name: 'replaceRest',
        fn: () => {
            const stack = Stack.from([1, 2, 3, 4]);
            stack.replaceRest(Stack.from([5, 6, 7]));

            assertEquals(stack.toString(), '[4|*]->[7|*]->[6|*]->[5|/]');
        },
    });

    await t.step('last', () => {
            const stack = Stack.from([1, 2, 3, 4]);
            assertEquals(stack.last, 1);
        });

    await t.step(
        'empty last', () => {
            const stack = Stack.empty();
            assertEquals(stack.last, undefined);
        }
    );

    await t.step('empty append', () => {
        const stack = Stack.from([1, 2]);

       assertEquals(Stack.empty().append(stack), stack)
    });

    await t.step('pop', () => {
        const stack = Stack.from([1, 2, 3, 4]);
        assertEquals(stack.pop!.toString(), '[3|*]->[2|*]->[1|/]');
    });
});
