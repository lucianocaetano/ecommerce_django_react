import axios, {AxiosRequestHeaders, InternalAxiosRequestConfig} from "axios"
import { useAuthStore } from "../store/auth"

export const logout = () => {
  useAuthStore.getState().logout()
}

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

function isTokenExpired(token: string) {
  if(!token) return true
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedPayload.exp > currentTime;
}

Axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token: string = useAuthStore.getState().access;

  if(isTokenExpired(token)){
    if(token !== ""){
      config.headers = {
        "Authorization": `Bearer ${token}`
      } as AxiosRequestHeaders
    }
  }else {
    const refreshToken = useAuthStore.getState().refresh;
    if (refreshToken) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/refresh/`, {
          refresh: refreshToken,
        });

        console.log("hola")
        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        useAuthStore.getState().setToken(newAccessToken, newRefreshToken);
        config.headers = {
          "Authorization": `Bearer ${newAccessToken}`
        } as AxiosRequestHeaders
      } catch (err) {
        useAuthStore.getState().logout();
      }
    }
  }

  return config
})
