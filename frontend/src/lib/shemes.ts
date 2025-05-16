import { z } from "zod";

export const registerFormScheme = z.object({
  email: z
    .string()
    .nonempty("Поле почты обязательно")
    .email("Неверный формат почты"),
  name: z.string().nonempty("Поле имя обязательно"),
  password: z.string().nonempty("Поле пароль обязательно"),
});

export const loginFormScheme = registerFormScheme.omit({ name: true });

export type RegisterFormValues = z.infer<typeof registerFormScheme>;
export type LoginFormValues = z.infer<typeof loginFormScheme>;
