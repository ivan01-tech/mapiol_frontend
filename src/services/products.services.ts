import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function getAllProducts<Z>() {
  return makeSucureRequest<Z>(URLS.PRODUCTS.GET, {
    method: "GET",
  });
}

export async function getAllCategories<Z>() {
  return makeSucureRequest<Z>(URLS.CATEGORIES.GET, {
    method: "GET",
  });
}

export async function searchProduct<Z>(params: any) {
  return makeSucureRequest<Z>(URLS.PRODUCTS.SEARCH, {
    method: "GET",
    params,
  });
}

export async function searchProductByName<Z>(params: any) {
  return makeSucureRequest<Z>(URLS.PRODUCTS.SEARCH_BY_NAME, {
    method: "GET",
    params,
  });
}

export async function getAllRealEstate<T>() {
  return makeRequest<T>(URLS.REAL_ESTATE.index, {
    method: "GET",
  });
}

export async function getRealEstateByID<T>(id: number) {
  return makeRequest<T>(URLS.REAL_ESTATE.show(id), {
    method: "GET",
  });
}
