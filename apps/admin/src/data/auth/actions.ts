import { ChangePasswordParams, LoginParams, LoginResult, ProfileResult } from '@/model/auth';
import authServices from '@/services/auth-services';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { mutate } from 'swr';
import { userActions } from '../user/actions';
import { AUTH_KEY, initialAuth } from './types';

const reset = () => {
  mutate(AUTH_KEY, () => initialAuth, false);
};

const login = async (
  body: LoginParams,
  onSuccess?: (data: LoginResult) => void,
  onFailed?: () => void
) => {
  const result = await authServices.login(body);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  userActions.setUser(response.user);
  if (onSuccess) onSuccess(response);
};

const changePassword = async (
  body: ChangePasswordParams,
  onSuccess?: () => void,
  onFailed?: () => void
) => {
  const result = await authServices.changePassword(body);

  if (!result.success) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  if (onSuccess) onSuccess();
};

const getProfile = async (onSuccess?: (data: ProfileResult) => void, onFailed?: () => void) => {
  const result = await authServices.getProfile();

  if (!result.success || !result.data) {
    // showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  userActions.setUser(response.user);
  if (onSuccess) onSuccess(response);
};

const logout = async (onSuccess?: () => void, onFailed?: () => void) => {
  const result = await authServices.logout();

  if (!result.success) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  clearStore();
  if (onSuccess) onSuccess();
};

const clearStore = () => {
  reset();
  userActions.reset();
};

export const authActions = { reset, login, changePassword, getProfile, logout, clearStore };
