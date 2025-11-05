'use client';
import type { RadioGroupProps } from 'antd/es/radio';
import Radio from 'antd/es/radio';
import type { SpaceProps } from 'antd/es/space';
import Space from 'antd/es/space';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import AppHelperText from '../helper-text';

export interface AppRadioProps extends RadioGroupProps {
  options: AppRadioOption[];
  label?: string;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  direction?: SpaceProps['direction'];
  error?: string;
}
export interface AppRadioControlProps<T extends FieldValues> extends AppRadioProps {
  name: Path<T>;
  control: Control<T>;
  externalOnChange?: () => void;
  hideError?: boolean;
}

export interface AppRadioOption {
  value: string;
  label: string;
  subTitle?: string;
}

export default function AppRadio(props: AppRadioProps) {
  const {
    name,
    options,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    labelClassName,
    direction = 'horizontal',
    error,
    ...restProps
  } = props;

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
      <div>
        <Radio.Group name={name} {...restProps}>
          <Space direction={direction}>
            {options.map((option) => (
              <Radio key={option.value} value={option.value} className={labelClassName}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
}

export function AppRadioControl<T extends FieldValues>({
  name,
  control,
  externalOnChange,
  hideError,
  ...restProps
}: AppRadioControlProps<T>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { ref, onChange, ...resField },
    fieldState: { error }
  } = useController({ name, control });
  return (
    <AppRadio
      {...resField}
      {...restProps}
      onChange={(e) => {
        onChange(e.target.value);
        if (externalOnChange) externalOnChange();
      }}
      error={hideError ? undefined : error?.message}
    />
  );
}
