import { z } from "zod";

export const UtilisateurSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nom: z.string(),
  sexe: z.string().min(1),
  login: z.string(),
  slug: z.string(),
  statut: z.string(),
  type_user_id: z.string(),
});

export type UtilisateurCreate = z.infer<typeof UtilisateurSchema>;
