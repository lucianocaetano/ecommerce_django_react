import {Axios} from "./useAxios.ts"

export const register = async (
  email: string,
  name : string,
  last_name: string,
  password: string,

) => {
  await Axios.post(`/user/register/`, {
    email, name, last_name, password
  })
}

export const login = async (
  email: string,
  password: string
) => {
  const res = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login/`, {email, password})
  const data = await res.data
  return data
}
