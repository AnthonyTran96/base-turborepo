import Flex from 'antd/es/flex';
import type { MouseEventHandler } from 'react';
import type { IconSvgTypes } from '../assets/svg';
import { IconSvgLocal } from '../icon-vec-local';
import { TextBase } from '../text';
import { IconCall } from './images';

export interface InfoBoxProps {
  title: string;
  caption: string;
  icon?: IconSvgTypes | React.ReactNode;
  fillIcon?: string;
  className?: string;
  iconClassname?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const InfoBox = (props: InfoBoxProps) => {
  const {
    title = 'Title',
    caption = 'Caption',
    icon = <IconCall />,
    fillIcon = '',
    className = '',
    iconClassname = '',
    onClick
  } = props;

  return (
    <Flex
      className={`tablet:w-[302px], w-[302}px] rounded-radius-l border-color-300 bg-color-50 hover:border-primary-500 mobile:w-full group gap-16 border p-16 duration-1000 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Flex
        justify="center"
        align="center"
        className={`bg-color-100 group-hover:bg-primary-300 size-48 rounded-[50%] duration-[1500ms] ease-out ${iconClassname}`}
      >
        {typeof icon === 'string' ? (
          <IconSvgLocal fill={fillIcon} name={icon as IconSvgTypes} width={24} height={24} />
        ) : (
          icon
        )}
      </Flex>
      <Flex vertical flex={1} className="gap-4 overflow-hidden">
        <TextBase text={title} className="sub-title4 !text-14 !font-bold" />
        <TextBase
          text={caption}
          className="text-12 leading-16 text-color-700 line-clamp-2 font-normal"
        />
      </Flex>
    </Flex>
  );
};

export default InfoBox;
