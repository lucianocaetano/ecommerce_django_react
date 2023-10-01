import {useAxios} from "./useAxios.ts"

type register = {
  email: string,
  name : string,
  last_name: string,
  password: string,
}

export const register = async (
  data: register
): Promise<number> => {
  await useAxios.post(`/user/register`, data)
}
