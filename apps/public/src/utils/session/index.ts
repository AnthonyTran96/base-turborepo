import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/config/api';
import { ENVConfig } from '@/config/env';
import { User } from '@/model/user';
import { SessionService } from '@repo/utils/session';

export interface SessionPayload {
  user: User;
  accessToken: string;
}

export const sessionService = new SessionService<SessionPayload>({
  cookieName: SESSION_COOKIE_NAME,
  maxAgeSeconds: SESSION_MAX_AGE,
  secret: ENVConfig.SESSION_SECRET || ''
});
