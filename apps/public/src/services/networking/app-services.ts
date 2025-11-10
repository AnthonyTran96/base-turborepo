import { ENVConfig } from '@/config/env';
import { ROUTES } from '@/config/routes';
import { ApiResponse } from '@/types/common';
import content from '@/utils/content';
import { getServerSession } from '@/utils/session';
import { DebugUtils } from '@repo/utils/debug-utils';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { redirect } from 'next/navigation';
import { whiteListApis } from './config';

// ==============================|| AXIOS - FOR APP SERVICES ||============================== //

function getAppServices() {
  const appServices = axios.create({ baseURL: ENVConfig.API_URL, withCredentials: true });

  appServices.interceptors.request.use(
    async (config) => {
      const session = await getServerSession();
      const accessToken = session?.accessToken;
      config.headers = config.headers || {};
      config.headers['Cookie'] = `accessToken=${accessToken}`;
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Request: ${(ENVConfig.API_URL || '') + config.url}`);
      if (config.data) {
        DebugUtils.debug(`Data:`);
        DebugUtils.dir(config.data);
      }
      if (config.params) {
        DebugUtils.debug(`Params:`);
        DebugUtils.dir(config.params);
      }
      DebugUtils.debug('=======================================>');
      return config;
    },
    (error: Error) => {
      return Promise.reject(error);
    }
  );

  appServices.interceptors.response.use(
    (response) => {
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Response: ${(ENVConfig.API_URL || '') + response.config.url}`);
      DebugUtils.debug('Data:');
      DebugUtils.dir(response.data);
      DebugUtils.debug('=======================================>');
      return response.data;
    },
    (error: AxiosError<{ message?: string }>) => {
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Response Error: ${(ENVConfig.API_URL || '') + (error.config?.url || '')}`);
      DebugUtils.debug(`Error ${error.response?.status}:`);
      DebugUtils.dir(error.response?.data);
      DebugUtils.debug('=======================================>');

      if (!error.response) {
        return Promise.reject(error);
      }
      if (
        [401, 403].includes(error.response.status) &&
        error.config?.url &&
        !whiteListApis.includes(error.config?.url)
      ) {
        redirect(ROUTES.LOGIN);
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
