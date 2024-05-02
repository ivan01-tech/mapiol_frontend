import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function getAllTowns<T>() {
  return makeRequest<T>(URLS.TOWN.index, {
    method: "GET",
  });
}


export async function getAllstatetType<T>() {
  return makeRequest<T>(URLS.TYPE_ESTATE.index, {
    method: "GET",
  });
}
