'use server';

import { loginAction } from '@/data/auth/server';
import { LoginParams } from '@/model/auth';
import { LoginActionState, loginSchema } from '../schemas';

export const handleLoginSubmit = async (initialState: LoginActionState, formData: FormData) => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const validatedFields = loginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawFormData
    } as LoginActionState;
  }

  const { email, password } = validatedFields.data;

  const params: LoginParams = { email, password };

  const result = await loginAction(params);

  if (!result.success || !result.data) {
    return {
      success: false,
      message: result.message
    } as LoginActionState;
  }

  return {
    success: true,
    value: params
  } as LoginActionState;
};
