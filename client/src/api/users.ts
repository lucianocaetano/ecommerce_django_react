import {Axios} from "./useAxios.ts"

export const register = async (
  email: string,
  name : string,
  last_name: string,
  password: string,

) => {
  console.log(await Axios.post(`/user/register/`, {
    email, name, last_name, password
  }))
}

export const login = async (
  email: string,
  password: string
) => {
  const res = await Axios.post("/user/login/", {email, password})
  const data = await res.data
  return data
}

export const delete_user = async (id: number) => {
  await Axios.delete(`/user/${id}/`) 
};

export const get_users = async (search: string | null) => {
  const data = {}
  if(search || search === ""){
    data.search = search
  }
  const response = await Axios.get("/user", {params: data}) 
  return response.data
};
