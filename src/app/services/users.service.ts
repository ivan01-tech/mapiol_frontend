import { makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function registerUser<T = any>(data: Object) {
  return makeSucureRequest<T>(URLS.USERS.REGISTER, {
    data,
    method: "POST",
  });
}

export async function loginUser<T = any>(data: Object) {
  makeSucureRequest<T>(URLS.AUTH.LOGIN, {
    data,
    method: "POST",
  })
    .then((res) => res)
    .catch((err) => err);
}

export async function createUserAndLogin<T = any>(data: Object) {
  return makeSucureRequest<T>(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}

export async function getUserStatus<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS, {
    method: "GET",
  });
}

export async function getStatusForGoogleLogin<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
