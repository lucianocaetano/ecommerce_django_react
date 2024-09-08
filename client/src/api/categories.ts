import { Axios } from "./useAxios";

export const get_categories = async () => {
  const res = await Axios.get("/api/v1/product/categories/")
  return res.data
}
