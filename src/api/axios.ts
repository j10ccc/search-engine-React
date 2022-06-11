import axios from "axios";
import { DevContext } from "../config";

export function myAxios(axiosConfig: any) {
  const service = axios.create({
    // baseURL: DevContext.baseURL,
    timeout: 10000
  });
  return service(axiosConfig);
}
