import { AfricanCountryCode, CountryCo } from "@/lib/CountryCode";
import { isValidPhoneNumber } from "@/lib/isValidPhone";
import { CountryCode } from "libphonenumber-js";

import { z, ZodError } from "zod";

export const sexeEnum = z.enum(["Homme", "Femme", "Autre"]);

export const UserSignUp = z
  .object({
    // first_name: z.string().min(4).max(15),
    confirm_password: z.string(),
    email: z.string().email(),
    // password: z.string().refine((v) => PASSWORD_REGEX.test(v), {
    //   message:
    //     "'Minimum eight characters, at least one letter, one number and one special character",
    // }),
    nom: z.string().min(4).max(15),
    password: z.string().min(4).max(15),
    // roles: z.array(z.enum(["ADMIN", "USER"])).default(["USER"]),
    // password: z.string(),
    adresse: z.string().min(4).max(15),
    login: z.string().min(4).max(15),
    sexe: sexeEnum,
    telephone: z.string(),
    code: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // path of error
  })
  .refine(
    (data) => isValidPhoneNumber(data.telephone, data.code as CountryCode),
    {
      message: "Ivalid phone number",
      path: ["telephone"], // path of error
    },
  );

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

export type UserSignUpType = z.infer<typeof UserSignUp>;
