import { ROUTES } from '@/config/routes';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { LoginActionState } from '../schemas';
import { handleLoginSubmit } from '../server/loginActions';

const initialState: LoginActionState = {
  success: false
};

export default function useLogin() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(handleLoginSubmit, initialState);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const canSubmit = email.trim().length >= 1 && password.trim().length >= 1;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onLoginSuccess = () => {
    router.push(ROUTES.SAMPLE_PAGE);
  };

  const onLoginFailed = (message?: string) => {
    if (message) showToast({ type: TYPE_TOAST.ERROR, content: message });
  };

  useEffect(() => {
    if (!state.success) {
      onLoginFailed(state.message);
      return;
    }
    onLoginSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
    loginForm: {
      state,
      formAction,
      pending
    },
    canSubmit
  };
}
