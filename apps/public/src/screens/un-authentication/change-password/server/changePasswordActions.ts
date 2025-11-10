'use server';

import { changePasswordAction } from '@/data/auth/server';
import { ChangePasswordParams } from '@/model/auth';
import { ChangePassActionState, changePasswordSchema } from '../schemas';

export const handleChangePasswordSubmit = async (
  initialState: ChangePassActionState,
  formData: FormData
) => {
  const rawFormData = {
    email: formData.get('email'),
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword')
  };

  const validatedFields = changePasswordSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawFormData
    } as ChangePassActionState;
  }

  const { email, currentPassword, newPassword } = validatedFields.data;

  const params: ChangePasswordParams = { email, currentPassword, newPassword };

  const result = await changePasswordAction(params);

  if (!result.success) {
    return {
      success: false,
      message: result.message
    } as ChangePassActionState;
  }

  return {
    success: true,
    message: result.message,
    value: params
  } as ChangePassActionState;
};
