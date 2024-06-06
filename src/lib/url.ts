export const URLS = {
  USERS: {
    CREATE: "/users",
    INDEX: "/users",
    REGISTER: "/users/register",
    CHANGE_STATUS: (id: number) => "/utilisateurs/editStatus/" + id,
    LOGIN: "/users/login",
    CREATE_LOGIN: "/users/createAndLogin",
    GET_LOCATAIRES: (id: number) => `/utilisateurs/getLocataires/${id}`,
    GET_STATUS: "/user/checkAuth",
  },
  COUNTRY: {
    index: "/pays/",
  },
  TOWN: {
    index: "/ville/",
  },
  TYPE_ESTATE: {
    index: "/typeBien/",
  },
  lanloard: {
    index: "/utilisateurs/",
    GET_STATUS: "/utilisateur/CheckAuth/",
    login: "/utilisateurs/login/",
    get_id: (id: number) => `/utilisateurs/showById/${id}/`,
    get_slug: (id: string) => `/utilisateurs/showBySlug/${id}/`,
    create: "/utilisateurs/create/",
    update: (id: number) => "/utilisateurs/edit/" + id,
    CREATE_LOGIN: "/utilisateurs/create_and_login/",
    delete: (id: number) => "/utilisateurs/delete/" + id + "/",
  },
  REAL_ESTATE: {
    index: "/proprieter/",
    show: (id: number) => "/proprieter/show/" + id,
    getRealEstate: (id: number) => `/proprieter/showForProprietaire/${id}`,

    create: "/proprieter/create/",
  },

  tenant: {
    index: "/locataire/",
    login: "/locataire/login/",
    create: "/locataire/create/",
    CREATE_LOGIN: "/locataire/create_and_login/",
    delete: (id: number) => "/locataire/delete/" + id + "/",
  },
  AUTH: {
    LOGIN: "/auth/login",
    GET_STATUS: "/users/check-auth",
    LOGOUT: "/auth/logout",
    GET_STATUS_GOOGLE: "/auth/google/success",
  },
  PRODUCTS: {
    GET: "/products",
    SEARCH: "/products/search",
    SEARCH_BY_NAME: "/products/search/name",
  },
  CATEGORIES: {
    GET: "/categories",
  },
};
