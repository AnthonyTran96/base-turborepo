import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import { LoginParams } from '@/model/auth';
import content from '@/utils/content';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .email({
        message: content.login_screen.incorrect_format(content.login_screen.email.toLowerCase())
      })
      .min(1, { message: content.login_screen.required(content.login_screen.email) }),
    password: z
      .string()
      .trim()
      .min(8, {
        message: content.login_screen.at_least_characters(content.login_screen.password, 8)
      })
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const loginForm = useForm<LoginForm>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema)
  });

  const onLoginSuccess = () => {
    router.push(ROUTES.SAMPLE_PAGE);
    setLoading(false);
  };

  const onLoginFailed = () => {
    setLoading(false);
  };

  const handleLoginSubmit = (data: LoginForm) => {
    const body: LoginParams = {
      email: data.email,
      password: data.password
    };
    setLoading(true);
    authActions.login(body, onLoginSuccess, onLoginFailed);
  };

  return {
    handleLoginSubmit,
    loginForm,
    loading
  };
}
