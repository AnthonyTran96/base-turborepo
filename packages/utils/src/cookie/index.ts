import { cookies } from 'next/headers';

export const setCookie = async (
  key: string,
  value: string,
  maxAgeSeconds: number = 60 * 60 * 8,
  options?: CookieListItem
) => {
  const jar = await cookies();
  jar.set({
    name: key,
    value,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
    ...options
  });
};

export const getCookie = async (key: string) => {
  const jar = await cookies();
  const raw = jar.get(key)?.value;
  return raw;
};

export const clearCookie = async (key: string, options?: CookieListItem) => {
  const jar = await cookies();
  jar.set({
    name: key,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    ...options
  });
};
