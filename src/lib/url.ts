export const URLS = {
  USERS: {
    CREATE: "/users",
    INDEX: "/users",
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    CREATE_LOGIN: "/users/createAndLogin",
    GET_STATUS: "/users/check-auth",
  },
  lanloard: {
    index: "/utilisateurs/",
    login: "/utilisateurs/login/",
    create: "/utilisateurs/create/",
    CREATE_LOGIN: "/utilisateurs/create_and_login/",
    delete: (id: number) => "/utilisateurs/delete/" + id + "/",
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
