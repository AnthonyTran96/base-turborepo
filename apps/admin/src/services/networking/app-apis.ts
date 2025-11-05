import { ENVConfig } from '@/config/env';

const ApiEndPoint = {
  LOGIN: '/auth/login',
  CHANGE_PASSWORD: '/auth/change-password',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  USERS: '/users',
  USER_STATS: '/users/stats',
  AUTH_CHANGE_PASSWORD: '/users/change-password'
} as const;

const prefix = ENVConfig.API_PREFIX;

const configApi = () => {
  const apiOb: Record<string, string> = {};
  Object.keys(ApiEndPoint).forEach((x) => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];
    apiOb[x] = prefix + valueApi; //API_VERSION + valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
