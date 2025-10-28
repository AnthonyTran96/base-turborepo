'use client';
import ICON_CHECK_GREEN from '@repo/ui/assets/svg/ic_check_green.svg';
import ICON_CLOSE_TAKE_NOTE from '@repo/ui/assets/svg/ic_close_take_note.svg';
import ICON_ERROR from '@repo/ui/assets/svg/ic_error.svg';
import ICON_INFO_SOLID from '@repo/ui/assets/svg/ic_info_solid.svg';
import ICON_WARNING from '@repo/ui/assets/svg/ic_warning.svg';
import { notification } from 'antd';
import Image from 'next/image';
import { createRef, forwardRef, useImperativeHandle } from 'react';
import type { ToastProps } from './type';
import { TYPE_TOAST } from './type';

function handleToastContent(props: ToastProps) {
  return (
    <div className={`mr-28 pr-4 font-semibold ${props.wrapClassName || ''}`}>{props.content}</div>
  );
}

function handleToastIcon(props: ToastProps) {
  if (props.icon) {
    return <Image {...props.icon} />;
  }

  switch (props.type) {
    case TYPE_TOAST.INFO:
      return (
        <Image
          src={ICON_INFO_SOLID}
          alt="ICON_INFO_SOLID"
          className="text-link-600"
          height={24}
          width={24}
        />
      );
    case TYPE_TOAST.SUCCESS:
      return (
        <Image
          src={ICON_CHECK_GREEN}
          alt="ICON_CHECK_GREEN"
          className="text-color-50"
          height={24}
          width={24}
        />
      );
    case TYPE_TOAST.WARNING:
      return (
        <Image
          src={ICON_WARNING}
          alt="ICON_WARNING"
          className="text-pending-600"
          height={24}
          width={24}
        />
      );
    case TYPE_TOAST.ERROR:
      return (
        <Image
          src={ICON_ERROR}
          alt="ICON_ERROR"
          className="text-error-600"
          height={24}
          width={24}
        />
      );
    case TYPE_TOAST.ERROR2:
      return (
        <Image
          src={ICON_CLOSE_TAKE_NOTE}
          alt="ICON_CLOSE_TAKE_NOTE"
          className="text-error-600"
          height={24}
          width={24}
        />
      );
    case TYPE_TOAST.DARK:
      return (
        <Image
          src={ICON_INFO_SOLID}
          alt="ICON_INFO_SOLID"
          className="text-color-50"
          height={24}
          width={24}
        />
      );
    default:
      return null;
  }
}

// eslint-disable-next-line react/display-name
const Component = forwardRef((_: unknown, ref) => {
  const [api, contextHolder] = notification.useNotification();

  useImperativeHandle(ref, () => ({
    show: (props: ToastProps) => {
      api.open({
        message: handleToastContent(props),
        duration: props.timeShow || 3,
        icon: handleToastIcon(props),
        placement: props.placement || 'topRight',
        className: props.type === TYPE_TOAST.DARK ? 'dark-toast' : '',
        style: props.styleToast
      });
    }
  }));

  return <div>{contextHolder}</div>;
});

type Toast = {
  show: (data: { type?: TYPE_TOAST; content: string }) => void;
};
export const ToastRef = createRef<Toast>();

export const ToastView = () => <Component ref={ToastRef} />;

export const showToast = (props: ToastProps) => {
  ToastRef.current?.show(props);
};

export * from './type';
