import { myAxios } from "./axios";

export function deleteCollectionAPI(paramsList: any) {
  return myAxios({
    url: "/api/deleteCollection",
    method: "delete",
    data: paramsList
  });
}
