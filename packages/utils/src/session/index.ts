/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { clearCookie, getCookie, setCookie } from '../cookie';
import { DebugUtils } from '../debug-utils';

type JwtPayloadWithExp = {
  exp: number; // seconds since epoch
  iat?: number;
  [k: string]: any;
};

/**
 * Generic session service using JWT (HS256)
 *
 * TPayload: shape of payload WITHOUT exp (we add exp via options)
 * TSession: payload + exp
 */
export class SessionService<TPayload extends Record<string, any>> {
  private cookieName: string;
  private maxAgeSeconds: number;
  private secret: string;
  private algorithm: jwt.Algorithm;

  constructor(options: {
    cookieName: string;
    maxAgeSeconds: number;
    secret: string;
    algorithm?: jwt.Algorithm;
  }) {
    this.cookieName = options.cookieName;
    this.maxAgeSeconds = options.maxAgeSeconds;
    this.secret = options.secret;
    this.algorithm = options.algorithm ?? 'HS256';
  }

  /**
   * Create a signed JWT string from payload (payload does NOT include exp)
   */
  public createSessionCookie(payload: TPayload): string {
    // jsonwebtoken will add iat and exp for us if expiresIn provided
    const token = jwt.sign(payload as object, this.secret, {
      algorithm: this.algorithm,
      expiresIn: this.maxAgeSeconds // seconds
    });
    return token;
  }

  /**
   * Verify JWT token value (cookieValue)
   * Returns payload with exp (typed) or null
   */
  public verifySessionCookie(cookieValue?: string): (TPayload & JwtPayloadWithExp) | null {
    if (!cookieValue) return null;
    try {
      // throws on invalid/expired token
      const decoded = jwt.verify(cookieValue, this.secret, {
        algorithms: [this.algorithm]
      }) as JwtPayloadWithExp & TPayload;
      // Ensure exp exists and is a number
      if (!decoded || typeof decoded.exp !== 'number') return null;
      return decoded as TPayload & JwtPayloadWithExp;
    } catch (err) {
      DebugUtils.logS(err);
      // Token invalid or expired
      return null;
    }
  }

  /**
   * Read cookie from Next.js cookies() and verify
   * (Only works in server runtime: Server Component / Route Handler / Middleware / Server Action)
   */
  public async getServerSession() {
    const raw = await getCookie(this.cookieName);
    return this.verifySessionCookie(raw ?? undefined);
  }

  /**
   * Set session cookie on response (HttpOnly, Secure, SameSite=Lax)
   * value should be a JWT string created by createSessionCookie
   */
  public async setSessionCookie(value: string) {
    // setCookie helper should set httpOnly, secure, path, maxAge etc.
    // store cookie value as the raw JWT token
    setCookie(this.cookieName, value, this.maxAgeSeconds);
  }

  /**
   * Clear cookie (expire immediately)
   */
  public async clearSessionCookie() {
    clearCookie(this.cookieName);
  }
}
