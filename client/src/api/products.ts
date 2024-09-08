import {Axios} from "./useAxios"

export const delete_product = async (id: number) => {

  return id
}

export const get_products = async ({ pageParam = 1 }) => {
  const response = await Axios.get(`/api/v1/product/products?page=${pageParam}`)
  return response.data
};

export const get_products_filter = async (filter: undefined | string) => {
  const params: {category__name?: string} = {category__name: filter}

  const response = await Axios.get("/api/v1/product/products", {params})
  return response.data
};

export const get_products_search = async (search: string | undefined) => {
  const data: {search?: string}={search}
  const response = await Axios.get(`/api/v1/product/search`, {params: data})
  return response.data
}

export const get_product = async (slug: string | undefined) => {
  if(typeof slug !== "string") throw new Error("Typ slug incorrect")
  const res = await Axios.get(`/api/v1/product/${slug}`)
  return res.data
}
