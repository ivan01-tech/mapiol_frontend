import {
  FaUtensils,
  FaCar,
  FaWifi,
  FaTv,
  FaHome,
  FaFire,
  FaTree,
  FaArrowsAltV,
  FaBookOpen,
  FaBuilding,
  FaHospital,
  FaPhoneAlt,
  FaSatelliteDish,
  FaSink,
  FaThermometerHalf,
  FaTshirt,
  FaUserShield,
  FaFireExtinguisher,
} from "react-icons/fa";
import {
  RiBuilding2Fill,
  RiParkingBoxFill,
  RiRestaurantFill,
} from "react-icons/ri";
import { object, string, number, boolean, z } from "zod";

export const schemaRealEstate = object({
  nom: string(),
  surface: number(),
  addresse: string(),
  code_postal: number(),
  nbrbatiment: number(),
  nbrescalier: number(),
  nbrchambre: number(),
  numeroporte: number(),
  nbr_salle_bain: number(),
  ville_id: number(),
  typeBien_id: number(),
  proprietaire_id: number(),
  zoneStationnement: string(),
  anneeconstruction: string(),
  typemouvement: string(),
  ungarage: boolean().default(true),
  unecave: boolean().default(true),
  internet: boolean().default(true),
  dep_tvecranplat: boolean().default(true),
  exist_proxi_restaurant: boolean().default(true),
  pc_vide_ordure: boolean().default(true),
  pc_espace_vert: boolean().default(true),
  pc_eau_chaude_collective: boolean().default(true),
  pc_chauffage_collective: boolean().default(true),
  pc_interphone: boolean().default(true),
  exist_sous_sol: boolean().default(true),
  dep_lingemaison: boolean().default(true),
  exist_proxi_education: boolean().default(true),
  exist_salle_manger: boolean().default(true),
  exist_cheminee: boolean().default(true),
  pc_gardiennage: boolean().default(true),
  pc_antennetv_collective: boolean().default(true),
  exist_balcon: boolean().default(true),
  exist_proxi_centre_sante: boolean().default(true),
  pc_ascenseur: boolean().default(true),
  dep_lavevaiselle: boolean().default(true),
});
// {exist_salle_manger:"existe til une salle a manger ?"}
export const booleanKeys = [
  "exist_salle_manger",
  "ungarage",
  "unecave",
  "internet",
  "dep_tvecranplat",
  "dep_tvecranplat",
  "exist_proxi_restaurant",
  "pc_vide_ordure",
  "pc_espace_vert",
  "pc_eau_chaude_collective",
  "pc_chauffage_collective",
  "pc_interphone",
  "exist_sous_sol",
  "dep_lingemaison",
  "exist_proxi_education",
  "exist_salle_manger",
  "exist_cheminee",
  "pc_gardiennage",
  "pc_antennetv_collective",
  "exist_balcon",
  "exist_proxi_centre_sante",
  "pc_ascenseur",
  "dep_lavevaiselle",
];

const icons = {
  exist_salle_manger: <FaUtensils />,
  ungarage: <RiParkingBoxFill />,
  unecave: <FaHome />,
  internet: <FaWifi />,
  dep_tvecranplat: <FaTv />,
  exist_proxi_restaurant: <RiRestaurantFill />,
  pc_vide_ordure: <FaCar />,
  pc_espace_vert: <FaTree />,
  pc_eau_chaude_collective: <FaFire />,
  pc_chauffage_collective: <FaThermometerHalf />,
  pc_interphone: <FaPhoneAlt />,
  exist_sous_sol: <RiBuilding2Fill />,
  dep_lingemaison: <FaTshirt />,
  exist_proxi_education: <FaBookOpen />,
  exist_cheminee: <FaFireExtinguisher />,
  pc_gardiennage: <FaUserShield />,
  pc_antennetv_collective: <FaSatelliteDish />,
  exist_balcon: <FaBuilding />,
  exist_proxi_centre_sante: <FaHospital />,
  pc_ascenseur: <FaArrowsAltV />,
  dep_lavevaiselle: <FaSink />,
};

export default icons;

export type RealEstateType = z.infer<typeof schemaRealEstate>;
