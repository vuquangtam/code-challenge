/**
 * Problem 1: Three ways to sum to n
 * Input: n - any integer
 * Output: sum from 1 to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15
 */

// Mathematical formula - O(1) time, O(1) space
export var sum_to_n_a = function (n) {
    if (n === 0) return 0;
    if (n > 0) {
        return (n * (n + 1)) / 2;
    } else {
        return -(n * (n - 1)) / 2;
    }
};

// Iterative approach - O(n) time, O(1) space
export var sum_to_n_b = function (n) {
    if (n === 0) return 0;
    let sum = 0;
    if (n > 0) {
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
    } else {
        for (let i = n; i <= -1; i++) {
            sum += i;
        }
    }
    return sum;
};

// Recursive approach - O(n) time, O(n) space
// Downside: Stack overflow for large numbers
export var sum_to_n_c = function (n) {
    if (n === 0) return 0;
    if (n > 0) {
        return n + sum_to_n_c(n - 1);
    } else {
        return n + sum_to_n_c(n + 1);
    }
};
