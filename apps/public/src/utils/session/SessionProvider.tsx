'use client';
import { authActions } from '@/data/auth/actions';
import { ProfileResult } from '@/model/auth';
import { User } from '@/model/user';
import { Ctx } from '@/types/session';
import { createContext, useMemo, useState } from 'react';

export const SessionContext = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: React.ReactElement }) {
  const [session, setSession] = useState<User>();
  const [loading, setLoading] = useState(true);

  const refresh = async (onSuccess?: () => void, onFailed?: () => void) => {
    setLoading(true);
    const onGetSuccess = (data: ProfileResult) => {
      setLoading(false);
      setSession(data.user);
      if (onSuccess) onSuccess();
    };
    const onGetFailed = () => {
      setLoading(false);
      setSession(undefined);
      if (onFailed) onFailed();
    };
    authActions.getProfile(onGetSuccess, onGetFailed);
  };

  const value = useMemo<Ctx>(() => ({ loading, session, refresh }), [session, loading]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
