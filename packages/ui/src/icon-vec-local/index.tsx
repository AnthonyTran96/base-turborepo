'use client';

import dynamic from 'next/dynamic';
import { IconSvgs } from '../assets/svg';
import type { IconSvgLocalProps } from './type';

export const IconSvgLocal = (props: IconSvgLocalProps) => {
  const { name, className, fill, ...rest } = props;
  const Loader = () => null;
  const Icon = dynamic(() => IconSvgs[name](), { loading: Loader, ssr: false });
  // render
  return <Icon fill={fill || ''} className={className} onClick={props.onClick} {...rest} />;
};
