import ChangePassword from '@/screens/un-authentication/change-password';
import content from '@/utils/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: content.change_password_screen.title,
  description: content.change_password_screen.description
};

const ChangePasswordPage = () => {
  return <ChangePassword />;
};

export default ChangePasswordPage;
