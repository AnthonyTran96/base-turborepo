'use client';
import type { SelectProps } from 'antd/es/select';
import Select from 'antd/es/select';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import AppHelperText from '../helper-text';

export interface AppSelectProps extends SelectProps {
  name?: string;
  label?: string;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  error?: string;
}

export interface AppSelectControlProps<T extends FieldValues> extends Omit<AppSelectProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
}

export default function AppSelect(props: AppSelectProps) {
  const {
    name,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    error,
    ...restProps
  } = props;

  return (
    <div className={`text-color-900 flex size-full flex-col ${wrapperClassName} `}>
      {label && (
        <label
          htmlFor={name}
          className="text-14 leading-24 mb-4 inline-flex flex-row items-center font-semibold"
        >
          {label}
          {labelSuffix && <span className="ml-4">{labelSuffix}</span>}
        </label>
      )}
      <Select {...restProps} />
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
}

export function AppSelectControl<T extends FieldValues>(props: AppSelectControlProps<T>) {
  const { name, control, ...restProps } = props;

  const {
    field,
    fieldState: { error }
  } = useController({ name, control });

  return <AppSelect {...field} {...restProps} error={error?.message} />;
}
