import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

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
  return makeSucureRequest<T>(URLS.USERS.GET_STATUS, {
    method: "GET",
  });
}

export async function getAllUser<T>() {
  return makeSucureRequest<T>(URLS.USERS.INDEX, {
    method: "GET",
  });
}

export async function getStatusForGoogleLogin<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
