import axios, {AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse} from "axios"
import { useAuthStore } from "../store/auth"

export const logout = () => {
  useAuthStore.getState().logout()
}

export const Axios = axios.create()

Axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token: string = useAuthStore.getState().access;
  if(!(config.url === "/user/login/" || config.url === "/user/register/")){
    config.headers = {
      "Authorization": `Bearer ${token}`
    } as AxiosRequestHeaders
  }
  return config
})

Axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      const refreshToken = useAuthStore.getState().refresh;

      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          useAuthStore.getState().setToken(newAccessToken, newRefreshToken);

          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axios(error.config);
        } catch (err) {
          useAuthStore.getState().logout();
        }
      }
    }

    return Promise.reject(error)
  }
);

