import {Product} from "../Interface";
import { Axios } from "./useAxios";

export async function get_cart(){
  const res = await Axios.get(`/api/v1/cart/get_cart/`)
  return res.data.cart
}

export async function create_cart(){
  const res = await Axios.post("/api/v1/cart/create_cart/", {"count": 0, "subtotal": 0})
  return res.data
}

export async function update_cart(id: number, count: number, subtotal: number){
  const res = await Axios.patch(`/api/v1/cart/update_cart/${id}/`, {count, subtotal})
  return res.data
}

export async function update_item_cart(id: number, quantity: number){
  const res = await Axios.patch(`/api/v1/cart/cart_items_update/${id}/`, {quantity: quantity})
  return res.data
}

export async function create_item_cart(product: number){
  const res = await Axios.post(`/api/v1/cart/cart_items_create/`, {
    quantity: 1,
    product
  })
  return res.data
}

export async function destroy_cart_item(id: number){
  await Axios.delete(`/api/v1/cart/cart_items_delete/${id}/`)
  return id 
}

export async function get_cart_items(){

  const res = await Axios.get("/api/v1/cart/cart_items/")
  return res.data
}
