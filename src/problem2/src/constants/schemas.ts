import { z } from 'zod';

export const createSwapSchema = (t: (key: string) => string) =>
  z.object({
    amount: z
      .string()
      .min(1, t('validation:errors.required'))
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        t('validation:errors.positive')
      ),
  });

export type SwapSchema = ReturnType<typeof createSwapSchema>;
export type SwapFormData = z.infer<SwapSchema>;
