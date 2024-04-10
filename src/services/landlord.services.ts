import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function createLanloard<T = any>(data: Object) {
  return makeRequest<T>(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}

export async function createLanloardAnLOgin<T = any>(data: Object) {
  const resp = await makeRequest<T>(URLS.lanloard.CREATE_LOGIN, {
    data,
    method: "POST",
  });

  return resp;
}
// TODO change the makerequest
export async function deleteLanLord<T = any>(data: number) {
  return makeRequest(URLS.lanloard.delete(data), {
    method: "DELETE",
  });
}
