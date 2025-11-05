import {
  ChangePasswordParams,
  CreateUserParams,
  UpdateUserParams,
  User,
  UserStatsResult
} from '@/model/user';
import { ApiResponse, PaginationOptions } from '@/types/common';
import { ApiConstants } from './networking/app-apis';
import { request } from './networking/app-services';

async function getUsers(options?: PaginationOptions): Promise<ApiResponse<User[] | undefined>> {
  return request('get', ApiConstants.USERS, options).catch((error) => error);
}

async function getUser(id: number): Promise<ApiResponse<User | undefined>> {
  const url = `${ApiConstants.USERS}/${id}`;
  return request('get', url).catch((error) => error);
}

async function createUser(params: CreateUserParams): Promise<ApiResponse<User | undefined>> {
  return request('post', ApiConstants.USERS, params).catch((error) => error);
}

async function updateUser(
  id: number,
  params: UpdateUserParams
): Promise<ApiResponse<User | undefined>> {
  const url = `${ApiConstants.USERS}/${id}`;
  return request('put', url, params).catch((error) => error);
}

async function deleteUser(id: number): Promise<ApiResponse<null | undefined>> {
  const url = `${ApiConstants.USERS}/${id}`;
  return request('delete', url).catch((error) => error);
}

async function getUserStats(): Promise<ApiResponse<UserStatsResult | undefined>> {
  return request('get', ApiConstants.USER_STATS).catch((error) => error);
}

async function changePassword(
  params: ChangePasswordParams
): Promise<ApiResponse<null | undefined>> {
  return request('post', ApiConstants.AUTH_CHANGE_PASSWORD, params).catch((error) => error);
}

const userServices = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  changePassword
};

export default userServices;
