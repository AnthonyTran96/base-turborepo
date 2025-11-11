'use server';

import { AuthTokens, ChangePasswordParams, LoginParams } from '@/model/auth';
import authServices from '@/services/auth-services';
import { SessionPayload } from '@/types/session';
import { clearSessionCookie, createSessionCookie, setSessionCookie } from '@/utils/session';

export const loginAction = async (body: LoginParams) => {
  const result = await authServices.login(body);

  if (!result.success || !result.data) {
    return result;
  }

  const response = result.data;
  const payload: SessionPayload = {
    user: response.user,
    accessToken: response.tokens.accessToken
  };
  const cookie = createSessionCookie(payload);
  setSessionCookie(cookie);
  return { ...result, data: { ...result.data, tokens: {} as AuthTokens } };
};

export const changePasswordAction = async (body: ChangePasswordParams) => {
  return authServices.changePassword(body);
};

export const getProfileAction = async () => {
  return authServices.getProfile();
};

export const logoutAction = async () => {
  const result = await authServices.logout();

  if (!result.success) {
    return result;
  }

  clearSessionCookie();
  return result;
};
