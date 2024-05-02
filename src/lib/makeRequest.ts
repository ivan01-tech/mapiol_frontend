import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosAuth, axiosNoAuth } from "./axios";
import { ls } from "@/app/layout";
import { USER_TOKEN_STORAGE } from "./utils";
type BackendError = {
  [key: string]: string[];
};
const representBackendErrors = (errors: BackendError): string[] => {
  return Object.entries(errors).flatMap(([key, messages]) => {
    return messages.map((message) => `${key}: ${message}`);
  });
};

// Transformer les erreurs en une chaîne représentative
const stringifyBackendErrors = (errors: BackendError): string => {
  const errorStrings = representBackendErrors(errors);
  return errorStrings.join("\n");
};
export interface RequestRetturn<W> {
  statusCode: number;
  token?: number;
  message?: string;
  data: W;
}
/**
 * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
 */
type U = {};
export async function makeSucureRequest<T = any>(
  url: string,
  options: AxiosRequestConfig,
): Promise<T> {
  return axiosAuth(url, options)
    .then((res: AxiosResponse<RequestRetturn<T>>) => {
      console.log("respo nse : ", res);

      if (res.data.statusCode >= 400) {
        return Promise.reject({ message: res.data.message });
      }

      const data = res.data.data;
      console.log("da ta : ", data);
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("data erro r : ", err.response?.data);
      const error = err?.response?.data as
        | { error: BackendError }
        | null
        | undefined;
      let message: string;
      if (error?.error) {
        message = stringifyBackendErrors(error.error);
      } else {
        message =
          (err.response?.data as { message: string })?.message ||
          err.message ||
          "Something went wrong";
      }

      console.log("erreur  ", message);
      return Promise.reject({ message });
    });
}

/**
 * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
 */
export async function makeRequest<T = any>(
  url: string,
  options: AxiosRequestConfig,
): Promise<T> {
  return axiosNoAuth(url, options)
    .then((res: AxiosResponse<RequestRetturn<T>>) => {
      if (res.data.statusCode == 500) {
        console.log("resp onse : ", res);
        return Promise.reject({ message: res.data.message });
      }
      if (res.data.statusCode >= 400) {
        console.log("res ponse : ", res);
        return Promise.reject({ message: res.data.message });
      }

      if (res.data.token) {
        ls.set(USER_TOKEN_STORAGE, res.data.token);
      }

      const data = res.data.data;
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("data er ror : ", err.response?.data);
      const error = err?.response?.data as
        | { error: BackendError }
        | null
        | undefined;
      let message: string;
      if (error?.error) {
        message = stringifyBackendErrors(error.error);
      } else {
        message =
          (err.response?.data as { message: string })?.message ||
          err.message ||
          "Something went wrong";
      }

      console.log("erreur  ", message);
      return Promise.reject({ message });
    });
}

// Représenter les erreurs du backend
