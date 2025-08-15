import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui';
import { useIsMobile } from '@/hooks';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const ResponsiveDialog = ({
  open,
  onOpenChange,
  title,
  children,
  onKeyDown,
}: ResponsiveDialogProps) => {
  const { t } = useTranslation('common');
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className='px-4'>{children}</div>
          <div className='flex justify-end p-4'>
            <DrawerClose asChild>
              <Button variant='outline' size='sm'>
                <X className='mr-2 h-4 w-4' />
                {t('buttons.close', { defaultValue: 'Close' })}
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onKeyDown={onKeyDown}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { ResponsiveDialog };
