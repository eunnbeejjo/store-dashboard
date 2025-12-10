import { apiClient } from '../lib/apiClient';
import type { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseApiOptions<T> {
  auto?: boolean;
  initialData?: T;
}

export function useApi<T = unknown>(
  config: AxiosRequestConfig,
  options: UseApiOptions<T> = {},
) {
  const { auto = true, initialData } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<null | {
    status?: number;
    message: string;
  }>(null);

  const execute = useCallback(
    async (overrideConfig?: AxiosRequestConfig) => {
      setStatus('loading');
      setError(null);
      try {
        const res = await apiClient.request<T>({
          ...config,
          ...overrideConfig,
        });
        setData(res.data);
        setStatus('success');
        return res.data;
      } catch (err: any) {
        setError(err);
        setStatus('error');
        throw err;
      }
    },
    [config],
  );

  useEffect(() => {
    if (auto) void execute();
  }, [auto, execute]);

  return {
    data,
    error,
    status,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    refetch: execute,
  };
}
