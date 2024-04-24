 interface IUser {
  id: number;
  email: string;
  addresse: string;
  login: string;
  nom: string;
  password: string;
  sexe: string;
  telephone: string;
  api_token: string;
  type_user: {
    libelle: string;
  };
  statut: string;
  slug: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}
export type UserType = IUser;
