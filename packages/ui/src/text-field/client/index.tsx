'use client';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { AppTextFieldProps } from '..';
import { AppTextField } from '..';

export interface AppTextFieldControlProps<T extends FieldValues>
  extends Omit<AppTextFieldProps, 'error'> {
  name: Path<T>;
  control: Control<T>;
  customError?: string | null;
}

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
