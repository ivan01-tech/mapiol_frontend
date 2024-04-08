import { makeRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function createLanloard<T = any>(data: Object) {
  return makeRequest<T>(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}
