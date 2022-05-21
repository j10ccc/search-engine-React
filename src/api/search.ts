import { myAxios } from "./axios";

export function getSearchResultAPI(paramsList: any) {
  return myAxios({
    url: "api/search",
    method: "post",
    data: paramsList
  });
}
