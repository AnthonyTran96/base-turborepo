import { ROUTES } from '@/config/routes';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { ChangePassActionState } from '../schemas';
import { handleChangePasswordSubmit } from '../server/changePasswordActions';

const initialState: ChangePassActionState = {
  success: false
};

export default function useChangePassword() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(handleChangePasswordSubmit, initialState);

  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const canSubmit =
    email.trim().length >= 1 &&
    currentPassword.trim().length >= 1 &&
    newPassword.trim().length >= 1;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setCurrentPassword(e.target.value);

  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);

  const onChangePassSuccess = (message?: string) => {
    if (message) showToast({ type: TYPE_TOAST.SUCCESS, content: message });
    router.push(ROUTES.LOGIN);
  };

  const onChangePassFailed = (message?: string) => {
    if (message) showToast({ type: TYPE_TOAST.ERROR, content: message });
  };

  useEffect(() => {
    if (!state.success) {
      onChangePassFailed(state.message);
      return;
    }
    onChangePassSuccess(state.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    email,
    currentPassword,
    newPassword,
    onChangeEmail,
    onChangeCurrentPassword,
    onChangeNewPassword,
    changePassForm: {
      state,
      formAction,
      pending
    },
    canSubmit
  };
}
