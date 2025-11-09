'use server';

import { ChangePasswordParams, LoginParams } from '@/model/auth';
import authServices from '@/services/auth-services';
import { SessionPayload, sessionService } from '@/utils/session';

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
  const cookie = sessionService.createSessionCookie(payload);
  sessionService.setSessionCookie(cookie);
  return result;
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

  sessionService.clearSessionCookie();
  return result;
};
