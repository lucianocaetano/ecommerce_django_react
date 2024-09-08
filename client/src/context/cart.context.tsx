import React, { createContext } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {create_item_cart, update_cart, update_item_cart} from "../api/carts"
import { Cart, ICartItem, Product } from "../Interface";

interface ICartContext {
  handleAddOrUpdateItem: (product: Product) => void 
}

export const CartContext = createContext<ICartContext>({handleAddOrUpdateItem: ()=>{}})

export const CartContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const queryClient = useQueryClient()
  
  const mutateUpdateCart = useMutation({mutationFn: (params: {id: number, count: number, subtotal: number})=>update_cart(params.id, params.count, params.subtotal), onSuccess: () => {
    queryClient.invalidateQueries(["cart"])
  }, onError: (err) => console.error(err)})

  // actualizar item cart (actualiza el quantity)
  const mutateUpdateCartItem = useMutation({mutationFn: (params: {id: number, quantity: number})=>update_item_cart(params.id, params.quantity), onSuccess: (cart_item: ICartItem) => {
    queryClient.invalidateQueries(["cart_items"])

    toast.success("Add to cart")
    const cart: Cart | undefined = queryClient.getQueryData(["cart"])
    if(cart){
      mutateUpdateCart.mutate({id: cart.id, subtotal: (Number(cart.subtotal) + Number(cart_item.product.price)), count: (Number(cart.count) + 1)})
    }
  }, onError: (err) => console.error(err)})

  // crear item cart
  const mutateCreateCartItem = useMutation({mutationFn: create_item_cart, onSuccess: () => {
    toast.success("Add to cart")
    queryClient.invalidateQueries(["cart_items"])
  }, onError: (err) => console.error(err)})

  const handleAddOrUpdateItem = (product: Product) => {
    const data: ICartItem[] | undefined = queryClient.getQueryData(["cart_items"])

    // existe un item cart con este producto
    if(data !== undefined && data.length !== 0){
      const CartItem: ICartItem = data.filter((item: ICartItem)=>(item.product.id === product.id))[0]
      mutateUpdateCartItem.mutate({id: CartItem.id, quantity: Number(CartItem.quantity) + 1})

    }else{
      mutateCreateCartItem.mutate(product.id)

      const cart: Cart | undefined = queryClient.getQueryData(["cart"])
      if(cart){
        mutateUpdateCart.mutate({id: cart.id, subtotal: product.price, count: (Number(cart.count) + 1)})
      }

    }
  };

  const value = {
    handleAddOrUpdateItem
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
