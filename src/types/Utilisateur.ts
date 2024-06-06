export type BaseUser = {
  id: number;
  email: string;
  nom: string;
  slug: string;
  password: string;
  type_user: string;
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
export type Town = {
  nom: string;
  id: number;
};

export type EstateType = {
  id: number;
  libelle: string;
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
  email: string;
  nom: string;
  telephone: string;
  addresse: string;
  slug: string;
  login: string;
  sexe: string;
  statut: string;
  password: string;
  updated_at: string;
  created_at: string;
};

export type RealEstate = {
  nom: string;
  typemouvement: string;
  nbrchambre: number;
  surface: string;
  addresse: string;
  code_postal: string;
  ville_id: number;
  nbrbatiment: number;
  nbrescalier: number;
  numeroporte: number;
  zoneStationnement: string;
  ungarage: boolean;
  unecave: boolean;
  internet: boolean;
  dep_tvecranplat: string;
  dep_lingemaison: string;
  dep_lavevaiselle: boolean;
  pc_gardiennage: boolean;
  pc_interphone: boolean;
  pc_ascenseur: boolean;
  pc_vide_ordure: boolean;
  pc_espace_vert: boolean;
  pc_chauffage_collective: boolean;
  pc_eau_chaude_collective: boolean;
  pc_antennetv_collective: boolean;
  exist_balcon: boolean;
  exist_cheminee: boolean;
  exist_salle_manger: boolean;
  exist_proxi_education: boolean;
  exist_proxi_centre_sante: boolean;
  exist_proxi_restaurant: boolean;
  exist_sous_sol: boolean;
  anneeconstruction: string;
  nbr_salle_bain: boolean;
  typeBien_id: { libelle: string; id: number };
  proprietaire_id: number;

  slug: string;
  statut: string;
  img: string;
  created_at: string;
  updated_at: string;
  id: number;

  //
};
