import {useAxios} from "./useAxios.ts"

export const register = async (
  email: string,
  name : string,
  last_name: string,
  password: string,

) => {
  await useAxios.post(`/user/register/`, {
    email, name, last_name, password
  })
}

export const login = async (
  email: string,
  password: string
) => {
  const res = await useAxios.post(`/user/login/`, {email, password})
  console.log(res)
  const data = await res.data
  return data
}
