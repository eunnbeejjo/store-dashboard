import type { Customer } from '../types/api';
import { useApi } from './useApi';
import { useMemo } from 'react';

export type CustomerSortBy = 'asc' | 'desc';

interface CustomersParams {
  sortBy?: CustomerSortBy;
  name?: string;
}

export function useCustomers(params?: CustomersParams) {
  const memoConfig = useMemo(
    () => ({
      url: '/customers',
      method: 'GET' as const,
      params,
    }),
    [params?.sortBy, params?.name],
  );

  return useApi<Customer[]>(memoConfig);
}
