'use client';
import '@/styles/global.scss';
import { roboto } from '@/utils/font';
import Loader from '@repo/ui/loader';
import { useEffect, useState } from 'react';
import ProviderWrapper from './ProviderWrapper';

export default function RootLayout({ children }: { children: React.ReactElement }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);
  return (
    <html lang="vi" className={roboto.className}>
      <body>{loading ? <Loader /> : <ProviderWrapper>{children}</ProviderWrapper>}</body>
    </html>
  );
}
