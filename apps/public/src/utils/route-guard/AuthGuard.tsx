'use client';

import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import { useSession } from '@/hooks/useSession';
import Loader from '@repo/ui/loader';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

// ==============================|| AUTH GUARD ||============================== //

interface GuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const { loading, refresh, session } = useSession();

  const onSuccess = () => {};

  const onFailed = () => {
    authActions.clearStore();
    router.push(ROUTES.LOGIN);
  };

  useEffect(() => {
    refresh(onSuccess, onFailed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session || loading) return <Loader />;

  return <>{children}</>;
};

export default AuthGuard;
