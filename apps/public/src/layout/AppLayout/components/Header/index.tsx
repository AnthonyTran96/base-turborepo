'use client';
import { ROUTES } from '@/config/routes';
import { authActions } from '@/data/auth/actions';
import content from '@/utils/content';
import ButtonBase from '@repo/ui/button';
import { DialogProps, TYPE_ACTION, TYPE_MESSAGE, showDialog } from '@repo/ui/dialog';
import { TextBase } from '@repo/ui/text';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const onLogoutSuccess = () => {
    router.push(ROUTES.LOGIN);
  };
  const onLogoutFailed = () => {
    // DebugUtils.logS('Logout Failed');
  };
  const handleLogout = async () => {
    const dialogProps: DialogProps = {
      title: content.common.notification,
      type: TYPE_MESSAGE.ALERT,
      content: content.common.logout_warning,
      disableTouchOutSide: true,
      actions: [
        {
          title: content.common.agree,
          onPress: () => {
            authActions.logout(onLogoutSuccess, onLogoutFailed);
          }
        },
        { title: content.common.cancel, type: TYPE_ACTION.SECONDARY }
      ]
    };
    showDialog(dialogProps);
  };
  return (
    <div className="flex items-center space-x-12 px-16 pt-16">
      <TextBase preset="title1" text="Anthony MonoRepo Server" className="flex-1" />
      <ButtonBase text={content.common.logout} onClick={handleLogout} />
    </div>
  );
};

export default Header;
