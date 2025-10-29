import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import { ChangePasswordParams } from '@/model/auth';
import content from '@/utils/content';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useChangePassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const changePasswordSchema = z.object({
    email: z
      .string()
      .trim()
      .email({
        message: content.login_screen.incorrect_format(content.login_screen.email.toLowerCase())
      })
      .min(1, { message: content.login_screen.required(content.login_screen.email) }),
    currentPassword: z
      .string()
      .trim()
      .min(8, {
        message: content.login_screen.at_least_characters(content.login_screen.password, 8)
      }),
    newPassword: z
      .string()
      .trim()
      .min(8, {
        message: content.login_screen.at_least_characters(content.login_screen.password, 8)
      })
  });

  type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

  const changePasswordForm = useForm<ChangePasswordForm>({
    mode: 'onTouched',
    defaultValues: { email: '', currentPassword: '', newPassword: '' },
    resolver: zodResolver(changePasswordSchema)
  });

  const onLoginSuccess = () => {
    router.push(ROUTES.LOGIN);
    setLoading(false);
  };

  const onLoginFailed = () => {
    setLoading(false);
  };

  const handleChangePassSubmit = (data: ChangePasswordForm) => {
    const body: ChangePasswordParams = {
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    };
    setLoading(true);
    authActions.changePassword(body, onLoginSuccess, onLoginFailed);
  };

  return {
    handleChangePassSubmit,
    changePasswordForm,
    loading
  };
}
