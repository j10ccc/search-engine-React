import { myAxios } from "./axios";

export function getRelatedAPI(paramsList: any) {
  return myAxios({
    url: "/api/getRelated?word=" + paramsList,
    method: "get"
  });
}
