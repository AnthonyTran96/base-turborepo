'use client';

import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import Loader from '@repo/ui/loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = () => {
  const router = useRouter();

  const onGetProfileSuccess = () => {
    router.push(ROUTES.SAMPLE_PAGE);
  };

  const onGetProfileFailed = () => {
    router.push(ROUTES.LOGIN);
  };

  const getProfile = async () => {
    authActions.getProfile(onGetProfileSuccess, onGetProfileFailed);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default GuestGuard;
