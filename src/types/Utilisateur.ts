export type CardItemProps = {
  imageSrc?: string;
  name?: string;
  role?: string;
  cardImageSrc?: string;
  cardTitle?: string;
  cardContent?: string;
};
export type Lanloard = {
  id: number;
  email: string;
  addresse: string;
  login: string;
  nom: string;
  password: string;
  sexe: string;
  telephone: string;
  type_user: {
    id: number;
    libelle: string;
    deleted_at: null;
    created_at: string;
    updated_at: null;
  };
  statut: string;
  slug: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
};
