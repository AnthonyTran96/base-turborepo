import content from '@/utils/content';
import { z } from 'zod';

export const changePasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email({
      message: content.login_screen.incorrect_format(content.login_screen.email.toLowerCase())
    })
    .min(1, { message: content.login_screen.required(content.login_screen.email) }),
  currentPassword: z
    .string()
    .trim()
    .min(8, {
      message: content.login_screen.at_least_characters(content.login_screen.password, 8)
    }),
  newPassword: z
    .string()
    .trim()
    .min(8, {
      message: content.login_screen.at_least_characters(content.login_screen.password, 8)
    })
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export type ChangePassActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: Partial<ChangePasswordForm>;
};
