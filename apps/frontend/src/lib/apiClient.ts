import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api', // 예: http://localhost:3000
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.error ??
      error.message ??
      '네트워크 오류가 발생했습니다.';
    return Promise.reject({ status, message });
  },
);
