import {
  Button,
  Input,
  ResponsiveDialog,
  ScrollArea,
  Skeleton,
} from '@/components/ui';
import { scaleIn, slideInLeft } from '@/constants';
import { useKeyboardNavigation, useTokenPrice, useTokenSearch } from '@/hooks';
import { cn, formatNumber } from '@/libs';
import { ChevronDown, Coins, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TokenSelectorProps {
  value: string;
  onChange: (currency: string) => void;
  label: string;
  className?: string;
}

interface TokenIconProps {
  src?: string;
  alt: string;
  isLoading?: boolean;
  size?: number;
  className?: string;
}

const TokenIcon = (props: TokenIconProps) => {
  const { src, alt, isLoading = false, size = 32, className } = props;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <motion.div {...scaleIn}>
        <Skeleton
          className={cn('rounded-full', className)}
          style={{ width: size, height: size }}
        />
      </motion.div>
    );
  }

  if (!src || imageError) {
    return (
      <motion.div
        key='fallback-icon'
        {...scaleIn}
        className={cn(
          'bg-muted flex items-center justify-center rounded-full',
          className
        )}
        style={{ width: size, height: size }}
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <motion.img
            src={'/tokens/SWTH.svg'}
            alt='ETH'
            width={size}
            height={size}
            className={cn(
              'h-full w-full object-cover',
              imageLoading ? 'opacity-0' : 'opacity-100'
            )}
            loading='lazy'
            decoding='async'
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={src}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        rotate: { duration: 0.3 },
      }}
      className={cn('overflow-hidden rounded-full', className)}
      style={{ width: size, height: size }}
    >
      {imageLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Skeleton className='h-full w-full rounded-full' />
        </motion.div>
      )}
      <motion.img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(
          'h-full w-full object-cover',
          imageLoading ? 'opacity-0' : 'opacity-100'
        )}
        loading='lazy'
        decoding='async'
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageLoading(false);
          setImageError(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

interface TokenSelectorContentProps {
  value: string;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredTokens: any[];
  tokensLoading: boolean;
  popularTokens: [string, any][];
  otherTokens: [string, any][];
  allDisplayTokens: [string, any][];
  focusedIndex: number;
  getItemRef: (index: number) => (node: HTMLDivElement | null) => void;
  handleSelect: (currency: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const TokenSelectorContent = ({
  value,
  searchQuery,
  onSearchChange,
  filteredTokens,
  tokensLoading,
  popularTokens,
  otherTokens,
  focusedIndex,
  getItemRef,
  handleSelect,
}: TokenSelectorContentProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
        <Input
          placeholder={t('placeholders.searchTokens')}
          value={searchQuery}
          onChange={onSearchChange}
          className='pl-10'
        />
      </div>

      <ScrollArea className='h-[400px]'>
        <motion.div layout className='space-y-2 px-1'>
          {tokensLoading && (
            <motion.div layout>
              <div className='space-y-2'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='flex items-center gap-3 p-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <div className='flex-1 space-y-1'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                    <Skeleton className='h-4 w-12' />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {!tokensLoading && popularTokens.length > 0 && (
            <motion.div layout>
              <div className='text-muted-foreground mb-2 px-2 text-xs font-medium'>
                {t('labels.popular')}
              </div>
              <motion.div layout className='space-y-1'>
                {popularTokens.map(([symbol, info], index) => (
                  <motion.div key={`popular-${symbol}`} layout>
                    <TokenItem
                      ref={getItemRef(index)}
                      symbol={symbol}
                      info={info}
                      isSelected={value === symbol}
                      isFocused={focusedIndex === index}
                      onClick={() => handleSelect(symbol)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {!tokensLoading && otherTokens.length > 0 && (
            <motion.div layout>
              <div className='text-muted-foreground mb-2 px-2 text-xs font-medium'>
                {t('labels.allTokens')}
              </div>
              <motion.div layout className='space-y-1'>
                {otherTokens.map(([symbol, info], index) => (
                  <motion.div key={`other-${symbol}`} layout>
                    <TokenItem
                      ref={getItemRef(popularTokens.length + index)}
                      symbol={symbol}
                      info={info}
                      isSelected={value === symbol}
                      isFocused={focusedIndex === popularTokens.length + index}
                      onClick={() => handleSelect(symbol)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {filteredTokens.length === 0 && !tokensLoading && (
            <motion.div layout>
              <div className='text-muted-foreground py-8 text-center'>
                <Coins className='mx-auto mb-2 h-8 w-8 opacity-50' />
                <div className='text-sm'>{t('buttons.noTokensFound')}</div>
                <div className='text-xs'>{t('buttons.tryAdjusting')}</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

const TokenSelectorTrigger = (props: {
  selectedToken: any;
  tokensLoading: boolean;
  isOpen: boolean;
  className?: string;
  onClick: () => void;
}) => {
  const { selectedToken, tokensLoading, isOpen, className, onClick } = props;
  const { t } = useTranslation('common');

  return (
    <Button
      variant='outline'
      onClick={onClick}
      className={cn('h-14 w-full justify-between px-4', className)}
    >
      <motion.div className='flex items-center gap-3' layout>
        <TokenIcon
          src={selectedToken?.icon}
          alt={
            selectedToken?.name
              ? t('accessibility.tokenLogo', { name: selectedToken.name })
              : t('accessibility.defaultTokenLogo')
          }
          isLoading={tokensLoading}
          size={32}
        />
        <motion.div
          className='text-left'
          key={selectedToken?.symbol || 'empty'}
          {...slideInLeft}
        >
          <motion.div className='text-foreground font-semibold'>
            {selectedToken?.symbol || t('buttons.select')}
          </motion.div>
          <motion.div className='text-muted-foreground text-xs'>
            {selectedToken?.name || t('buttons.choose')}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <ChevronDown className='text-muted-foreground h-4 w-4' />
      </motion.div>
    </Button>
  );
};

const TokenSelector = (props: TokenSelectorProps) => {
  const { value, onChange, label, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { tokens: filteredTokens, isLoading: tokensLoading } =
    useTokenSearch(searchQuery);

  const { popularTokens, otherTokens, allDisplayTokens } = useMemo(() => {
    const popular = filteredTokens
      .filter((token) => token.category === 'popular')
      .map((token) => [token.symbol, token] as [string, any]);

    const other = filteredTokens
      .filter((token) => token.category !== 'popular')
      .map((token) => [token.symbol, token] as [string, any]);

    const all = [...popular, ...other];
    return {
      popularTokens: popular,
      otherTokens: other,
      allDisplayTokens: all,
    };
  }, [filteredTokens]);

  const selectedToken = useMemo(() => {
    return filteredTokens.find((token) => token.symbol === value) || null;
  }, [filteredTokens, value]);

  const handleSelect = useCallback(
    (currency: string) => {
      onChange(currency);
      setIsOpen(false);
      setSearchQuery('');
    },
    [onChange]
  );

  const handleSelectToken = useCallback(
    ([symbol]: [string, any]) => {
      handleSelect(symbol);
    },
    [handleSelect]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { focusedIndex, handleKeyDown, getItemRef, resetFocus } =
    useKeyboardNavigation({
      items: allDisplayTokens,
      isOpen,
      onSelect: handleSelectToken,
      onClose: handleClose,
    });

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      resetFocus();
    },
    [resetFocus]
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery('');
    }
  }, []);

  return (
    <>
      <TokenSelectorTrigger
        selectedToken={selectedToken}
        tokensLoading={tokensLoading}
        isOpen={isOpen}
        className={className}
        onClick={() => setIsOpen(true)}
      />
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={label}
        onKeyDown={handleKeyDown}
      >
        <TokenSelectorContent
          value={value}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filteredTokens={filteredTokens}
          tokensLoading={tokensLoading}
          popularTokens={popularTokens}
          otherTokens={otherTokens}
          allDisplayTokens={allDisplayTokens}
          focusedIndex={focusedIndex}
          getItemRef={getItemRef}
          handleSelect={handleSelect}
        />
      </ResponsiveDialog>
    </>
  );
};

interface TokenItemProps {
  symbol: string;
  info: any;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
}

const TokenItem = forwardRef<HTMLDivElement, TokenItemProps>(
  ({ symbol, info, isSelected, isFocused, onClick }, ref) => {
    const { t } = useTranslation('common');
    const { price, isLoading } = useTokenPrice(symbol);

    const formattedPrice = useMemo(() => {
      if (!price) return null;
      return formatNumber(price, {
        maximumFractionDigits: price < 1 ? 4 : 2,
        useCompactForLarge: false,
      });
    }, [price]);

    return (
      <motion.div layout ref={ref}>
        <Button
          variant='ghost'
          className={cn(
            'group h-14 w-full justify-between px-3 transition-all duration-200',
            'hover:bg-muted/50 hover:shadow-sm',
            'active:bg-muted/70',
            'focus-visible:ring-primary/50 focus-visible:ring-2',
            isFocused && 'bg-accent ring-primary/30 ring-2',
            isSelected &&
              'bg-primary/10 border-primary/20 hover:bg-primary/15 border',
            isSelected && isFocused && 'bg-primary/20 ring-primary/50'
          )}
          onClick={onClick}
        >
          <div className='flex items-center gap-3'>
            <TokenIcon
              src={info.icon}
              alt={t('accessibility.tokenLogo', { name: info.name })}
              size={32}
              className='transition-transform duration-200 group-hover:scale-110'
            />
            <div className='text-left'>
              <div className='font-medium'>{symbol}</div>
              <div className='text-muted-foreground text-xs'>{info.name}</div>
            </div>
          </div>
          <div className='text-right'>
            {isLoading ? (
              <div className='bg-muted h-4 w-12 animate-pulse rounded' />
            ) : formattedPrice ? (
              <div className='text-sm font-medium'>${formattedPrice}</div>
            ) : (
              <div className='text-muted-foreground text-xs'>
                {t('messages.noPrice')}
              </div>
            )}
          </div>
        </Button>
      </motion.div>
    );
  }
);

TokenItem.displayName = 'TokenItem';

export { TokenSelector };
