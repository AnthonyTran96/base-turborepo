/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ICON_ARROW_LEFT from '@repo/ui/assets/svg/arrow-left.svg';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import WrapStyle from '../wrap-style';

export type Type = 'Back' | 'Push' | 'Replace';

type IconProp = string | StaticImageData | React.ReactNode;

interface BackPageProps {
  type?: Type;
  href?: string;
  icon?: IconProp;
  iconWidth?: number;
  iconHeight?: number;
  title?: string | React.ReactNode;
  wrapStyle?: React.CSSProperties | string;
  titleStyle?: React.CSSProperties | string;
  stopNavigate?: boolean;
  onClickBack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function isStaticImageData(x: unknown): x is StaticImageData {
  return (
    !!x &&
    typeof x === 'object' &&
    'src' in (x as any) &&
    'width' in (x as any) &&
    'height' in (x as any)
  );
}

const BackPage = ({
  type = 'Back',
  href = '/',
  icon = ICON_ARROW_LEFT,
  iconWidth = 24,
  iconHeight = 24,
  title,
  wrapStyle,
  titleStyle,
  stopNavigate = false,
  onClickBack
}: BackPageProps) => {
  const router = useRouter();
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClickBack) onClickBack(event);
    if (!stopNavigate) {
      if (type === 'Back') router.back();
      if (type === 'Push') router.push(href);
      if (type === 'Replace') router.replace(href);
    }
  };

  return (
    <WrapStyle
      baseClass="flex w-fit cursor-pointer items-center gap-8"
      customStyle={wrapStyle}
      onClick={handleOnClick}
    >
      {typeof icon === 'string' || isStaticImageData(icon) ? (
        <Image
          className={'text-color-black'}
          alt="ICON_BACK"
          src={icon}
          width={iconWidth}
          height={iconHeight}
        />
      ) : (
        <div>{icon}</div>
      )}
      {title && (
        <WrapStyle baseClass="text-18 font-bold leading-24 text-color-900" customStyle={titleStyle}>
          {title}
        </WrapStyle>
      )}
    </WrapStyle>
  );
};

export default React.memo(BackPage);
