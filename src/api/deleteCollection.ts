import { myAxios } from "./axios";

export function deleteCollectionAPI(paramsList: any) {
  return myAxios({
    url: "/api/deleteCollection",
    method: "post",
    data: paramsList
  });
}
