import Login from '@/screens/un-authentication/login';
import content from '@/utils/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: content.login_screen.title,
  description: content.login_screen.description
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
