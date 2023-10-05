import axios, {AxiosRequestHeaders, InternalAxiosRequestConfig} from "axios"
import { useAuthStore } from "../store/auth"
import jwt_decode from "jwt-decode"

const baseURL =import.meta.env.VITE_BACKEND_URL

export const logout = () => {
  useAuthStore.getState().logout()
  window.location.href = "/login/"
}

export const useAxios = axios.create({
  baseURL,
})

useAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {

  const token: string = useAuthStore.getState().access;
  if(!(config.url === "/user/login/" || config.url === "/user/register/")){

    config.headers = {
      "Authorization": `Bearer ${token}`
    } as AxiosRequestHeaders
    type Token = {
      exp: number
    }

    const tokenDecode:Token=jwt_decode(token)
    const expiration: number = +new Date(tokenDecode.exp * 1000)
    const now: number = +new Date
    const fiveMin: number = 1000 * 60 * 5;

    if ((expiration - now) > fiveMin){
      try{
        const res = await useAxios.post("/user/refresh/",{
          refresh: useAuthStore.getState().refresh
        })
        useAuthStore.getState().setToken(res.data.access, res.data.refresh)
        //return res
      }catch(err){
        logout()
        console.error(err)
      }

    }

  }
  return config
})

