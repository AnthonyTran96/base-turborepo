import React from 'react';
import type { IconSvgTypes } from '../assets/svg';
import { IconSvgLocal } from '../icon-vec-local';

export interface IdPropButton {
  className?: string;
  text?: string;
  customContent?: React.ReactNode;
  disabled?: boolean;
  heightIcon?: number;
  htmlType?: HTMLButtonElement['type'];
  leftIcon?: IconSvgTypes;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: IconSvgTypes;
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
  // const [hoveredItem, setHoveredItem] = useState('');

  // const updateImageState = () => {
  //   if (disabled) {
  //     return 'rgb(var(--color-600)';
  //   }
  //   return hoveredItem && (type === 'secondary' || type === 'whiteGhost')
  //     ? 'rgb(var(--primary-700)'
  //     : '';
  // };

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
      className={`btn_base btn_${type} ${className}`}
      // onMouseEnter={() => setHoveredItem('rgb(var(--color-700)')}
      // onMouseLeave={() => setHoveredItem('')}
    >
      {leftIcon && (
        <div className={content ? 'mr-8' : ''}>
          <IconSvgLocal
            name={leftIcon}
            height={heightIcon}
            width={widthIcon}
            fill={disabled ? 'rgb(var(--color-600)' : ''}
          />
        </div>
      )}
      <span className={baseClassName}>{content}</span>
      {rightIcon && (
        <div className={content ? 'ml-8' : ''}>
          <IconSvgLocal
            name={rightIcon}
            height={heightIcon}
            width={widthIcon}
            fill={disabled ? 'rgb(var(--color-600)' : ''}
          />
        </div>
      )}
    </button>
  );
};

export default ButtonBase;
