import { ls } from "@/app/layout";
import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";
import { USER_TOKEN_STORAGE } from "@/lib/utils";

export async function createUser(data: Object) {
  return makeSucureRequest(URLS.USERS.CREATE, {
    data,
    method: "POST",
  });
}

export async function createUserAndLogin<T = any>(data: Object) {
  return makeSucureRequest<T>(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}

export async function loginUser<T>(data: Object) {
  return makeSucureRequest<T>(URLS.AUTH.LOGIN, {
    data,
    method: "POST",
  });
}

export async function loginLanLord<T>(data: Object) {
  return makeRequest<T>(URLS.lanloard.login, {
    data,
    method: "POST",
  });
}

export async function registerUser<T>(data: Object) {
  return makeRequest<T>(URLS.USERS.REGISTER, {
    data,
    method: "POST",
  });
}

export async function loginAdminUser<T>(data: Object) {
  return makeRequest<T>(URLS.USERS.LOGIN, {
    data,
    method: "POST",
  });
}

export async function logoutUser<T>() {
  return makeSucureRequest<T>(URLS.AUTH.LOGOUT, {
    method: "GET",
  });
}

export async function getUserStatus<T>() {
  const token = ls.get(USER_TOKEN_STORAGE);

  console.log("token: " + token);
  
  return makeRequest<T>(URLS.lanloard.GET_STATUS, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function getAllLanloard<T>() {
  return makeRequest<T>(URLS.lanloard.index, {
    method: "GET",
  });
}

export async function getAllTenanat<T>() {
  return makeRequest<T>(URLS.tenant.index, {
    method: "GET",
  });
}

export async function getStatusForGoogleLogin<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
