import { myAxios } from "./axios";

export function postCollectionAPI(paramsList: any) {
  return myAxios({
    url: "/api/submitCollection",
    method: "post",
    data: paramsList,
    withCredentials: true
  });
}
