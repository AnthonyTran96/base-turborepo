import { Response } from '@/types/common';

export function sanitizeOne<T>(res: Response<T>): Response<T> {
  return {
    message: typeof res.message === 'string' ? res.message : '',
    success:
      typeof res.success === 'boolean' ||
      String(res.success).toLowerCase() === 'true' ||
      String(res.success).toLowerCase() === 'false'
        ? res.success
        : false,
    data: res.data as T,
    errors: res.errors,
    meta: res.meta,
    errorCode: res.errorCode ? String(res.errorCode) : undefined
  };
}

export function sanitizeResponse<T>(
  res: Response<T> | Promise<Response<T>>
): Response<T> | Promise<Response<T>> {
  if (res && typeof (res as Promise<Response<T>>).then === 'function') {
    return (res as Promise<Response<T>>).then((r) => sanitizeOne(r));
  }

  return sanitizeOne(res as Response<T>);
}
