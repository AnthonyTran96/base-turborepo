/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */

// lib/jwt-service.ts
import jwt, { Algorithm, JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { DebugUtils } from '../debug-utils';

export type GenericJwtPayload = JwtPayload & {
  nonce?: string;
  ts?: number;
  sub?: string;
  [k: string]: any;
};

export type AuthHandler<T = any> = (
  req: NextRequest,
  payload: GenericJwtPayload,
  ctx?: { params?: Promise<Record<string, string>> }
) => Promise<Response | NextResponse | T>;

/**
 * Configurable JWT auth service — allow multiple services with different secrets/iss/aud.
 */
export class JwtAuthService {
  private secret: string;
  private issuer?: string;
  private audience?: string;
  private algorithms: Algorithm[];

  constructor(options: {
    secret: string;
    issuer?: string;
    audience?: string;
    algorithms?: Algorithm[];
  }) {
    if (!options?.secret) throw new Error('JwtAuthService: secret is required');
    this.secret = options.secret;
    this.issuer = options.issuer;
    this.audience = options.audience;
    this.algorithms = options.algorithms ?? ['HS256'];
  }

  /**
   * Sign a payload into a JWT string.
   * expiresIn can be like '3m' or seconds number.
   */
  public sign(
    payload: Record<string, any>,
    expiresIn?: jwt.SignOptions['expiresIn'],
    extraOpts?: SignOptions
  ) {
    const opts: SignOptions = {
      algorithm: this.algorithms[0],
      issuer: this.issuer,
      audience: this.audience,
      ...(expiresIn !== undefined ? { expiresIn } : {}),
      ...extraOpts
    };
    return jwt.sign(payload, this.secret, opts);
  }

  /**
   * Verify token string and return decoded payload or throw NextResponse(401)
   */
  public verifyTokenOrThrow(token: string | null, opts?: Partial<VerifyOptions>) {
    if (!token) throw new NextResponse('Missing token', { status: 401 });

    try {
      const payload = jwt.verify(token, this.secret, {
        algorithms: this.algorithms,
        issuer: opts?.issuer ?? this.issuer,
        audience: opts?.audience ?? this.audience,
        ...opts
      }) as GenericJwtPayload;

      return payload;
    } catch (err: any) {
      // log minimally
      DebugUtils.debug('=======================================>');
      DebugUtils.debug('JWT verify failed:');
      DebugUtils.dir(err?.message ?? err);
      DebugUtils.debug('=======================================>');
      throw new NextResponse('Invalid token', { status: 401 });
    }
  }

  /**
   * Extract bearer token from request (or null).
   */
  public getBearerToken(req: NextRequest) {
    const auth = req.headers.get('authorization') ?? '';
    if (!auth) return null;
    return auth.startsWith('Bearer ') ? auth.slice(7) : null;
  }

  /**
   * HOF wrapper for Next.js route handlers (App Router).
   * Usage: export const POST = myService.withAuth(async (req, payload) => { ... });
   *
   * The wrapped handler receives the verified payload as second argument.
   * If handler returns a NextResponse/Response it will be returned as-is; otherwise turned into JSON response.
   */
  public withAuth(handler: AuthHandler, options?: { requirePayload?: boolean }) {
    const self = this;
    return async function (req: NextRequest, ctx?: { params?: Promise<Record<string, string>> }) {
      try {
        const token = self.getBearerToken(req);
        const payload = self.verifyTokenOrThrow(token);

        if (options?.requirePayload && !payload) {
          return new NextResponse('Invalid token payload', { status: 401 });
        }

        const result = await handler(req, payload, ctx);

        if (result instanceof NextResponse || result instanceof Response) return result;
        return NextResponse.json(result);
      } catch (err) {
        if (err instanceof NextResponse) return err;
        DebugUtils.debug('=======================================>');
        DebugUtils.debug('Auth wrapper error:');
        DebugUtils.dir(err);
        DebugUtils.debug('=======================================>');
        return new NextResponse('Unauthorized', { status: 401 });
      }
    };
  }
}
