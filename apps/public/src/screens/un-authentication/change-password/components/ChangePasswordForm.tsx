'use client';
import content from '@/utils/content';
import ButtonBase from '@repo/ui/button';
import { AppTextField } from '@repo/ui/text-field';
import Spin from 'antd/es/spin';
import useChangePassword from '../hooks/useChangePassword';

const ChangePasswordForm = () => {
  const {
    changePassForm,
    email,
    currentPassword,
    newPassword,
    onChangeEmail,
    onChangeCurrentPassword,
    onChangeNewPassword,
    canSubmit
  } = useChangePassword();

  const { state, formAction, pending } = changePassForm;

  return (
    <form action={formAction}>
      <AppTextField
        wrapperClassName="mb-16"
        name="email"
        value={email}
        onChange={onChangeEmail}
        label={content.login_screen.email}
        placeholder={content.login_screen.enter_email}
        maxLength={64}
        error={state?.errors?.email?.[0]}
      />
      <AppTextField
        wrapperClassName="mb-20"
        name="currentPassword"
        value={currentPassword}
        onChange={onChangeCurrentPassword}
        label={content.login_screen.current_password}
        placeholder={content.login_screen.enter_password}
        maxLength={64}
        type="password"
        error={state?.errors?.currentPassword?.[0]}
      />
      <AppTextField
        wrapperClassName="mb-20"
        name="newPassword"
        value={newPassword}
        onChange={onChangeNewPassword}
        label={content.login_screen.new_password}
        placeholder={content.login_screen.enter_password}
        maxLength={64}
        type="password"
        error={state?.errors?.newPassword?.[0]}
      />
      <div className="bg-color-200 mb-20 h-[1px] w-full" />
      <ButtonBase
        htmlType="submit"
        disabled={!canSubmit || pending}
        type="primary"
        customContent={
          pending ? (
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
