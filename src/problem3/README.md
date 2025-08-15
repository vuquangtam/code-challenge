# Problem 3: WalletPage Component Refactoring

## Issues Found

### TypeScript Issues
- Missing `blockchain` property in `WalletBalance` interface
- `any` type in `getPriority` function
- Undefined variable `lhsPriority` referenced

### Logic Errors
- Inverted filter: `balance.amount <= 0` should be `balance.amount > 0`
- Incomplete sort function missing return statement
- `formattedBalances` created but never used

### Performance Issues
- `getPriority` function recreated on every render
- Missing memoization for row rendering
- Incorrect `useMemo` dependencies

### React Issues
- Using array index as React key

## Files
- `original-code.tsx` - Original problematic code
- `refactored-solution.tsx` - Fixed solution
