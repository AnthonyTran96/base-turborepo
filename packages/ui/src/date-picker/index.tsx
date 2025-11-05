'use client';
import ICON_CALENDAR from '@repo/ui/assets/svg/ic_calendar.svg';
import type { DatePickerProps } from 'antd/es/date-picker';
import DatePicker from 'antd/es/date-picker';
import localeVN from 'antd/es/date-picker/locale/vi_VN';
import type { Dayjs } from 'dayjs';
import React, { useImperativeHandle, useRef } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { IconSvgTypes } from '../assets/svg';
import { IconSvgLocal } from '../icon-vec-local';

export interface AppDatePickerProps extends Omit<DatePickerProps, 'suffixIcon' | 'className'> {
  name?: string;
  label?: string;
  labelSuffix?: React.ReactNode;
  suffixIcon?: IconSvgTypes | React.ReactNode;
  wrapperClassName?: string;
  datePickerClassName?: string;
  popupClassName?: string;
}

export interface AppDatePickerControlProps<T extends FieldValues>
  extends Omit<AppDatePickerProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
}

interface InputRef {
  blur: () => void;
  focus: () => void;
}

const AppDatePicker = React.forwardRef<InputRef, AppDatePickerProps>((props, ref) => {
  const {
    name,
    label,
    labelSuffix,
    suffixIcon = <ICON_CALENDAR fill="" width={20} height={20} />,
    wrapperClassName,
    datePickerClassName,
    popupClassName,
    locale = localeVN,
    placeholder = 'dd/mm/yyyy',
    format = 'DD/MM/YYYY',
    ...restProps
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  const focus = () => {
    inputRef.current.focus();
  };

  const blur = () => {
    inputRef.current.blur();
  };

  useImperativeHandle(ref, () => ({
    blur: () => {
      blur();
    },
    focus: () => {
      focus();
    }
  }));

  return (
    <div className={`text-color-900 flex w-fit flex-col gap-4 ${wrapperClassName} `}>
      {label && (
        <label htmlFor={name} className="text-14 leading-24 font-semibold">
          {label}
          {labelSuffix && <span className="ml-4">{labelSuffix}</span>}
        </label>
      )}
      <DatePicker
        className={`rounded-radius-m border-color-300 hover:border-primary-500 [&_.ant-picker-input>input]:placeholder:text-color-600 p-12 ${datePickerClassName}`}
        classNames={{ popup: { root: popupClassName } }}
        id={name}
        allowClear={false}
        locale={locale}
        placeholder={placeholder}
        format={format}
        ref={inputRef}
        suffixIcon={
          typeof suffixIcon === 'string' ? (
            <IconSvgLocal name={suffixIcon as IconSvgTypes} height={20} width={20} />
          ) : (
            suffixIcon
          )
        }
        {...restProps}
      />
    </div>
  );
});

AppDatePicker.displayName = 'AppDatePicker';

const AppDatePickerControl = <T extends FieldValues>({
  name,
  control,
  onChange,
  ...restProps
}: AppDatePickerControlProps<T>) => {
  const { field } = useController({ name, control });
  return (
    <AppDatePicker
      {...field}
      {...restProps}
      onChange={(value: Dayjs, dateString: string | string[]) => {
        if (onChange) onChange(value, dateString);
        field.onChange(value);
      }}
    />
  );
};
const MemoizedAppDatePicker = React.memo(AppDatePicker);
const MemoizedAppDatePickerControl = React.memo(AppDatePickerControl) as <T extends FieldValues>(
  props: AppDatePickerControlProps<T>
) => React.JSX.Element;

export {
  MemoizedAppDatePicker as AppDatePicker,
  MemoizedAppDatePickerControl as AppDatePickerControl
};
