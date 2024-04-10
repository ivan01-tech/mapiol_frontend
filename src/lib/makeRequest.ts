import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosAuth, axiosNoAuth } from "./axios";
import { ls } from "@/app/layout";
import { USER_TOKEN_STORAGE } from "./utils";

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
      console.log("response : ", res);

      if (res.data.statusCode >= 400) {
        return Promise.reject({ message: res.data.message });
      }

      const data = res.data.data;
      console.log("data : ", data);
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("response : ", err);

      const msg =
        (err.response?.data as { message: string }).message || err.message;

      console.log("erreur  ", msg);
      return Promise.reject({ message: msg });
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
        console.log("response : ", res);
        return Promise.reject({ message: res.data.message });
      }
      if (res.data.statusCode >= 400) {
        console.log("response : ", res);
        return Promise.reject({ message: res.data.message });
      }

      if (res.data.token) {
        ls.set(USER_TOKEN_STORAGE, res.data.token);
      }

      const data = res.data.data;
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("response : ", err);

      const msg = err.message;

      console.log("erreur  ", msg);
      return Promise.reject({ message: msg });
    });
}
