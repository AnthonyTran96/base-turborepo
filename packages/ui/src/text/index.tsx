import type { CSSProperties } from 'react';
import React from 'react';

interface TextProps {
  text?: string;
  preset?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'title5'
    | 'sub-title1'
    | 'sub-title2'
    | 'sub-title3'
    | 'sub-title4'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption1'
    | 'caption2'
    | 'caption3';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}
export const TextBase = (props: TextProps) => {
  const { text, preset, className = '', children, ...rest } = props;
  const content = text || children;
  return (
    <div className={`${preset} ${className}`} {...rest}>
      {content}
    </div>
  );
};
