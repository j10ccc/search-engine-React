import { myAxios } from "./axios";

export function getCollectionAPI(paramsList: any) {
  return myAxios({
    url: "/api/getCollection?uid=" + paramsList,
    method: "get"
  });
}
