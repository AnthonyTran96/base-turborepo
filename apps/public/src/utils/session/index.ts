import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/config/api';
import { ENVConfig } from '@/config/env';
import { SessionPayload } from '@/types/session';
import { SessionService } from '@repo/utils/session';

export const sessionService = new SessionService<SessionPayload>({
  cookieName: SESSION_COOKIE_NAME,
  maxAgeSeconds: SESSION_MAX_AGE,
  secret: ENVConfig.SESSION_SECRET || ''
});
