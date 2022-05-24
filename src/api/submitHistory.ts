import { myAxios } from "./axios";

export function postHistoryAPI(paramsList: any) {
  return myAxios({
    url: "/api/submitHistory",
    method: "post",
    data: paramsList
  });
}
