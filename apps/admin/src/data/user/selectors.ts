import { useMemo } from 'react';
import useSWR from 'swr';
import { initialUser, USER_KEY } from './types';

export const useGetUserState = () => {
  const { data } = useSWR(USER_KEY, () => initialUser, {
    // fallbackData: initialUser,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return data!;
};

export const useGetUser = () => {
  const userState = useGetUserState();

  const memoizedValue = useMemo(() => userState.user, [userState.user]);

  return memoizedValue;
};
