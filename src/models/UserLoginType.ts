import { z, ZodError } from "zod";

export const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(15),
});

// Méthode pour transformer les erreurs Zod en un objet d'erreurs que vous pouvez utiliser dans le frontend
export function transformZodError(error: ZodError) {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.path) {
      errors[err.path.join(".")] = err.message;
    }
  });
  return errors;
}

export type UserLoginType = z.infer<typeof UserLogin>;
