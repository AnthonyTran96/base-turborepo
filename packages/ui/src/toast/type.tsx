import type { NotificationPlacement } from 'antd/es/notification/interface';
import type { ImageProps } from 'next/image';
import type React from 'react';

export enum TYPE_TOAST {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  ERROR2 = 'error2',
  DARK = 'dark'
}

export interface ToastProps {
  type?: TYPE_TOAST;
  content: string;
  wrapClassName?: string;
  timeShow?: number;
  icon?: ImageProps;
  placement?: NotificationPlacement;
  styleToast?: React.CSSProperties;
}
