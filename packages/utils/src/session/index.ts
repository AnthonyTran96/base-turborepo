/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { clearCookie, getCookie, setCookie } from '../cookie';

/**
 * Generic session service for cookie-based sessions.
 *
 * TPayload: shape of payload WITHOUT exp (we add exp automatically)
 * TSession: payload + exp
 */
export class SessionService<TPayload extends Record<string, any>> {
  private cookieName: string;
  private maxAgeSeconds: number;
  private secret: string;

  constructor(options: { cookieName: string; maxAgeSeconds: number; secret: string }) {
    this.cookieName = options.cookieName;
    this.maxAgeSeconds = options.maxAgeSeconds;
    this.secret = options.secret;
  }

  // helper base64url
  private b64url(input: Buffer | string) {
    return Buffer.from(input)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }

  private sign(data: string) {
    return this.b64url(crypto.createHmac('sha256', this.secret).update(data).digest());
  }

  /**
   * Create signed cookie value from payload (payload does NOT include exp)
   */
  public createSessionCookie(payload: TPayload) {
    const body = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + this.maxAgeSeconds
    } as TPayload & { exp: number };

    const json = JSON.stringify(body);
    const bodyB64 = this.b64url(json);
    const sig = this.sign(bodyB64);
    return `${bodyB64}.${sig}`;
  }

  /**
   * Verify cookie value (bodyB64.sig)
   * Returns payload with exp (typed) or null
   */
  public verifySessionCookie(cookieValue?: string): (TPayload & { exp: number }) | null {
    if (!cookieValue) return null;
    const [bodyB64, sig] = cookieValue.split('.');
    if (!bodyB64 || !sig) return null;

    const expected = this.sign(bodyB64);

    try {
      const a = Buffer.from(expected);
      const b = Buffer.from(sig);
      // lengths must match for timingSafeEqual
      if (a.length !== b.length) return null;
      if (!crypto.timingSafeEqual(a, b)) return null;
    } catch {
      return null;
    }

    try {
      // decode base64url -> utf8 json
      const padded = bodyB64.replace(/-/g, '+').replace(/_/g, '/');
      const json = Buffer.from(padded, 'base64').toString('utf8');
      const data = JSON.parse(json) as TPayload & { exp: number };
      if (!data.exp || typeof data.exp !== 'number') return null;
      if (data.exp < Math.floor(Date.now() / 1000)) return null;
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Read cookie from Next.js cookies() and verify
   * (Only works in server runtime: Server Component / Route Handler / Middleware / Server Action)
   */
  public async getServerSession() {
    const raw = await getCookie(this.cookieName);
    return this.verifySessionCookie(raw);
  }

  /**
   * Set session cookie on response (HttpOnly, Secure, SameSite=Lax)
   * value should be a cookie string created by createSessionCookie
   */
  public async setSessionCookie(value: string) {
    setCookie(this.cookieName, value, this.maxAgeSeconds);
  }

  /**
   * Clear cookie (expire immediately)
   */
  public async clearSessionCookie() {
    clearCookie(this.cookieName);
  }
}
