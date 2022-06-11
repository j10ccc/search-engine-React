import { myAxios } from "./axios";

export function getCollectionAPI(paramsList?: any) {
  return myAxios({
    url: "/api/getCollection",
    method: "get",
    withCredentials: true
  });
}
