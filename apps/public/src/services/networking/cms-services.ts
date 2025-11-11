/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENVConfig } from '@/config/env';
import { ApiResponse } from '@/types/common';
import content from '@/utils/content';
import { DebugUtils } from '@repo/utils/debug-utils';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

// ==============================|| AXIOS - FOR CMS SERVICES ||============================== //

function getCmsServices() {
  const cmsServices = axios.create({ baseURL: ENVConfig.LINK_CMS });

  cmsServices.interceptors.request.use(
    async (config) => {
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Request: ${(ENVConfig.LINK_CMS || '') + config.url}`);
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

  cmsServices.interceptors.response.use(
    (response) => {
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Response: ${(ENVConfig.LINK_CMS || '') + response.config.url}`);
      DebugUtils.debug('Data:');
      DebugUtils.dir(response.data);
      DebugUtils.debug('=======================================>');
      return { ...response, success: true };
    },
    (error: AxiosError<{ message?: string }>) => {
      DebugUtils.debug('=======================================>');
      DebugUtils.debug(`Response Error: ${(ENVConfig.LINK_CMS || '') + (error.config?.url || '')}`);
      DebugUtils.debug(`Error ${error.response?.status}:`);
      DebugUtils.dir(error.response?.data);
      DebugUtils.debug('=======================================>');

      if (!error.response) {
        return Promise.reject(error);
      }

      return Promise.reject({
        ...error.response,
        message: (error.response as any).message || error.message || content.common.networkingError,
        success: false
      });
    }
  );

  return cmsServices;
}

export async function requestCms<T>(
  method: Lowercase<Method>,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): ApiResponse<T> {
  const cmsServices = getCmsServices();

  switch (method) {
    case 'post':
      return cmsServices.post(url, data, config);
    case 'put':
      return cmsServices.put(url, data, config);
    case 'delete':
      return cmsServices.delete(url, config);
    default:
      return cmsServices.get(url, { params: data, ...config });
  }
}
