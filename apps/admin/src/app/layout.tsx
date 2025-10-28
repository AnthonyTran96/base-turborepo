import '@/styles/global.scss';
import type { Metadata } from 'next';
import ProviderWrapper from './ProviderWrapper';
export const metadata: Metadata = {
  title: 'Anthony MonoRepo App Base',
  description: 'Anthony MonoRepo App Base'
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="vi">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
