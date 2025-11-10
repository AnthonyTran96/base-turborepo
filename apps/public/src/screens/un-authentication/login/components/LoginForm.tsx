'use client';
import content from '@/utils/content';
import ButtonBase from '@repo/ui/button';
import { AppTextField } from '@repo/ui/text-field';
import Spin from 'antd/es/spin';
import useLogin from '../hooks/useLogin';

const LoginForm = () => {
  const { loginForm, canSubmit, email, password, onChangeEmail, onChangePassword } = useLogin();

  const { state, formAction, pending } = loginForm;

  return (
    <form action={formAction}>
      <AppTextField
        wrapperClassName="mb-16"
        name="email"
        label={content.login_screen.email}
        placeholder={content.login_screen.enter_email}
        value={email}
        onChange={onChangeEmail}
        maxLength={64}
        error={state?.errors?.email?.[0]}
      />
      <AppTextField
        id="passwordLoginInput"
        wrapperClassName="mb-20"
        name="password"
        label={content.login_screen.password}
        placeholder={content.login_screen.enter_password}
        value={password}
        onChange={onChangePassword}
        maxLength={64}
        type="password"
        error={state?.errors?.password?.[0]}
      />
      <div className="bg-color-200 mb-20 h-[1px] w-full" />
      <ButtonBase
        htmlType="submit"
        disabled={!canSubmit || pending}
        type="primary"
        customContent={
          pending ? (
            <div className="flex flex-row items-center justify-center">
              <div>{content.login_screen.login}</div>
              <div className="ml-8">
                <Spin />
              </div>
            </div>
          ) : (
            content.login_screen.login
          )
        }
        className="mb-16 flex w-full justify-center"
      />
    </form>
  );
};

export default LoginForm;
