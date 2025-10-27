import { User } from './user';

export interface LoginParams {
  email: string;
  password: string;
}

export interface ChangePasswordParams {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface LoginResult {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenResult {
  tokens: AuthTokens;
}

export interface ProfileResult {
  user: User;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
