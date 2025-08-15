import { describe, it, expect } from 'vitest'
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './sum_to_n.js'

const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 5, expected: 15 },
    { input: 10, expected: 55 },
    { input: 100, expected: 5050 },
    { input: 1000, expected: 500500 },
    { input: 10000, expected: 50005000 },
    { input: 100000, expected: 5000050000 },
    { input: -1, expected: -1 },
    { input: -3, expected: -6 },
    { input: -5, expected: -15 },
    { input: -10, expected: -55 },
    { input: -100, expected: -5050 },
    { input: -1000, expected: -500500 },
    { input: -10000, expected: -50005000 }
];

const recursiveTestCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 5, expected: 15 },
    { input: 10, expected: 55 },
    { input: 50, expected: 1275 },
    { input: -1, expected: -1 },
    { input: -3, expected: -6 },
    { input: -5, expected: -15 },
    { input: -10, expected: -55 },
    { input: -50, expected: -1275 }
];

describe('Problem 1: Three Ways to Sum to N', () => {
    describe('sum_to_n_a (Mathematical)', () => {
        testCases.forEach(({ input, expected }) => {
            it(`sum_to_n_a(${input}) = ${expected}`, () => {
                expect(sum_to_n_a(input)).toBe(expected);
            });
        });
    });

    describe('sum_to_n_b (Iterative)', () => {
        testCases.forEach(({ input, expected }) => {
            it(`sum_to_n_b(${input}) = ${expected}`, () => {
                expect(sum_to_n_b(input)).toBe(expected);
            });
        });
    });

    describe('sum_to_n_c (Recursive)', () => {
        recursiveTestCases.forEach(({ input, expected }) => {
            it(`sum_to_n_c(${input}) = ${expected}`, () => {
                expect(sum_to_n_c(input)).toBe(expected);
            });
        });
    });

    describe('Consistency', () => {
        it('all implementations return same results', () => {
            recursiveTestCases.forEach(({ input }) => {
                const a = sum_to_n_a(input);
                const b = sum_to_n_b(input);
                const c = sum_to_n_c(input);
                expect(a).toBe(b);
                expect(b).toBe(c);
            });
        });
    });
});
