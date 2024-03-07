interface IUser {
  _id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  nom: string;
  adresse: string;
  email: string;
  login: string;
  telephone: string;
  sexe: string;
  roles: string;
  statut: string;
}
export type UserType = IUser;
