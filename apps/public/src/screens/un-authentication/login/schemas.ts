import { LoginResult } from '@/model/auth';
import content from '@/utils/content';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({
      message: content.login_screen.incorrect_format(content.login_screen.email.toLowerCase())
    })
    .min(1, { message: content.login_screen.required(content.login_screen.email) }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: content.login_screen.at_least_characters(content.login_screen.password, 8)
    })
});

export type LoginForm = z.infer<typeof loginSchema>;

export type LoginActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: Partial<LoginForm>;
  result?: LoginResult;
};
