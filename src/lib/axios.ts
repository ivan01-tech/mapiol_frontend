/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// Instance Axios pour les requêtes authentifiées
export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Instance Axios pour les requêtes non authentifiées
export const axiosNoAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default { axiosAuth, axiosNoAuth };
