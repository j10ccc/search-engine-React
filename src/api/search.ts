import { myAxios } from "./axios";

export function getSearchResultAPI(paramsList: any) {
  return myAxios({
    url: `api/search?word=${paramsList.word}&paperNum=${paramsList.paperNum}`,
    method: "get"
  });
}
