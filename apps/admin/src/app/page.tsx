'use client';
import content from '@/utils/content';
import IconClose from '@repo/ui/assets/svg/ic_close.svg';
import IconDelete from '@repo/ui/assets/svg/ic_delete.svg';
import ButtonBase from '@repo/ui/button';
import { showDialog, TYPE_MESSAGE } from '@repo/ui/dialog';
import Loader from '@repo/ui/loader';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';

export default function Page() {
  // return <GuestGuard />;
  return (
    <div className="flex">
      <Loader />
      <ButtonBase text="ghost" type="ghost" leftIcon={IconDelete} rightIcon={IconClose} />
      <ButtonBase text="primary" type="primary" rightIcon={IconClose} disabled />
      <ButtonBase
        text="secondary"
        type="secondary"
        leftIcon={IconDelete}
        rightIcon={IconClose}
        onClick={() => showToast({ content: 'hello', type: TYPE_TOAST.ERROR })}
      />
      <ButtonBase
        text="whiteGhost"
        type="whiteGhost"
        onClick={() =>
          showDialog({
            title: content.common.notification,
            content: content.common.coming_features,
            type: TYPE_MESSAGE.ALERT,
            actions: [
              {
                title: content.common.close
              }
            ]
          })
        }
      />
    </div>
  );
}
