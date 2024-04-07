import { z } from "zod";

// Schéma Zod
export const LanlordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  nom: z.string(),
  telephone: z.string(),
  addresse: z.string(),
  sexe: z.string().regex(/^M|F$/, { message: "Le sexe doit être M ou F" }),
  login: z.string(),
  statut: z.string(),
  slug: z.string(),
});
export type LanlordInput = z.infer<typeof LanlordSchema>;
