import { useCallback, useEffect, useRef, useState } from 'react';

interface UseKeyboardNavigationOptions<T> {
  items: T[];
  isOpen: boolean;
  onSelect: (item: T) => void;
  onClose: () => void;
}

const useKeyboardNavigation = <T>(options: UseKeyboardNavigationOptions<T>) => {
  const { items, isOpen, onSelect, onClose } = options;

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Reset focus when items change or dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [items.length]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < itemRefs.current.length) {
      const focusedElement = itemRefs.current[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || items.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= items.length ? 0 : next; // Loop to start
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? items.length - 1 : next; // Loop to end
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < items.length) {
            onSelect(items[focusedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, items, focusedIndex, onSelect, onClose]
  );

  const getItemRef = useCallback((index: number) => {
    return (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    };
  }, []);

  const resetFocus = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  return {
    focusedIndex,
    handleKeyDown,
    getItemRef,
    resetFocus,
  };
};

export { useKeyboardNavigation };
