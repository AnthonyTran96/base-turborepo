'use client';

import '@/styles/global.scss';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';

interface Props {
  children: ReactElement;
  loader?: ReactNode;
}

const StyleProvider = (props: Props) => {
  const { children, loader = null } = props;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  return loading ? loader : <>{children}</>;
};

export default StyleProvider;
