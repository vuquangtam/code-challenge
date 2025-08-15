import { Button, Card, Input } from '@/components/ui';
import {
  createSwapSchema,
  hoverScale,
  spinAnimation,
  type SwapFormData as SchemaFormData,
} from '@/constants';
import { useCurrencySwap } from '@/hooks';
import { cn, formatNumber, notification } from '@/libs';
import { SwapService } from '@/services/api';
import { useSwapStore } from '@/store';
import { type SwapQuoteRequest } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PriceDisplay } from './PriceDisplay';
import { TokenSelector } from './TokenSelector';

interface CurrencySwapFormProps {
  className?: string;
}

const TRANSACTION_HASH_DISPLAY_LENGTH = 10;

const CurrencySwapForm = (props: CurrencySwapFormProps) => {
  const { className } = props;
  const { t } = useTranslation(['common', 'validation']);

  const {
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
  } = useSwapStore();

  const swapSchema = useMemo(() => createSwapSchema(t), [t]);

  const form = useForm<SchemaFormData>({
    resolver: zodResolver(swapSchema),
    defaultValues: {
      amount: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const amount = watch('amount');
  const { quote, isLoading } = useCurrencySwap(
    fromCurrency,
    toCurrency,
    amount
  );

  const isSameCurrency = fromCurrency === toCurrency;
  const hasAmount = Boolean(amount);
  const hasValidAmount = hasAmount && !errors.amount;
  const isSwapDisabled = !hasValidAmount || isSameCurrency;
  const isSubmitDisabled = isSwapDisabled || !isValid || isSubmitting;
  const isSwapButtonDisabled = isSameCurrency;
  const formattedToAmount = useMemo(() => {
    if (!quote?.toAmount) return '0.00';
    return formatNumber(quote.toAmount);
  }, [quote?.toAmount]);

  const handleCurrencySwap = useCallback(() => {
    if (isSameCurrency) return;
    swapCurrencies();
  }, [swapCurrencies, isSameCurrency]);

  const handleFormSubmit = useCallback(
    async (data: SchemaFormData) => {
      try {
        const swapRequest: SwapQuoteRequest = {
          fromCurrency,
          toCurrency,
          amount: parseFloat(data.amount),
        };

        const result = await SwapService.swap(swapRequest);

        if (result.success) {
          const transactionDisplay = result.transactionHash?.slice(
            0,
            TRANSACTION_HASH_DISPLAY_LENGTH
          );
          notification.showSuccess(
            t('messages.swapSuccess', { hash: transactionDisplay })
          );

          reset();
        } else {
          notification.showError(result.error || t('messages.swapFailed'));
        }
      } catch (error) {
        notification.showError(t('messages.swapError'));
      }
    },
    [fromCurrency, toCurrency, reset]
  );

  return (
    <Card className={cn('card-glow card-interactive p-6', className)}>
      <div className='mb-6 flex items-center justify-between text-xl font-bold'>
        {t('home:form.title')}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-5'>
        <div className='space-y-1.5'>
          <label className='text-muted-foreground block text-sm font-medium'>
            {t('labels.from')}
          </label>
          <div className='grid grid-cols-2 gap-3'>
            <TokenSelector
              value={fromCurrency}
              onChange={setFromCurrency}
              label={t('labels.selectTokenFrom')}
            />
            <Input
              {...register('amount')}
              type='number'
              placeholder={t('placeholders.amount')}
              className={cn(
                'h-14 text-lg font-semibold',
                errors.amount && 'ring-destructive!'
              )}
              step='any'
              min='0'
            />
            {errors.amount && (
              <p className='text-destructive mt-1 text-xs'>
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className='flex justify-center'>
            <motion.button
              type='button'
              onClick={handleCurrencySwap}
              disabled={isSwapButtonDisabled}
              className='border-input bg-background hover:bg-accent hover:text-accent-foreground mt-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
              whileHover={{ scale: 1.02, rotate: 180 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowUpDown className='size-5' />
            </motion.button>
          </div>

          <label className='text-muted-foreground block text-sm font-medium'>
            {t('labels.to')}
          </label>
          <div className='grid grid-cols-2 gap-3'>
            <TokenSelector
              value={toCurrency}
              onChange={setToCurrency}
              label={t('labels.selectTokenTo')}
            />
            <div className='relative'>
              <Input
                placeholder={t('placeholders.amount')}
                value={formattedToAmount}
                className='h-14 text-lg font-semibold'
                disabled
              />
            </div>
          </div>
        </div>

        <PriceDisplay quote={quote} isLoading={isLoading} />

        {isSameCurrency && (
          <div className='text-destructive text-center text-sm font-medium'>
            {t('messages.sameToken')}
          </div>
        )}

        <Button
          type='submit'
          disabled={isSubmitDisabled}
          className='w-full'
          size='lg'
        >
          {isSubmitting ? (
            <motion.div
              className='flex items-center gap-3'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div {...spinAnimation}>
                <Loader2 className='h-5 w-5' />
              </motion.div>
              <span>{t('buttons.processing')}</span>
            </motion.div>
          ) : (
            <motion.div className='flex items-center gap-2' {...hoverScale}>
              {t('buttons.exchange')}
            </motion.div>
          )}
        </Button>
      </form>
    </Card>
  );
};

export { CurrencySwapForm };
