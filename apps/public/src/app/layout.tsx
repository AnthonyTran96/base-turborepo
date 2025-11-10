import { roboto } from '@/styles/font';
import '@/styles/global.scss';
import type { Metadata } from 'next';
import ProviderWrapper from './ProviderWrapper';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Anthony MonoRepo App Base',
  description: 'Anthony MonoRepo App Base'
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="vi" className={roboto.className}>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
