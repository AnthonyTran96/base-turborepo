import GuestGuard from '@/utils/route-guard/GuestGuard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anthony MonoRepo App Base',
  description: 'Anthony MonoRepo App Base'
};

export default function Page() {
  return <GuestGuard />;
}
