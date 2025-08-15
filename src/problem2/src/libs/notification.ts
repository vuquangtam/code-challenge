import { toast } from 'sonner';

const notification = {
  show: (message: string) => {
    toast(message);
  },
  showSuccess: (message: string) => {
    toast.success(message);
  },
  showError: (message: string) => {
    toast.error(message);
  },
  showWarning: (message: string) => {
    toast.warning(message);
  },
  showInfo: (message: string) => {
    toast.info(message);
  },
  close: (id: string) => {
    toast.dismiss(id);
  },
};

export { notification };
