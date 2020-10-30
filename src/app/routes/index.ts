import pathToRegexp from "path-to-regexp";

export const LANDING = "/";
export const SIGN_IN = "/signin";
export const SIGN_UP = "/signup";
export const HOME = "/home";
export const ACCOUNT = "/account";
export const SETTINGS = "/settings";
export const ERROR = "/error";
export const NOT_FOUND = "/not-found";

function route(path: string) {
  return {
    path,
    url: () => path,
  };
}

function routeWithIdParam(path: string) {
  return {
    path,
    url: (id: string) => compilePath(path, { id }),
  };
}

function compilePath(path: string, params: object): string {
  const toPath = pathToRegexp.compile(path);
  return toPath({ ...params });
}

export const routes = {
  landing: route("/"),
  home: routeWithIdParam(`${HOME}`),
  signUp: routeWithIdParam(`${SIGN_UP}`),
  signIn: routeWithIdParam(`${SIGN_IN}`),
  account: routeWithIdParam(`${ACCOUNT}`),
  error: routeWithIdParam(`${ERROR}`),
  notFound: routeWithIdParam(`${NOT_FOUND}`),
  settings: routeWithIdParam(`${SETTINGS}`),
};
