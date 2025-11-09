import { ChangePasswordParams, LoginParams, LoginResult, ProfileResult } from '@/model/auth';
import { ApiResponse } from '@/types/common';
import { ApiConstants } from './networking/app-apis';
import { sanitizeResponse } from './networking/app-helper';
import { request } from './networking/app-services';

async function login(params: LoginParams): ApiResponse<LoginResult | undefined> {
  return sanitizeResponse(request('post', ApiConstants.LOGIN, params).catch((error) => error));
}

async function changePassword(params: ChangePasswordParams): ApiResponse<null | undefined> {
  return sanitizeResponse(
    request('post', ApiConstants.CHANGE_PASSWORD, params).catch((error) => error)
  );
}

async function logout(): ApiResponse<null | undefined> {
  return sanitizeResponse(request('post', ApiConstants.LOGOUT).catch((error) => error));
}

async function getProfile(): ApiResponse<ProfileResult | undefined> {
  return sanitizeResponse(request('get', ApiConstants.PROFILE).catch((error) => error));
}

const authServices = {
  login,
  changePassword,
  logout,
  getProfile
};

export default authServices;
