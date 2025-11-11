import { ChangePasswordParams, LoginParams, LoginResult, ProfileResult } from '@/model/auth';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { mutate } from 'swr';
import { postActions } from '../post/actions';
import { userActions } from '../user/actions';
import { changePasswordAction, getProfileAction, loginAction, logoutAction } from './server';
import { AUTH_KEY, initialAuth } from './types';

const reset = () => {
  mutate(AUTH_KEY, () => initialAuth, false);
};

const login = async (
  body: LoginParams,
  onSuccess?: (data: LoginResult) => void,
  onFailed?: () => void
) => {
  const result = await loginAction(body);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  if (onSuccess) onSuccess(response);
};

const changePassword = async (
  body: ChangePasswordParams,
  onSuccess?: () => void,
  onFailed?: () => void
) => {
  const result = await changePasswordAction(body);

  if (!result.success) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  if (onSuccess) onSuccess();
};

const getProfile = async (onSuccess?: (data: ProfileResult) => void, onFailed?: () => void) => {
  const result = await getProfileAction();

  if (!result.success || !result.data) {
    // showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  if (onSuccess) onSuccess(response);
};

const logout = async (onSuccess?: () => void, onFailed?: () => void) => {
  const result = await logoutAction();

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
  postActions.reset();
};

export const authActions = { reset, login, changePassword, getProfile, logout, clearStore };
