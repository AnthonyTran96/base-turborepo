import { Role, User } from '@/model/user';

export interface UserState {
  user: User;
}

export const initialUser: UserState = {
  user: {
    id: 0,
    name: '',
    email: '',
    role: Role.USER,
    password: '',
    createdAt: '',
    updatedAt: ''
  }
};

export const USER_KEY = 'user';
