import { z } from "zod";

export const ContractSchema = z.object({
  duree: z.string(),
  charge: z.string(),
  description_bail: z.string(),
  indice_reference: z.string(),
  close_revision_loyer: z.string(),
  montantLoyer: z.string(),
  closeparticuliere: z.string(),
  aut_paiement: z.string(),
  aut_avis_echeance: z.string(),
  aut_quittance: z.string(),
  type_echange_id: z.string(),
  type_contrat_id: z.string(),
  utilisateur_id: z.string(),
  locataire_id: z.string(),
});

export type ContractSchemaType = z.infer<typeof ContractSchema>;
