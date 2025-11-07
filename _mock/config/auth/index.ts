import { fakeLogin, fakeLogout, fakeProfile } from '@/data';
import { MockApiConfig } from '@/types';

export const mockAuthApis: MockApiConfig[] = [
  {
    name: 'login',
    url: '/api/v1/auth/login',
    method: 'post',
    // status: 201,
    delay: 500,
    handler: (body) => {
      return fakeLogin;
    }
  },
  {
    name: 'getProfile',
    url: '/api/v1/auth/profile',
    method: 'get',
    delay: 500,
    handler: () => {
      return fakeProfile;
    }
  },
  {
    name: 'logout',
    url: '/api/v1/auth/logout',
    method: 'post',
    handler: () => {
      return fakeLogout;
    }
  }
];
