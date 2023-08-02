import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });
const publicUrls = ["/api/user/register", "/api/user/authenticate"];

api.interceptors.request.use((req: InternalAxiosRequestConfig<any>) => {
  if (publicUrls.includes(req.url!)) return req;
  const jwtToken = localStorage.getItem("token");
  req.headers.Authorization = `Bearer ${jwtToken}`;
  return req;
});

export async function makeRequest(
  url: string,
  options: AxiosRequestConfig<any>
) {
  try {
    const res = await api(url, options);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
