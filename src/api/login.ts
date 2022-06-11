import { myAxios } from "./axios";

export function loginAPI(paramsList: any) {
  return myAxios({
    url: "/api/login",
    method: "post",
    data: paramsList,
    withCredentials: true
  });
}

export function registerAPI(paramsList: any) {
  return myAxios({
    url: "/api/register",
    method: "post",
    data: paramsList
    // withCredentials: true
  });
}
