'use client';
import content from '@/utils/content';
import ButtonBase from '@repo/ui/button';
import { AppTextFieldControl } from '@repo/ui/text-field/client';
import { Spin } from 'antd';
import useChangePassword from '../hooks/useChangePassword';

const ChangePasswordForm = () => {
  const { handleChangePassSubmit, changePasswordForm, loading } = useChangePassword();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = changePasswordForm;

  return (
    <form onSubmit={handleSubmit(handleChangePassSubmit)}>
      <AppTextFieldControl
        wrapperClassName="mb-16"
        name="email"
        label={content.login_screen.email}
        placeholder={content.login_screen.enter_email}
        maxLength={64}
        control={control}
      />
      <AppTextFieldControl
        wrapperClassName="mb-20"
        name="currentPassword"
        label={content.login_screen.current_password}
        placeholder={content.login_screen.enter_password}
        maxLength={64}
        control={control}
        type="password"
      />
      <AppTextFieldControl
        wrapperClassName="mb-20"
        name="newPassword"
        label={content.login_screen.new_password}
        placeholder={content.login_screen.enter_password}
        maxLength={64}
        control={control}
        type="password"
      />
      <div className="bg-color-200 mb-20 h-[1px] w-full" />
      <ButtonBase
        htmlType="submit"
        disabled={!isValid || loading}
        type="primary"
        customContent={
          loading ? (
            <div className="flex flex-row items-center justify-center">
              <div>{content.login_screen.change_password}</div>
              <div className="ml-8">
                <Spin />
              </div>
            </div>
          ) : (
            content.login_screen.change_password
          )
        }
        className="mb-16 flex w-full justify-center"
      />
    </form>
  );
};

export default ChangePasswordForm;
