'use server';

import { ChangePasswordParams, CreateUserParams, UpdateUserParams } from '@/model/user';
import userServices from '@/services/user-services';

export const getUserAction = async (id: number) => {
  return userServices.getUser(id);
};

export const createUserAction = async (body: CreateUserParams) => {
  return userServices.createUser(body);
};

export const updateUserAction = async (id: number, body: UpdateUserParams) => {
  return userServices.updateUser(id, body);
};

export const changePasswordAction = async (body: ChangePasswordParams) => {
  return userServices.changePassword(body);
};
