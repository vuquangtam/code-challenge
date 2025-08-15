import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const formatNumber = (
  amount: number,
  options: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: 'standard' | 'compact';
    compactDisplay?: 'short' | 'long';
    useCompactForLarge?: boolean;
  } = {}
): string => {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = amount >= 1 ? 4 : 8,
    notation = options.useCompactForLarge !== false && amount >= 1e6
      ? 'compact'
      : 'standard',
    compactDisplay = 'short',
  } = options;

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
    compactDisplay,
  });

  return formatter.format(amount);
};

const formatCurrency = (
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    useCompactForLarge?: boolean;
  } = {}
): string => {
  const { locale = 'en-US', currency, useCompactForLarge = true } = options;

  if (currency) {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: amount >= 1 ? 2 : 6,
      maximumFractionDigits: amount >= 1 ? 4 : 8,
      notation: useCompactForLarge && amount >= 1e6 ? 'compact' : 'standard',
      compactDisplay: 'short',
    });
    return formatter.format(amount);
  }

  return formatNumber(amount, { useCompactForLarge, locale });
};

export { cn, formatCurrency, formatNumber };
