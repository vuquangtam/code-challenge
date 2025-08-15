import { cn, formatNumber } from '@/libs';
import { type SwapQuote } from '@/types';
import { Info, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface PriceDisplayProps {
  quote: SwapQuote | null;
  isLoading: boolean;
  className?: string;
}

const PriceDisplay = (props: PriceDisplayProps) => {
  const { quote, isLoading, className } = props;
  const { t } = useTranslation('price');
  const isPositiveImpact = quote?.impact < 1;

  const formattedRate = useMemo(
    () => formatNumber(quote?.rate, { maximumFractionDigits: 6 }),
    [quote?.rate]
  );

  const formattedToAmount = useMemo(
    () => formatNumber(quote?.toAmount, { maximumFractionDigits: 2 }),
    [quote?.toAmount]
  );

  const formattedFromAmount = useMemo(
    () => formatNumber(quote?.fromAmount, { maximumFractionDigits: 2 }),
    [quote?.fromAmount]
  );

  const formattedImpact = useMemo(
    () => formatNumber(quote?.impact, { maximumFractionDigits: 2 }),
    [quote?.impact]
  );

  if (isLoading) {
    return (
      <div className={cn('bg-muted/20 space-y-2 rounded-lg p-4', className)}>
        <div className='bg-muted h-4 animate-pulse rounded' />
        <div className='bg-muted h-3 w-2/3 animate-pulse rounded' />
      </div>
    );
  }

  if (!quote) {
    return (
      <div
        className={cn(
          'text-muted-foreground bg-muted/20 rounded-lg p-4 text-center',
          className
        )}
      >
        <Info className='mx-auto mb-2 h-5 w-5' />
        <p className='text-sm'>{t('noQuote')}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-muted/20 space-y-3 rounded-lg p-4', className)}
      layout
    >
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-sm'>Rate</span>
        <span className='font-medium'>
          {t('rate', {
            from: quote.fromCurrency,
            rate: formattedRate,
            to: quote.toCurrency,
          })}
        </span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-sm'>{t('youReceive')}</span>
        <div className='text-right'>
          <div className='text-lg font-semibold'>
            {formattedToAmount} {quote.toCurrency}
          </div>
          <div className='text-muted-foreground text-xs'>
            ≈ ${formattedFromAmount}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-sm'>
          {t('priceImpact')}
        </span>
        <div
          className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositiveImpact ? 'text-success' : 'text-warning'
          )}
        >
          {isPositiveImpact ? (
            <TrendingUp className='h-3 w-3' />
          ) : (
            <TrendingDown className='h-3 w-3' />
          )}
          {formattedImpact}%
        </div>
      </div>

      {quote.impact > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-warning/10 border-warning/20 rounded-lg border p-3'
        >
          <div className='text-warning flex items-center gap-2'>
            <Info className='h-4 w-4' />
            <span className='text-sm font-medium'>{t('highImpactTitle')}</span>
          </div>
          <p className='text-warning/80 mt-1 text-xs'>
            {t('highImpactMessage')}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export { PriceDisplay };
