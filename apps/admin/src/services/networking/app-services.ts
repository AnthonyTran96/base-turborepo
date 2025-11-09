import { ENVConfig } from '@/config/env';
import { ROUTES } from '@/config/routes';
import { ApiResponse } from '@/types/common';
import content from '@/utils/content';
import { localStore } from '@repo/utils/local-storage';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

// ==============================|| AXIOS - FOR APP SERVICES ||============================== //

function getAppServices() {
  const appServices = axios.create({ baseURL: ENVConfig.API_URL, withCredentials: true });

  appServices.interceptors.request.use(
    (config) => {
      const token = localStore.get<string>('token', '');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error: Error) => {
      return Promise.reject(error);
    }
  );

  appServices.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<{ message?: string }>) => {
      if (!error.response) {
        return Promise.reject(error);
      }
      if (
        [401, 403].includes(error.response.status) &&
        !window.location.href.includes(ROUTES.LOGIN) &&
        !window.location.href.includes(ROUTES.CHANGE_PASSWORD)
      ) {
        window.location.pathname = ROUTES.LOGIN;
      }
      return Promise.reject({
        ...error.response,
        ...error.response.data,
        message: error.response.data?.message || content.common.networkingError
      });
    }
  );

  return appServices;
}

export async function request<T>(
  method: Lowercase<Method>,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): ApiResponse<T> {
  const appServices = getAppServices();

  switch (method) {
    case 'post':
      return appServices.post(url, data, config);
    case 'put':
      return appServices.put(url, data, config);
    case 'delete':
      return appServices.delete(url, config);
    default:
      return appServices.get(url, { params: data, ...config });
  }
}
