import React from 'react';
import type { IconSvgTypes } from '../../assets/svg';
import { IconSvgLocal } from '../../icon-vec-local';
import WrapStyle from '../../wrap-style';
import { IconArrowLeft } from './images';

export interface BaseBackPageProps {
  icon?: IconSvgTypes | React.ReactNode;
  iconWidth?: number;
  iconHeight?: number;
  title?: string | React.ReactNode;
  wrapStyle?: React.CSSProperties | string;
  titleStyle?: React.CSSProperties | string;
  onClickBack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BaseBackPage = ({
  icon = <IconArrowLeft />,
  iconWidth = 24,
  iconHeight = 24,
  title,
  wrapStyle,
  titleStyle,
  onClickBack
}: BaseBackPageProps) => {
  return (
    <WrapStyle
      baseClass="flex w-fit cursor-pointer items-center gap-8"
      customStyle={wrapStyle}
      onClick={onClickBack}
    >
      {typeof icon === 'string' ? (
        <IconSvgLocal
          fill="black"
          name={icon as IconSvgTypes}
          width={iconWidth}
          height={iconHeight}
        />
      ) : (
        icon
      )}
      {title && (
        <WrapStyle baseClass="text-18 font-bold leading-24 text-color-900" customStyle={titleStyle}>
          {title}
        </WrapStyle>
      )}
    </WrapStyle>
  );
};

export default BaseBackPage;
