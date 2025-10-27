export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserParams {
  email?: string;
  name?: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface UserStatsResult {
  totalUsers: number;
  adminCount: number;
  userCount: number;
}
