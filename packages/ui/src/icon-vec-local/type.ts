import type { IconSvgTypes } from '../assets/svg';

export interface IconSvgLocalProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  className?: string;
  name: IconSvgTypes;
}
