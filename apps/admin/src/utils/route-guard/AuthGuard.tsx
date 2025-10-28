'use client';

import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import { useGetUser } from '@/data/user/selectors';
import Loader from '@repo/ui/loader';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

// ==============================|| AUTH GUARD ||============================== //

interface GuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useGetUser();

  const onGetProfileSuccess = () => {
    setLoading(false);
  };

  const onGetProfileFailed = () => {
    authActions.clearStore();
    router.push(ROUTES.LOGIN);
    setLoading(false);
  };

  const getProfile = async () => {
    setLoading(true);
    authActions.getProfile(onGetProfileSuccess, onGetProfileFailed);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || loading) return <Loader />;

  return <>{children}</>;
};

export default AuthGuard;
