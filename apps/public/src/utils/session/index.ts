import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/config/api';
import { ENVConfig } from '@/config/env';
import { SessionPayload } from '@/types/session';
import { SessionService } from '@repo/utils/session';

const sessionService = new SessionService<SessionPayload>({
  cookieName: SESSION_COOKIE_NAME,
  maxAgeSeconds: SESSION_MAX_AGE,
  secret: ENVConfig.SESSION_SECRET || ''
});

export const createSessionCookie = sessionService.createSessionCookie.bind(sessionService);

export const getServerSession = sessionService.getServerSession.bind(sessionService);

export const setSessionCookie = sessionService.setSessionCookie.bind(sessionService);

export const verifySessionCookie = sessionService.verifySessionCookie.bind(sessionService);

export const clearSessionCookie = sessionService.clearSessionCookie.bind(sessionService);
