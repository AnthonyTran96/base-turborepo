'use client';

import { ROUTES } from '@/config/routes';
import { useSession } from '@/hooks/useSession';
import Loader from '@repo/ui/loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = () => {
  const router = useRouter();
  const { refresh } = useSession();

  const onSuccess = () => {
    router.push(ROUTES.SAMPLE_PAGE);
  };

  const onFailed = () => {
    router.push(ROUTES.LOGIN);
  };

  useEffect(() => {
    refresh(onSuccess, onFailed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default GuestGuard;
