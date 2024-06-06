/* eslint-disable import/no-anonymous-default-export */
import { ls } from "@/app/layout";
import axios from "axios";
import { USER_TOKEN_STORAGE } from "./utils";

// Récupérer le token

// Instance Axios pour les requêtes authentifiées
export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: ,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = ls.get(USER_TOKEN_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosNoAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default { axiosAuth, axiosNoAuth };
