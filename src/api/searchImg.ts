import { myAxios } from "./axios";

export function getSearchImageResultAPI(paramsList: any) {
  return myAxios({
    url: "/api/searchImg",
    method: "post",
    data: paramsList
  });
}
