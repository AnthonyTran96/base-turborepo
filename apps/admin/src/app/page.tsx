import GuestGuard from '@/utils/route-guard/GuestGuard';

export default function Page() {
  return <GuestGuard />;
}
