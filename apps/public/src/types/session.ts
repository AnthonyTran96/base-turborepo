import { User } from '@/model/user';

export interface SessionPayload {
  user: User;
  accessToken: string;
}

export type Ctx = {
  session?: User;
  loading: boolean;
  refresh: (onSuccess?: () => void, onFailed?: () => void) => Promise<void>;
};
