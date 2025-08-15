import React, { useMemo } from "react";

// Types and Interfaces
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// Constants
const DEFAULT_PRIORITY = -99;
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Moved outside component to avoid recreation on every render
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
};

// Mock useWalletBalances
const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: "BTC", amount: 1.5, blockchain: "Ethereum" },
    { currency: "ETH", amount: 10.0, blockchain: "Ethereum" },
    { currency: "SOL", amount: 100.0, blockchain: "Arbitrum" },
    { currency: "ADA", amount: 0.0, blockchain: "Neo" },
  ];
};

// Mock usePrices
const usePrices = (): Record<string, number> => {
  return {
    BTC: 45000,
    ETH: 3000,
    SOL: 100,
    ADA: 0.5,
  };
};

// Mock WalletRow
const WalletRow: React.FC<{
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}> = ({ amount, usdValue, formattedAmount, className }) => {
  return (
    <div className={className}>
      <span>Amount: {amount}</span>
      <span>Formatted: {formattedAmount}</span>
      <span>USD Value: ${usdValue.toFixed(2)}</span>
    </div>
  );
};

// Main Component
const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Single memoized computation combining filtering, sorting, and formatting
  const processedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        // Fixed: Show positive balances with valid priority
        return priority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // Fixed: Complete sort logic
        return rightPriority - leftPriority;
      })
      .map(
        (balance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(2),
          usdValue: (prices[balance.currency] ?? 0) * balance.amount,
        })
      );
  }, [balances, prices]);

  // Memoized rows with stable keys
  const walletRows = useMemo(() => {
    return processedBalances.map((balance) => (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`} // Fixed: Stable, unique key
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
        className="wallet-row"
      />
    ));
  }, [processedBalances]);

  return <div {...rest}>{walletRows}</div>;
};

export default WalletPage;
