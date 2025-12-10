import type { Detail } from '../types/api';
import { useApi } from './useApi';
import { useMemo } from 'react';

export function useCustomerPurchases(customerId: number | null) {
  const config = useMemo(
    () => ({
      url: customerId ? `/customers/${customerId}/purchases` : '',
      method: 'GET' as const,
    }),
    [customerId],
  );

  const options = useMemo(
    () => ({
      auto: !!customerId,
      initialData: [] as Detail[],
    }),
    [customerId],
  );

  return useApi<Detail[]>(config, options);
}
