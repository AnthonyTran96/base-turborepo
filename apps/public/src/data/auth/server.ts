'use server';

import { ChangePasswordParams, LoginParams, LoginResult, ProfileResult } from '@/model/auth';
import authServices from '@/services/auth-services';

const login = async (
  body: LoginParams,
  onSuccess?: (data: LoginResult) => void,
  onFailed?: (message: string) => void
) => {
  const result = await authServices.login(body);
  if (!result.success || !result.data) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  const response = result.data;
  if (onSuccess) return () => onSuccess(response);
};

const changePassword = async (
  body: ChangePasswordParams,
  onSuccess?: () => void,
  onFailed?: (message: string) => void
) => {
  const result = await authServices.changePassword(body);

  if (!result.success) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  if (onSuccess) return () => onSuccess();
};

const getProfile = async (onSuccess?: (data: ProfileResult) => void, onFailed?: () => void) => {
  const result = await authServices.getProfile();

  if (!result.success || !result.data) {
    if (onFailed) return () => onFailed();
    return;
  }

  const response = result.data;
  if (onSuccess) return () => onSuccess(response);
};

const logout = async (onSuccess?: () => void, onFailed?: (message: string) => void) => {
  const result = await authServices.logout();

  if (!result.success) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  if (onSuccess) return () => onSuccess();
};

export const authServer = { login, changePassword, getProfile, logout };
