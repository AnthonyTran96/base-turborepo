import { ChangePasswordParams, CreateUserParams, UpdateUserParams, User } from '@/model/user';
import userServices from '@/services/user-services';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { mutate } from 'swr';
import { initialUser, USER_KEY, UserState } from './types';

const reset = () => {
  mutate(USER_KEY, () => initialUser, false);
};

const setUser = (user: User) => {
  mutate(USER_KEY, (prev?: UserState) => ({ ...(prev ?? initialUser), user }), false);
};

const getUser = async (id: number, onSuccess?: (data: User) => void, onFailed?: () => void) => {
  const result = await userServices.getUser(id);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  setUser(response);
  if (onSuccess) onSuccess(response);
};

const createUser = async (
  body: CreateUserParams,
  onSuccess?: (data: User) => void,
  onFailed?: () => void
) => {
  const result = await userServices.createUser(body);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  showToast({ type: TYPE_TOAST.SUCCESS, content: result.message });
  const response = result.data;
  if (onSuccess) onSuccess(response);
};

const updateUser = async (
  id: number,
  body: UpdateUserParams,
  onSuccess?: (data: User) => void,
  onFailed?: () => void
) => {
  const result = await userServices.updateUser(id, body);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  setUser(response);
  if (onSuccess) onSuccess(response);
};

const changePassword = async (
  body: ChangePasswordParams,
  onSuccess?: () => void,
  onFailed?: () => void
) => {
  const result = await userServices.changePassword(body);

  if (!result.success) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  showToast({ type: TYPE_TOAST.SUCCESS, content: result.message });
  if (onSuccess) onSuccess();
};

export const userActions = {
  reset,
  setUser,
  getUser,
  createUser,
  updateUser,
  changePassword
};
