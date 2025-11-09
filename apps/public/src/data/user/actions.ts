import { ChangePasswordParams, CreateUserParams, UpdateUserParams, User } from '@/model/user';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { mutate } from 'swr';
import { changePasswordAction, createUserAction, getUserAction, updateUserAction } from './server';
import { initialUser, USER_KEY } from './types';

const reset = () => {
  mutate(USER_KEY, () => initialUser, false);
};

const getUser = async (id: number, onSuccess?: (data: User) => void, onFailed?: () => void) => {
  const result = await getUserAction(id);

  if (!result.success || !result.data) {
    showToast({ type: TYPE_TOAST.ERROR, content: result.message });
    if (onFailed) onFailed();
    return;
  }

  const response = result.data;
  if (onSuccess) onSuccess(response);
};

const createUser = async (
  body: CreateUserParams,
  onSuccess?: (data: User) => void,
  onFailed?: () => void
) => {
  const result = await createUserAction(body);

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
  const result = await updateUserAction(id, body);

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

  showToast({ type: TYPE_TOAST.SUCCESS, content: result.message });
  if (onSuccess) onSuccess();
};

export const userActions = {
  reset,
  getUser,
  createUser,
  updateUser,
  changePassword
};
