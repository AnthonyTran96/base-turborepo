import Image from 'next/image';
import React from 'react';

export interface IdPropButton {
  className?: string;
  text?: string;
  customContent?: React.ReactNode;
  disabled?: boolean;
  heightIcon?: number;
  htmlType?: HTMLButtonElement['type'];
  leftIcon?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: string;
  fontSize?: number;
  size?: 44 | 32;
  styles?: React.CSSProperties;
  type?: 'primary' | 'secondary' | 'ghost' | 'whiteGhost';
  widthIcon?: number;
}

const ButtonBase = (props: IdPropButton) => {
  const {
    type = 'secondary',
    htmlType = 'button',
    disabled = false,
    onClick,
    styles = {},
    className = '',
    size = 44,
    fontSize,
    leftIcon,
    rightIcon,
    heightIcon = 20,
    widthIcon = 20,
    text,
    customContent
  } = props;
  const content = text || customContent;

  let baseClassName = '';

  if (size === 32) {
    baseClassName = 'text-14 font-normal leading-20';
  } else if (size === 44) {
    baseClassName = 'text-16';
  } else {
    baseClassName = 'text-16 font-semibold leading-24';
  }

  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{ height: size, fontSize, ...styles }}
      disabled={disabled}
      className={`btn_base btn_${type} ${baseClassName}`}
    >
      {leftIcon && (
        <div className={content ? 'mr-8' : ''}>
          <Image
            src={leftIcon}
            height={heightIcon}
            width={widthIcon}
            alt="icon"
            className={
              disabled
                ? '!text-color-600'
                : type === 'secondary' || type === 'whiteGhost'
                  ? 'hover:!text-primary-700'
                  : ''
            }
          />
        </div>
      )}
      <span className={className}>{content}</span>
      {rightIcon && (
        <div className={content ? 'ml-8' : ''}>
          <Image
            src={rightIcon}
            height={heightIcon}
            width={widthIcon}
            alt="icon"
            className={disabled ? '!text-color-600' : ''}
          />
        </div>
      )}
    </button>
  );
};

export default ButtonBase;
