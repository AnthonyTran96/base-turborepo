'use server';

import { ChangePasswordParams, CreateUserParams, UpdateUserParams, User } from '@/model/user';
import userServices from '@/services/user-services';

const getUser = async (
  id: number,
  onSuccess?: (data: User) => void,
  onFailed?: (message: string) => void
) => {
  const result = await userServices.getUser(id);

  if (!result.success || !result.data) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  const response = result.data;
  if (onSuccess) return () => onSuccess(response);
};

const createUser = async (
  body: CreateUserParams,
  onSuccess?: (data: User) => void,
  onFailed?: (message: string) => void
) => {
  const result = await userServices.createUser(body);

  if (!result.success || !result.data) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  const response = result.data;
  if (onSuccess) return () => onSuccess(response);
};

const updateUser = async (
  id: number,
  body: UpdateUserParams,
  onSuccess?: (data: User) => void,
  onFailed?: (message: string) => void
) => {
  const result = await userServices.updateUser(id, body);

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
  const result = await userServices.changePassword(body);

  if (!result.success) {
    if (onFailed) return () => onFailed(result.message);
    return;
  }

  if (onSuccess) return () => onSuccess();
};

export const userServer = {
  getUser,
  createUser,
  updateUser,
  changePassword
};
