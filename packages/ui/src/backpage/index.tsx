'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { BaseBackPageProps } from './base-ui';
import BaseBackPage from './base-ui';

export type Type = 'Back' | 'Push' | 'Replace';

interface BackPageProps extends BaseBackPageProps {
  type?: Type;
  href?: string;
  stopNavigate?: boolean;
}

const BackPage = ({
  type = 'Back',
  href = '/',
  stopNavigate = false,
  onClickBack,
  ...rest
}: BackPageProps) => {
  const router = useRouter();
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClickBack) onClickBack(event);
    if (!stopNavigate) {
      if (type === 'Back') router.back();
      if (type === 'Push') router.push(href);
      if (type === 'Replace') router.replace(href);
    }
  };

  return <BaseBackPage onClickBack={handleOnClick} {...rest} />;
};

export default React.memo(BackPage);
