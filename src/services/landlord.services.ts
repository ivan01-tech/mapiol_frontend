import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function createLanloard<T = any>(data: Object) {
  return makeRequest<T>(URLS.lanloard.create, {
    data,
    method: "POST",
  });
}

export async function updateLanLord({
  id,
  data,
}: {
  id: number;
  data: Object;
}) {
  console.log("Applying : ", data);
  return makeSucureRequest(URLS.lanloard.update(id), {
    data,
    method: "PUT",
  });
}

export async function createRealestate<T = any>(data: Object) {
  return makeRequest<T>(URLS.REAL_ESTATE.create, {
    data,
    method: "POST",
  });
}

export async function getLanlordByID<T = any>(id: string) {
  return makeRequest<T>(URLS.lanloard.get_slug(id), {
    method: "GET",
  });
}

export async function createtenants<T = any>(data: Object) {
  return makeRequest<T>(URLS.tenant.create, {
    data,
    method: "POST",
  });
}

export async function createLanloardAnLOgin<T = any>(data: Object) {
  const resp = await makeRequest<T>(URLS.lanloard.create, {
    data,
    method: "POST",
  });

  return resp;
}
// TODO change the makerequest
export async function deleteLanLord<T = any>(data: number) {
  return makeSucureRequest(URLS.lanloard.delete(data), {
    method: "DELETE",
  });
}
