import type { Purchase } from '../types/api';
import { useApi } from './useApi';
import { useMemo } from 'react';

interface PurchaseFrequencyParams {
  from?: string; // ISO
  to?: string; // ISO
}

export function usePurchaseFrequency(params?: PurchaseFrequencyParams) {
  const memoConfig = useMemo(
    () => ({
      url: '/purchase-frequency',
      method: 'GET' as const,
      params,
    }),
    [params?.from, params?.to],
  );

  return useApi<Purchase[]>(memoConfig);
}
