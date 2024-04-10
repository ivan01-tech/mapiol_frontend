export type BaseUser = {
  id: number;
  email: string;
  nom: string;
  password: string;
  type_user:string
  statut: string;
};

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

export type LanloardCreate = {
  id: number;
  email: string;
  addresse: string;
  login: string;
  nom: string;
  password: string;
  sexe: string;
  telephone: string;
  type_user: string;
  statut: string;
  slug: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
};

type U = {
  email:string;
  nom:string;
  telephone:string;
  addresse:string;
  slug:string;
  login:string;
  sexe:string;
  statut:string;
  password:string;
  updated_at:string;
  created_at:string;
};

