'use client';
import ICON_EYE_OPEN from '@repo/ui/assets/svg/eye-open.svg';
import ICON_EYE_SPLASH from '@repo/ui/assets/svg/eye-splash.svg';
import type { InputProps, InputRef } from 'antd/es/input';
import Input from 'antd/es/input';
import type { Ref } from 'react';
import React, { forwardRef } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import AppHelperText from '../helper-text';

export interface AppTextFieldProps extends InputProps {
  label?: React.ReactNode;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  type?: 'text' | 'password' | 'number';
  error?: string;
  classNameMore?: string;
}

export interface AppTextFieldControlProps<T extends FieldValues>
  extends Omit<AppTextFieldProps, 'error'> {
  name: Path<T>;
  control: Control<T>;
  customError?: string | null;
}

export const AppTextField = forwardRef((props: AppTextFieldProps, ref: Ref<InputRef>) => {
  const {
    name,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    type = 'text',
    size = 'large',
    error,
    classNameMore,
    ...restProps
  } = props;

  const isPasswordType = type === 'password';

  const TextField = isPasswordType ? Input.Password : Input;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number' && !/^\d$/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };
  const renderPasswordSuffix = (visible: boolean) => (
    <div>
      {visible ? (
        <ICON_EYE_SPLASH height={20} fill="rgb(var(--color-700)" />
      ) : (
        <ICON_EYE_OPEN height={20} fill="rgb(var(--color-700)" />
      )}
    </div>
  );
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-14 leading-24 text-color-900 mb-4 inline-flex flex-row items-center font-semibold"
        >
          {label}
          {labelSuffix && <span className="text-color-900 ml-4">{labelSuffix}</span>}
        </label>
      )}
      <TextField
        type={type}
        id={name}
        name={name}
        size={size}
        onKeyDown={handleKeyDown}
        {...restProps}
        ref={ref}
        {...(isPasswordType
          ? {
              iconRender: renderPasswordSuffix
            }
          : {})}
        className={`border-color-300 text-14 text-color-800 placeholder:text-color-600 disabled:!border-color-200 disabled:!bg-color-200 disabled:!text-color-800 [&:has(input:disabled)]:!border-color-300 [&:has(input:disabled)]:!bg-color-200 [&>input]:text-color-800 [&>input]:placeholder:text-color-600 focus:shadow-none [&:has(input:focus)]:shadow-none [&_.ant-input-password-icon]:cursor-pointer ${classNameMore} ${
          error
            ? '!border-error-500'
            : 'focus-within:!border-primary-500 hover:!border-primary-500 focus:!border-primary-500'
        } `}
      />
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
});

AppTextField.displayName = 'AppTextField';

export function AppTextFieldControl<T extends FieldValues>({
  name,
  control,
  customError,
  ...restProps
}: AppTextFieldControlProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({ name, control });
  return (
    <AppTextField
      {...field}
      {...restProps}
      error={customError === null ? undefined : customError || error?.message}
    />
  );
}
