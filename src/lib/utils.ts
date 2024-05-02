import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const colors = {
  primary_1: "#192340",
  primary_2: "#304173",
  primary_3: "#D99152",
  primary_4: "#A6837B",

  secondary_1: "#0D1326",
  secondary_2: "#122140",
  secondary_3: "#BCBCBC",
  secondary_4: "#593A14",
};

export const USER_TOKEN_STORAGE = "mapiol_token";


export const FIREBASE_IMAGES_FOLDER  = "mapiol_images/"