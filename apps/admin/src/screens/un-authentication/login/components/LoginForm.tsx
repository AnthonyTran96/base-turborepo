'use client';
import content from '@/utils/content';
import ButtonBase from '@repo/ui/button';
import { AppTextFieldControl } from '@repo/ui/text-field/client';
import { Spin } from 'antd';
import useLogin from '../hooks/useLogin';

const LoginForm = () => {
  const { handleLoginSubmit, loginForm, loading } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = loginForm;

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <AppTextFieldControl
        wrapperClassName="mb-16"
        name="email"
        label={content.login_screen.email}
        placeholder={content.login_screen.enter_email}
        maxLength={64}
        control={control}
        // customError={errors.email?.type === 'too_small' ? null : undefined}
      />
      <AppTextFieldControl
        id="passwordLoginInput"
        wrapperClassName="mb-20"
        name="password"
        label={content.login_screen.password}
        placeholder={content.login_screen.enter_password}
        maxLength={64}
        control={control}
        type="password"
        // customError={errors.password?.type === 'too_small' ? null : undefined}
      />
      <div className="bg-color-200 mb-20 h-[1px] w-full" />
      <ButtonBase
        htmlType="submit"
        disabled={!isValid || loading}
        type="primary"
        customContent={
          loading ? (
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
